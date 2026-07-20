// Edmond's Honor Marketing OS — static data for all 5 modules

export const EH_KPIS = [
  { label: 'Marketing Spend YTD',      value: '$186K',  hero: false },
  { label: 'Budget Remaining',          value: '$64K',   hero: false },
  { label: 'Activations This Quarter',  value: '14',     hero: false },
  { label: 'Qualified Tastings',        value: '1,850',  hero: true  },
  { label: 'Priority Markets Active',   value: '5',      hero: false },
  { label: 'New Account Touches',       value: '42',     hero: false },
  { label: 'Menu / Backbar Wins',       value: '18',     hero: false },
  { label: 'Content Engagement Lift',   value: '+23%',   hero: false },
]

export const EH_ACTIVATION_HEALTH = [
  { label: 'Planned',          value: 8  },
  { label: 'In Production',    value: 4  },
  { label: 'Live This Month',  value: 2  },
  { label: 'Awaiting Recap',   value: 3  },
  { label: 'Learnings Added',  value: 9  },
]

export const EH_MARKET_HEAT = [
  { market: 'Atlanta',       heat: 'high',   signal: 'Hotel/bar partner interest',      action: 'Confirm private tasting series' },
  { market: 'Baltimore/DC',  heat: 'high',   signal: 'Preakness/event network',         action: 'Build cultural calendar' },
  { market: 'New York',      heat: 'medium', signal: 'On-premise opportunity',          action: 'Prioritize beverage directors' },
  { market: 'Los Angeles',   heat: 'medium', signal: 'Lifestyle creator fit',           action: 'Vet luxury partners' },
  { market: 'Chicago',       heat: 'watch',  signal: 'Distributor follow-up needed',    action: 'Account review' },
]

export const EH_LEADERSHIP_DECISIONS = [
  'Approve Q4 private tasting framework',
  'Select 3 priority hospitality partners',
  'Decide whether "After the Work" becomes campaign territory',
  'Confirm event recap KPI standard',
  'Greenlight content capture package',
]

export const EH_WEEKLY_SUMMARY = `EDMOND'S HONOR — WEEKLY LEADERSHIP SUMMARY

HEADLINE: Atlanta activation pipeline advancing on two fronts. Tasting
series with gallery partner confirmed for next month. Budget pacing at
74% with $64K remaining and two approved activations pending execution.

MARKET HEAT: Atlanta and Baltimore/DC remain priority markets with high
activation momentum and strong distributor follow-up. New York account
development is behind pace — beverage director outreach should be
accelerated this week.

SPEND EFFICIENCY: 14 activations delivered 1,850 qualified tastings
at an average cost per qualified tasting of approximately $101 — strong
against category benchmarks for ultra-premium spirits.

DECISION REQUIRED: Q4 private tasting framework needs leadership approval
by end of month to allow venue contracting to proceed.

Next briefing: Monday 8:00 AM
Source: Illustrative prototype data`

