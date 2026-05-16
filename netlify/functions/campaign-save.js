// campaign-save.js — Save campaign record to R2
// POST { brandId, campaignId, name, activeDates, theme, toneDirection, keyMessages, referenceAssetKeys }
// Saves to brands/{brandId}/campaigns/{campaignId}.json
// Returns { success: true, campaignId }

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  // TODO: implement in Step 7
  return { statusCode: 501, body: JSON.stringify({ error: 'Not implemented yet' }) }
}
