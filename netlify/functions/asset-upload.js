// asset-upload.js — Upload file to R2
// POST multipart form data: file, brandId, campaignId (optional)
// Stores at brands/{brandId}/uploads/{ISO-timestamp}-{filename}
// Returns { key, url }

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  // TODO: implement in Step 6
  return { statusCode: 501, body: JSON.stringify({ error: 'Not implemented yet' }) }
}
