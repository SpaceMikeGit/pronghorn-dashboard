// asset-list.js — List R2 objects for a brand
// GET ?brandId=xxx&campaignId=yyy (campaignId optional)
// Returns [{ key, url, metadata, size, lastModified }]

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  // TODO: implement in Step 6
  return { statusCode: 501, body: JSON.stringify({ error: 'Not implemented yet' }) }
}
