// asset-list.js — List R2 objects for a brand
// GET ?brandId=xxx&campaignId=yyy (campaignId optional, filters client-side via metadata)
// Returns [{ key, url, metadata, size, lastModified }]

const { S3Client, ListObjectsV2Command, HeadObjectCommand } = require('@aws-sdk/client-s3')

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

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' }
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) }

  const { brandId, campaignId } = event.queryStringParameters || {}
  if (!brandId) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'brandId is required' }) }

  const client = r2Client()
  const prefix = `brands/${brandId}/`

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

  // Skip campaign JSON files from the asset list
  objects = objects.filter(o => !o.Key.includes('/campaigns/'))

  // Fetch metadata for each object (needed for campaignId filtering)
  const assets = await Promise.all(objects.map(async (obj) => {
    let metadata = {}
    try {
      const head = await client.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: obj.Key }))
      metadata = head.Metadata || {}
    } catch {}
    return {
      key:          obj.Key,
      url:          `${process.env.R2_PUBLIC_URL}/${obj.Key}`,
      metadata,
      size:         obj.Size,
      lastModified: obj.LastModified,
    }
  }))

  const filtered = campaignId
    ? assets.filter(a => a.metadata.campaignid === campaignId || a.metadata.campaignId === campaignId)
    : assets

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify(filtered),
  }
}