export const EH_ACTIVATIONS = [
  {
    id:             'gallery-dinner',
    name:           'Private Gallery Dinner',
    market:         'Atlanta',
    type:           'Cultural Dinner',
    partner:        'Contemporary gallery / curator',
    objective:      'High-value trial + cultural credibility',
    budget:         '$18K',
    status:         'In Production',
    successMetrics: '40 qualified guests, 10 account follow-ups, 20 content assets',
    nextAction:     'Confirm catering + content capture team',
  },
  {
    id:             'hotel-suite',
    name:           'Hotel Suite Tasting',
    market:         'New York',
    type:           'Hospitality Partner Activation',
    partner:        'Luxury boutique hotel',
    objective:      'Premium occasion + room-service/cocktail opportunity',
    budget:         '$12K',
    status:         'Concept',
    successMetrics: '25 tastings, 5 beverage director meetings',
    nextAction:     'Intro meeting with F&B director',
  },
  {
    id:             'chefs-counter',
    name:           "Chef's Counter Series",
    market:         'Baltimore/DC',
    type:           'Culinary Collaboration',
    partner:        'Chef / restaurant group',
    objective:      'Connect vanilla, craft, and ritual',
    budget:         '$22K',
    status:         'Approved',
    successMetrics: '3 dinners, 90 guests, 2 menu placements',
    nextAction:     'Confirm dates + produce run of show',
  },
  {
    id:             'quiet-rooms',
    name:           'The Quiet Rooms — Content Shoot',
    market:         'Atlanta',
    type:           'Campaign Content Capture',
    partner:        'Photographer / production team',
    objective:      'Build campaign asset library',
    budget:         '$35K',
    status:         'Concept',
    successMetrics: '50 edited stills, 12 short-form videos, toolkit images',
    nextAction:     'Brief photographer, confirm talent',
  },
  {
    id:             'preakness',
    name:           'Preakness Cultural Weekend',
    market:         'Baltimore',
    type:           'Cultural / Sports / Hospitality',
    partner:        'Existing network',
    objective:      'Regional prestige + content capture',
    budget:         '$28K',
    status:         'Learnings Added',
    successMetrics: 'Recap complete, follow-up list built',
    nextAction:     'Distribute learnings to field team',
  },
]

export const EH_PARTNERS = [
  {
    name:        'Luxury Boutique Hotel (NYC/ATL)',
    scores:      { audienceFit: 9, culturalCred: 8, luxury: 10, story: 8, commercial: 9, content: 7, feasibility: 8, risk: 8 },
    composite:   8.4,
    tier:        'Priority',
    recommendation: 'Pursue. High-value placement opportunity. Lead with suite amenity + cocktail menu.',
  },
  {
    name:        'Contemporary Art Gallery (Atlanta)',
    scores:      { audienceFit: 9, culturalCred: 10, luxury: 8, story: 10, commercial: 6, content: 10, feasibility: 9, risk: 9 },
    composite:   8.9,
    tier:        'Priority',
    recommendation: 'Lead partner for Q3. Cultural credibility is unmatched. Structure for content-first activation.',
  },
  {
    name:        'Celebrity Chef / Restaurant Group (Baltimore/DC)',
    scores:      { audienceFit: 8, culturalCred: 9, luxury: 8, story: 9, commercial: 8, content: 8, feasibility: 8, risk: 8 },
    composite:   8.3,
    tier:        'Priority',
    recommendation: "Chef's Counter Series already approved. Strong repeat potential.",
  },
  {
    name:        'Luxury Lifestyle Creator (LA market)',
    scores:      { audienceFit: 7, culturalCred: 7, luxury: 7, story: 6, commercial: 7, content: 9, feasibility: 7, risk: 6 },
    composite:   7.0,
    tier:        'Selective',
    recommendation: 'Evaluate individual. Brand rightness varies significantly by creator. Vet before committing budget.',
  },
  {
    name:        'Major Spirits Festival',
    scores:      { audienceFit: 6, culturalCred: 5, luxury: 4, story: 5, commercial: 8, content: 5, feasibility: 6, risk: 7 },
    composite:   5.8,
    tier:        'Watch',
    recommendation: 'Volume play, not brand play. Consider if distribution goals outweigh positioning risk.',
  },
]

export const EH_CONTENT_PILLARS = [
  { id: 'occasion',      label: 'The Occasion',      desc: "Edmond's Honor in elevated, earned moments" },
  { id: 'craft',         label: 'The Craft',          desc: 'Grain selection, distillation, the physical making of the spirit' },
  { id: 'culture',       label: 'The Culture',        desc: 'Black excellence, community, the people behind and around the brand' },
  { id: 'conversation',  label: 'The Conversation',   desc: 'Industry, category education, bar/trade community' },
]

