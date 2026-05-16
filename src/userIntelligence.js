// User intelligence layer — profile management and synthesis panel logic

export function buildSystemPrompt(userProfile, moduleContext, brandData) {
  const userName    = userProfile?.name || 'Pronghorn team member'
  const userRole    = userProfile?.role || 'team member'
  const userFocus   = userProfile?.primaryFocus || ''
  const brandName   = brandData?.name || 'the selected brand'

  return `You are the intelligence layer of the Pronghorn Intelligence Suite — a six-module platform serving the Pronghorn Collective, a mission-driven spirits industry accelerator investing in Black-owned brands.

User: ${userName} (${userRole})
Current focus: ${userFocus}
Active module: ${moduleContext}
Selected brand: ${brandName}

Pronghorn context:
- 39 active portfolio brands, 70+ investment rounds since 2021
- $428M cumulative economic impact, 18% ahead of $364M goal
- 542 careers accelerated, 1,800-role placement commitment
- Key partners: Diageo (anchor), RNDC, Southern Glazers, Breakthru Beverages
- Staff: 25 people supporting 40+ brands

Tone: confident, precise, data-grounded. Write for a professional who already knows the landscape — no preamble, no hedging, no filler. Every sentence must earn its place.`
}

export function buildActionPrompt(actionType, userInput, context) {
  const prompts = {
    boardSummary: `Generate a 150–200 word executive paragraph suitable for a board packet or Diageo milestone conversation. Use this mission performance data: ${JSON.stringify(context)}. Write in Pronghorn's voice — confident, mission-forward, data-grounded. Lead with the strongest metric. Do not use bullet points.`,

    missionNarrative: `Generate a 3–4 sentence external-facing paragraph suitable for a speech opening, press interview, or partner conversation. Use this data: ${JSON.stringify(context)}. Warmer register than a board summary — public-facing, mission-forward. The audience is someone who is hearing about Pronghorn for the first time but is sophisticated about the industry.`,

    dataAudit: `Audit these KPI values for inconsistencies, contradictions, or claims that outpace their sources: ${JSON.stringify(context)}. Output format: either 'No inconsistencies detected.' or a specific numbered list of flags. Each flag: the figure, the issue, and the recommended resolution. Be surgical — only flag genuine problems.`,

    proofPoints: `Generate the three most compelling data points from this mission data for external content use: ${JSON.stringify(context)}. For each: (1) the fact in one crisp sentence, (2) a one-sentence framing that makes it land, (3) the recommended content format (e.g., 'Instagram carousel slide 1', 'press release lead stat', 'bartender talking point'). Do not write captions — write the raw material.`,

    activationBrief: `Generate a structured brand activation starter brief for ${userInput?.brand || 'the selected brand'}. Include: north star insight line (one sentence), three audience cluster assignments with one-sentence rationale each, top three analog competitors with positioning gap noted, primary platform recommendation with reason, opening content direction. Output should be deployable immediately — not a full strategy document, a starting point.`,

    contentCalendar: `Generate a 20-post 30-day content calendar for ${userInput?.brand || 'the selected brand'} using a four-pillar framework: The Ritual (product in context), The Source (provenance and heritage), The Co-Sign (social proof and partnership), The Occasion (moment-based content). For each post: pillar, target audience cluster, platform, format (e.g., Reel, carousel, static), and one-sentence post direction. Format as a numbered list.`,

    tradeBrief: `Generate a one-page trade brief for ${userInput?.brand || 'the selected brand'} in ${userInput?.market || 'the priority market'}. Include: current distribution footprint in that market (use representative data if specific data unavailable), recommended on-premise targets by account tier (flagship, craft, neighborhood), bartender education talk track opener for this brand, 30-day on-premise activation priority sequence. Three paragraphs. Print-ready.`,

    portfolioPulse: `Generate a 200-word maximum portfolio briefing for the week based on this velocity data: ${JSON.stringify(context)}. Structure: three brands needing attention this week and why, two brands outperforming and the pattern behind it, one distribution opportunity the data is signaling. Monday morning read — not a report, a briefing. Specific brand names, specific numbers.`,

    distributorBrief: `Generate a single-page distributor conversation brief for ${userInput?.brand || 'the selected brand'} in ${userInput?.market || 'the priority market'}. Include: current velocity in that market, SKU performance ranking relative to category, chain authorization status, distribution gap analysis with specific opportunities, recommended ask. Three paragraphs. Ready to pull up before a meeting.`,

    exitReadyBrands: `Based on this portfolio exit-readiness data: ${JSON.stringify(context)}, identify and rank the 3–5 brands showing the strongest exit-readiness signals. For each brand: one paragraph covering velocity trend, distribution depth, strategic acquirer fit (which major spirits company would logically acquire this brand and why), and recommended timeline for beginning exit conversations. Be specific — name potential acquirers.`,

    candidateMatch: `Evaluate this candidate-role match: Role: ${JSON.stringify(userInput?.role)}, Candidate: ${JSON.stringify(userInput?.candidate)}. Output: (1) Match score 0–100, (2) Three-paragraph rationale: fit, gaps, development path, (3) Recommended placement timeline in months, (4) Three suggested talking points for the employer introduction conversation. Be direct — if it's a poor fit, say so and explain why.`,

    pipelineReport: `Generate a 200-word pipeline briefing for executive consumption based on this data: ${JSON.stringify(context)}. Cover: current placement pace vs. ten-year 1,800-role goal, which programs produce the most pipeline-ready candidates and why, where the bottlenecks are right now, recommended priority action for the next 30 days. Written for Dia Simms and Ron Cole — no jargon, but full precision.`,

    employerPitch: `Generate a tailored one-page pitch for re-engaging or deepening the relationship with ${userInput?.employer || 'the selected employer'}. Three paragraphs: (1) what Pronghorn has already delivered — specific numbers, (2) current pipeline for their open roles — what's ready now, (3) why deepening the commitment serves their DEI and talent goals plus the specific ask. Confident, not sales-y. Peer-to-peer register.`,

    screeningAssessment: `Run a six-dimension screening assessment for this brand application: ${JSON.stringify(userInput)}. Score each dimension 1–100 weighted by: Founder Readiness (25%), Brand Differentiation (20%), Market Timing (15%), Commercial Traction (20%), Operational Maturity (10%), Mission Alignment (10%). Output: dimension scores with one-sentence rationale each, overall weighted score, recommendation (advance to deep diligence / hold pending info / decline with feedback), three specific questions for the founder interview, one comparable Pronghorn portfolio brand at a similar stage.`,

    categoryBrief: `Generate a current competitive landscape brief for the ${userInput?.category || 'spirits'} category. Include: top five brands by volume and estimated velocity, white space analysis (what positioning is unoccupied), recent M&A activity in the last 18 months, distribution dynamics (which channels are growing), one strategic question Pronghorn should ask about any new entrant in this category. Designed to be stored and reused — more useful over time.`,

    icBrief: `Generate a structured investment committee brief for this application: ${JSON.stringify(userInput)}. Sections: Executive Summary (one paragraph), Brand Overview (one paragraph), Investment Thesis (one paragraph), Risk Factors and Mitigants (three risks, each with a specific mitigant), Comparable Portfolio Investments (two Pronghorn brands at a similar stage when invested), Recommended Deal Structure (investment type, amount range, board representation, key terms), Questions the IC Should Pressure-Test (five specific questions). Professional, precise, defensible.`,

    assetPackage: `Generate a complete content asset specification for ${userInput?.brand || 'the selected brand'}: pillar ${userInput?.pillar || 'Ritual'}, platform ${userInput?.platform || 'Instagram'}. Output: (1) Primary image art direction brief (3 sentences — subject, mood, composition), (2) Video/Reel concept (2 sentences — concept and visual movement), (3) Caption with hashtag framework (caption text + 8–10 hashtags), (4) Alternative visual treatment option. Everything needed to brief a creative partner or generate via AI tool.`,

    brandStory: `Generate a provenance content series for ${userInput?.brand || 'the selected brand'} based on these founder story details: ${JSON.stringify(userInput?.founderDetails)}. Output: 5-part carousel/short video outline — each part gets a title, one-sentence visual direction, and 2–3 sentences of script/caption. Series arc: origin → ingredient/craft → founder's why → community connection → brand invitation. Built from the founder's own words.`,

    tradePackage: `Generate a complete on-premise trade package for ${userInput?.brand || 'the selected brand'} in ${userInput?.market || 'the priority market'}. Include: (1) Bartender education one-pager — spirit category context, brand differentiation, two signature serves with specs, training hook, (2) Sell sheet key stats — velocity, distribution, proof point, award if applicable, (3) Menu card insert — brand name, category, tasting notes, one recommended serve, (4) QR code content brief — what the digital page should contain. All content ready for a designer to execute.`,

    performanceInsight: `Analyze this 30-day performance data for ${userInput?.brand || 'the selected brand'}: ${JSON.stringify(userInput?.performanceData)}. Output: (1) What worked — the top performer and the pattern behind it, (2) What didn't — the underperformer and the likely reason, (3) The pattern behind the overall performance — what the data is actually saying, (4) Three specific recommendations for the next 30 days. Plain language. A founder without a marketing background should be able to act on this immediately.`,
  }

  return prompts[actionType] || `Help the user with: ${userInput}`
}

export async function callClaudeAPI(actionType, userInput, context, userProfile, brandData, moduleContext) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('API key not configured')

  const systemPrompt = buildSystemPrompt(userProfile, moduleContext, brandData)
  const userPrompt   = buildActionPrompt(actionType, userInput, context)

  let lastError
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type':                          'application/json',
          'x-api-key':                             apiKey,
          'anthropic-version':                     '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model:      'claude-sonnet-4-6',
          max_tokens: 1000,
          system:     systemPrompt,
          messages:   [{ role: 'user', content: userPrompt }],
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || `API error ${res.status}`)
      }

      const data = await res.json()
      const text = data?.content?.[0]?.text
      if (!text) throw new Error('Empty response')
      return text

    } catch (err) {
      lastError = err
      console.error(`[Pronghorn AI] Attempt ${attempt + 1} failed:`, err.message)
      if (attempt < 2) await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
    }
  }

  throw lastError
}
