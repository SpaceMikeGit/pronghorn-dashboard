// generate-image.js - FAL.ai Flux Pro image generation proxy
// POST { prompt, width, height } -> submits to FAL queue, returns 202 { pending, requestId }
// GET  ?requestId=xxx            -> polls FAL once, returns { imageUrl } or 202 { pending }
//
// Netlify free plan has a 10-second function timeout. The FAL submit call
// uses an 8-second AbortSignal so we always return JSON before Lambda is killed.
// The top-level try/catch is a final safety net: client always gets parseable JSON.

const FAL_MODEL  = 'fal-ai/flux-pro'
const FAL_SUBMIT = 'https://queue.fal.run/' + FAL_MODEL
const FAL_STATUS = function (id) { return 'https://queue.fal.run/' + FAL_MODEL + '/requests/' + id + '/status' }
const FAL_RESULT = function (id) { return 'https://queue.fal.run/' + FAL_MODEL + '/requests/' + id }

const cors = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

function falHeaders() {
  return { 'Authorization': 'Key ' + process.env.FAL_API_KEY, 'Content-Type': 'application/json' }
}

function abortIn(ms) {
  try { return AbortSignal.timeout(ms) } catch (e) { return undefined }
}

async function getResult(requestId) {
  const statusRes = await fetch(FAL_STATUS(requestId), { headers: falHeaders(), signal: abortIn(8000) })
  const status    = await statusRes.json()
  if (status.status === 'COMPLETED') {
    const resultRes = await fetch(FAL_RESULT(requestId), { headers: falHeaders(), signal: abortIn(8000) })
    const result    = await resultRes.json()
    const imageUrl  = result.images && result.images[0] ? result.images[0].url : null
    return { done: true, imageUrl: imageUrl }
  }
  if (status.status === 'FAILED') return { done: true, error: 'Generation failed on FAL' }
  return { done: false }
}

exports.handler = async function (event) {
  try {

    if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' }
    if (!process.env.FAL_API_KEY) return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'FAL_API_KEY not configured' }) }

    // ── GET: poll requestId once ──────────────────────────────────────────
    if (event.httpMethod === 'GET') {
      const qs        = event.queryStringParameters || {}
      const requestId = qs.requestId
      if (!requestId) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'requestId required' }) }
      const result = await getResult(requestId)
      if (result.error) return { statusCode: 502, headers: cors, body: JSON.stringify({ error: result.error }) }
      if (result.done) return { statusCode: 200, headers: { ...cors, 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: result.imageUrl, requestId: requestId }) }
      return { statusCode: 202, headers: cors, body: JSON.stringify({ pending: true, requestId: requestId }) }
    }

    if (event.httpMethod !== 'POST') return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) }

    // ── POST: parse body ──────────────────────────────────────────────────
    var body
    try { body = JSON.parse(event.body) } catch (e) {
      return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Invalid JSON body' }) }
    }

    var prompt = body.prompt
    var width  = body.width  || 1024
    var height = body.height || 1024
    if (!prompt) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'prompt is required' }) }

    // ── Submit to FAL with 8-second hard timeout ──────────────────────────
    var submitRes
    try {
      submitRes = await fetch(FAL_SUBMIT, {
        method:  'POST',
        headers: falHeaders(),
        body:    JSON.stringify({ prompt: prompt, image_size: { width: width, height: height } }),
        signal:  abortIn(8000),
      })
    } catch (err) {
      return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'FAL API unreachable — ' + err.message }) }
    }

    if (!submitRes.ok) {
      var errText = await submitRes.text()
      return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'FAL rejected request', detail: errText }) }
    }

    var submitData = await submitRes.json()
    var requestId  = submitData.request_id

    return {
      statusCode: 202,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pending: true, requestId: requestId }),
    }

  } catch (topErr) {
    // Final safety net — Lambda was about to return empty body, now returns JSON
    return {
      statusCode: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Function error', detail: topErr.message }),
    }
  }
}
