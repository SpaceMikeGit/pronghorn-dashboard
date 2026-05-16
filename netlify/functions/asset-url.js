// asset-url.js — Get signed URL for R2 object
// POST { key }
// Returns signed URL with 1-hour expiry

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  // TODO: implement in Step 6
  return { statusCode: 501, body: JSON.stringify({ error: 'Not implemented yet' }) }
}
