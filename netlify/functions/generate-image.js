// generate-image.js — FAL.ai Flux Pro image generation proxy
//
// Two modes:
//   POST { prompt, width, height, brandId, campaignId }
//     → submits to FAL queue, polls up to 55 s, returns { imageUrl, requestId }
//     → if still pending at 55 s: returns 202 { pending: true, requestId }
//
//   GET ?requestId=xxx
//     → polls FAL once, returns { imageUrl } or { pending: true }

const FAL_MODEL   = 'fal-ai/flux-pro'
const FAL_SUBMIT  = `https://queue.fal.run/${FAL_MODEL}`
const FAL_STATUS  = (id) => `https://queue.fal.run/${FAL_MODEL}/requests/${id}/status`
const FAL_RESULT  = (id) => `https://queue.fal.run/${FAL_MODEL}/requests/${id}`

const POLL_INTERVAL = 2000
const POLL_DEADLINE = 55000

const cors = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

function falHeaders() {
  return {
    'Authorization': `Key ${process.env.FAL_API_KEY}`,
    'Content-Type':  'application/json',
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function getResult(requestId) {
  const statusRes = await fetch(FAL_STATUS(requestId), { headers: falHeaders() })
  const status    = await statusRes.json()
  if (status.status === 'COMPLETED') {
    const resultRes = await fetch(FAL_RESULT(requestId), { headers: falHeaders() })
    const result    = await resultRes.json()
    return { done: true, imageUrl: result.images?.[0]?.url ?? null }
  }
  if (status.status === 'FAILED') {
    return { done: true, error: 'Generation failed', detail: status }
  }
  return { done: false }
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' }
  }

  if (!process.env.FAL_API_KEY) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'FAL_API_KEY not configured' }) }
  }

  // ── GET mode: single poll by requestId ──────────────────────────────
  if (event.httpMethod === 'GET') {
    const requestId = event.queryStringParameters?.requestId
    if (!requestId) {
      return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'requestId required' }) }
    }
    const result = await getResult(requestId)
    if (result.error) {
      return { statusCode: 502, headers: cors, body: JSON.stringify(result) }
    }
    if (result.done) {
      return { statusCode: 200, headers: { ...cors, 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: result.imageUrl, requestId }) }
    }
    return { statusCode: 202, headers: cors, body: JSON.stringify({ pending: true, requestId }) }
  }

  // ── POST mode: submit + poll loop ────────────────────────────────────
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { prompt, width = 1024, height = 768 } = body
  if (!prompt) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'prompt is required' }) }
  }

  // Submit to FAL queue
  let submitRes
  try {
    submitRes = await fetch(FAL_SUBMIT, {
      method:  'POST',
      headers: falHeaders(),
      body:    JSON.stringify({ prompt, image_size: { width, height } }),
    })
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({
      error:  'Failed to reach FAL API',
      detail: err.message,
      cause:  err.cause?.message ?? null,
      code:   err.cause?.code ?? null,
    }) }
  }

  if (!submitRes.ok) {
    const errText = await submitRes.text()
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'FAL API rejected request', detail: errText }) }
  }

  const { request_id: requestId } = await submitRes.json()

  // Return immediately — Netlify free plan has a 10-second function timeout
  // which is shorter than FAL generation time. Client polls via GET ?requestId=xxx
  return {
    statusCode: 202,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ pending: true, requestId }),
  }
}
