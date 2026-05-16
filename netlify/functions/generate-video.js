// generate-video.js — Kling video generation proxy
// POST { imageUrl, prompt, duration, brandId, campaignId }
// Returns { videoUrl }
// Netlify timeout: 180s (set in netlify.toml)

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  // TODO: implement in Step 5
  return { statusCode: 501, body: JSON.stringify({ error: 'Not implemented yet' }) }
}
