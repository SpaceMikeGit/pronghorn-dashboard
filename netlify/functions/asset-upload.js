// asset-upload.js — Upload file to Cloudflare R2
// POST JSON { fileBase64, filename, contentType, brandId, campaignId? }
// Stores at brands/{brandId}/uploads/{ISO-timestamp}-{filename}
// Returns { key, url }

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

  const { fileBase64, filename, contentType, brandId, campaignId, caption } = body
  if (!fileBase64 || !filename || !contentType || !brandId) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'fileBase64, filename, contentType, and brandId are required' }) }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const key       = `brands/${brandId}/uploads/${timestamp}-${filename}`
  const buffer    = Buffer.from(fileBase64, 'base64')

  const metadata = { brandId }
  if (campaignId) metadata.campaignId = campaignId
  if (caption)    metadata.caption    = caption.slice(0, 1024)

  try {
    await r2Client().send(new PutObjectCommand({
      Bucket:      process.env.R2_BUCKET_NAME,
      Key:         key,
      Body:        buffer,
      ContentType: contentType,
      Metadata:    metadata,
    }))
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'R2 upload failed', detail: err.message }) }
  }

  const url = `${process.env.R2_PUBLIC_URL}/${key}`
  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, url }),
  }
}
