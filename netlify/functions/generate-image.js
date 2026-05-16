// generate-image.js — Flux Pro image generation proxy
//
// Two modes in one function:
//   POST { prompt, width, height, brandId, campaignId }
//     → submits to Flux, polls up to 55 s, returns { imageUrl, taskId }
//     → if still pending at 55 s: returns 202 { pending: true, taskId }
//
//   GET ?taskId=xxx
//     → polls once, returns { imageUrl } or { pending: true }
//
// API keys never leave this function — never in the browser bundle.

// Use native fetch (Node 18+ on Netlify) — avoids ESM/CJS interop issues with node-fetch v3

const FLUX_ENDPOINT = 'https://api.bfl.ml/v1/flux-pro'
const FLUX_POLL     = 'https://api.bfl.ml/v1/get_result'
const POLL_INTERVAL = 2000   // ms between polls
const POLL_DEADLINE = 55000  // ms total — leaves buffer before Netlify cuts at 60 s

const cors = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

async function pollOnce(taskId) {
  const res  = await fetch(`${FLUX_POLL}?id=${taskId}`, {
    headers: { 'X-Key': process.env.FLUX_API_KEY },
  })
  return res.json()
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

exports.handler = async function (event) {
  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' }
  }

  // ── GET mode: single poll by taskId ─────────────────────────────────
  if (event.httpMethod === 'GET') {
    const taskId = event.queryStringParameters?.taskId
    if (!taskId) {
      return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'taskId required' }) }
    }
    const data = await pollOnce(taskId)
    if (data.status === 'Ready') {
      return {
        statusCode: 200,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: data.result.sample, taskId }),
      }
    }
    if (data.status === 'Error' || data.status === 'Failed') {
      return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'Generation failed', detail: data }) }
    }
    return {
      statusCode: 202,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pending: true, taskId }),
    }
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

  if (!process.env.FLUX_API_KEY) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'FLUX_API_KEY not configured' }) }
  }

  // Submit generation request
  let submitRes
  try {
    submitRes = await fetch(FLUX_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-Key':        process.env.FLUX_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, width, height }),
    })
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({
      error: 'Failed to reach Flux API',
      detail: err.message,
      cause: err.cause?.message ?? err.cause ?? null,
      code:  err.cause?.code ?? null,
    }) }
  }

  if (!submitRes.ok) {
    const errText = await submitRes.text()
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: 'Flux API rejected request', detail: errText }) }
  }

  const { id: taskId } = await submitRes.json()

  // Poll loop until done or deadline
  const deadline = Date.now() + POLL_DEADLINE
  while (Date.now() < deadline) {
    await sleep(POLL_INTERVAL)
    const data = await pollOnce(taskId)

    if (data.status === 'Ready') {
      return {
        statusCode: 200,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: data.result.sample, taskId }),
      }
    }
    if (data.status === 'Error' || data.status === 'Failed') {
      return {
        statusCode: 502,
        headers: cors,
        body: JSON.stringify({ error: 'Generation failed', detail: data }),
      }
    }
    // status === 'Pending' — keep looping
  }

  // Deadline reached — return taskId so client can continue polling via GET mode
  return {
    statusCode: 202,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pending: true,
      taskId,
      message: 'Still generating. Poll GET /.netlify/functions/generate-image?taskId=' + taskId,
    }),
  }
}