export const EH_PLATFORM_STRATEGY = [
  { platform: 'Instagram', frequency: '4x/week', primaryPillar: 'The Occasion + The Culture',       formatPriority: 'Reels + Stills' },
  { platform: 'TikTok',    frequency: '3x/week', primaryPillar: 'The Craft + The Conversation',     formatPriority: 'Short-form video' },
  { platform: 'LinkedIn',  frequency: '2x/week', primaryPillar: 'The Culture + The Conversation',   formatPriority: 'Long-form + thought leadership' },
]

export const EH_CALENDAR_WEEKS = [
  {
    week: 1,
    entries: [
      { day: 'Mon', pillar: 'occasion',     copy: 'Gallery dinner preview',        format: 'IG Reel' },
      { day: 'Wed', pillar: 'craft',        copy: 'Grain sourcing story',           format: 'TikTok' },
      { day: 'Fri', pillar: 'culture',      copy: 'Founder feature',               format: 'IG + LinkedIn' },
      { day: 'Sun', pillar: 'occasion',     copy: 'Serve moment',                  format: 'IG Still' },
    ],
  },
  {
    week: 2,
    entries: [
      { day: 'Tue', pillar: 'conversation', copy: 'Bartender education',           format: 'TikTok' },
      { day: 'Thu', pillar: 'craft',        copy: 'Behind the barrel',             format: 'IG Reel' },
      { day: 'Sat', pillar: 'culture',      copy: 'Community partner spotlight',   format: 'IG Stories' },
    ],
  },
  {
    week: 3,
    entries: [
      { day: 'Mon', pillar: 'occasion',     copy: "Chef's Counter Series preview", format: 'IG + TikTok' },
      { day: 'Wed', pillar: 'conversation', copy: 'Category comparison',           format: 'LinkedIn' },
      { day: 'Fri', pillar: 'occasion',     copy: 'Hotel suite tasting content drop', format: 'IG Reel' },
    ],
  },
  {
    week: 4,
    entries: [
      { day: 'Tue', pillar: 'craft',        copy: 'Master distiller Q&A',          format: 'LinkedIn + TikTok' },
      { day: 'Thu', pillar: 'culture',      copy: 'Market activation recap',       format: 'IG Carousel' },
      { day: 'Sat', pillar: 'occasion',     copy: 'Weekend serve content',         format: 'IG Still' },
    ],
  },
]

export const EH_PREAKNESS_RECAP = `EDMOND'S HONOR — POST-EVENT ACTIVATION RECAP

EVENT: Preakness Cultural Weekend
MARKET: Baltimore, MD
DATE: May 2025
ACTIVATION TYPE: Cultural / Sports / Hospitality
BUDGET: $28,000 INVESTED

─────────────────────────────────────────────
OUTCOMES

Qualified Engagements:     312
Account Introductions:      14
Distributor Conversations:   6
Content Assets Captured:    38 (stills + video)
Press/Media Mentions:        3
Social Reach (organic):  ~41,000 impressions

─────────────────────────────────────────────
WHAT WORKED

The private tasting format outperformed the open-pour format 3:1 on
qualified conversation quality. Guests who received a formal seated
introduction to the brand story converted to menu inquiry at 2x the
rate of general activation guests.

The Baltimore network proved deeper than mapped — six distributor
contacts not in the CRM surfaced through the event partner's existing
relationships. All six are now in follow-up.

Content from the Saturday evening session produced the highest organic
engagement of any activation-sourced content this quarter.

─────────────────────────────────────────────
WHAT TO IMPROVE

Lead time for venue coordination was too short — 3 weeks minimum
required for this event type. Staff briefing should happen 48 hours
before the event, not morning-of.

Pre-event distributor outreach should begin 2 weeks earlier to allow
joint attendance scheduling.

─────────────────────────────────────────────
TRANSFERABLE TO PLAYBOOK

Private tasting format (30 guests maximum) is the confirmed standard.
Formal brand story introduction before pour is required — not optional.
Distributor pre-coordination is a prerequisite, not a nice-to-have.
Content capture team should be separate from activation staff.

─────────────────────────────────────────────
NEXT ACTIVATION IN THIS MARKET: Chef's Counter Series — Q3

Source: Illustrative prototype data`
