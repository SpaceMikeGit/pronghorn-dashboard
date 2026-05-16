// asset-delete.js — Delete object from R2
// POST { key }
// Returns { success: true }

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  // TODO: implement in Step 6
  return { statusCode: 501, body: JSON.stringify({ error: 'Not implemented yet' }) }
}
