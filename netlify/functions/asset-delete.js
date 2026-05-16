// asset-delete.js — Delete object from Cloudflare R2
// POST { key }
// Returns { success: true }

const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

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

  const { key } = body
  if (!key) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'key is required' }) }

  try {
    await r2Client().send(new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key:    key,
    }))
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'R2 delete failed', detail: err.message }) }
  }

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true }),
  }
}
