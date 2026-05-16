// campaign-list.js - List all campaigns for a brand from Cloudflare R2
// GET ?brandId=xxx
// Returns array of parsed campaign records, sorted: active first, then most recent start date

const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3')

function r2Client() {
  return new S3Client({
    region:   'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId:     process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  })
}

const cors = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

async function streamToString(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf-8')
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' }
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) }

  const { brandId } = event.queryStringParameters || {}
  if (!brandId) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'brandId is required' }) }

  const client = r2Client()
  const prefix = 'brands/' + brandId + '/campaigns/'

  let objects = []
  let continuationToken = undefined

  try {
    do {
      const res = await client.send(new ListObjectsV2Command({
        Bucket:            process.env.R2_BUCKET_NAME,
        Prefix:            prefix,
        ContinuationToken: continuationToken,
      }))
      if (res.Contents) objects = objects.concat(res.Contents)
      continuationToken = res.IsTruncated ? res.NextContinuationToken : undefined
    } while (continuationToken)
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'R2 list failed', detail: err.message }) }
  }

  const campaigns = await Promise.all(objects.map(async function (obj) {
    try {
      const res  = await client.send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: obj.Key }))
      const text = await streamToString(res.Body)
      return JSON.parse(text)
    } catch (e) {
      return null
    }
  }))

  const valid = campaigns.filter(Boolean)

  const now = new Date()
  valid.sort(function (a, b) {
    const aStart  = a.activeDates && a.activeDates.start ? new Date(a.activeDates.start) : null
    const aEnd    = a.activeDates && a.activeDates.end   ? new Date(a.activeDates.end)   : null
    const bStart  = b.activeDates && b.activeDates.start ? new Date(b.activeDates.start) : null
    const bEnd    = b.activeDates && b.activeDates.end   ? new Date(b.activeDates.end)   : null
    const aActive = aStart && aEnd ? aStart <= now && now <= aEnd : false
    const bActive = bStart && bEnd ? bStart <= now && now <= bEnd : false
    if (aActive !== bActive) return bActive ? 1 : -1
    if (aStart && bStart) return bStart - aStart
    return 0
  })

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify(valid),
  }
}
