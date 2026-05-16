// campaign-save.js — Save campaign record to Cloudflare R2
// POST { brandId, campaignId, name, activeDates, theme, toneDirection, keyMessages, referenceAssetKeys }
// Saves to brands/{brandId}/campaigns/{campaignId}.json
// Returns { success: true, campaignId }

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

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
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' }
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) }

  let body
  try { body = JSON.parse(event.body) } catch {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { brandId, campaignId, name, activeDates, theme, toneDirection, keyMessages, referenceAssetKeys } = body
  if (!brandId || !name) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'brandId and name are required' }) }
  }

  const id      = campaignId || `campaign-${Date.now()}`
  const record  = { campaignId: id, brandId, name, activeDates, theme, toneDirection, keyMessages, referenceAssetKeys, updatedAt: new Date().toISOString() }
  const key     = `brands/${brandId}/campaigns/${id}.json`

  try {
    await r2Client().send(new PutObjectCommand({
      Bucket:      process.env.R2_BUCKET_NAME,
      Key:         key,
      Body:        JSON.stringify(record),
      ContentType: 'application/json',
    }))
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'R2 save failed', detail: err.message }) }
  }

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, campaignId: id }),
  }
}
