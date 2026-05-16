// campaign-list.js — List all campaigns for a brand from R2
// GET ?brandId=xxx
// Returns array of parsed campaign records

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  // TODO: implement in Step 7
  return { statusCode: 501, body: JSON.stringify({ error: 'Not implemented yet' }) }
}
