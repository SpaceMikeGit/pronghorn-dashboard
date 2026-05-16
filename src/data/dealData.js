// Deal screening data for Module 05
// Status: Illustrative · Not sourced from live application systems
// Requires: CRM integration (Salesforce/Airtable) + founder portal API for live deal flow

export const SCORING_DIMENSIONS = [
  { id: 'founderReadiness',  label: 'Founder Readiness',   weight: 25, description: 'Relevant experience, industry relationships, demonstrated execution capability, resilience indicators' },
  { id: 'brandDiff',         label: 'Brand Differentiation',weight: 20, description: 'Category positioning, cultural authenticity, narrative strength, visual identity maturity' },
  { id: 'marketTiming',      label: 'Market Timing',        weight: 15, description: 'Category growth trajectory, competitive white space, distribution opportunity' },
  { id: 'commercialTraction',label: 'Commercial Traction',  weight: 20, description: 'Revenue trend, distribution velocity, retail and on-premise footprint, consumer engagement' },
  { id: 'operationalMaturity',label:'Operational Maturity', weight: 10, description: 'Supply chain stability, production capacity, team depth beyond the founder' },
  { id: 'missionAlignment',  label: 'Mission Alignment',    weight: 10, description: "Black ownership and leadership, community impact narrative, alignment with Pronghorn's public positioning" },
]

export const PIPELINE_STAGES = [
  { stage: 'Initial Inquiry',         count: 48, pct: 38 },
  { stage: 'Application Received',    count: 32, pct: 25 },
  { stage: 'Screening Assessment',    count: 24, pct: 19 },
  { stage: 'Due Diligence',           count: 14, pct: 11 },
  { stage: 'IC Presentation',         count: 6,  pct: 5  },
  { stage: 'Investment Closed',       count: 3,  pct: 2  },
]

export const SAMPLE_APPLICATIONS = [
  {
    name: 'Solstice Rum Co.',        category: 'Rum',               stage: 'Due Diligence',    score: 82, rec: 'IC Ready',    pill: 'pill--green' },
  { name: 'Kente Spirits',          category: 'Vodka',             stage: 'Due Diligence',    score: 78, rec: 'Deep Diligence', pill: 'pill--green' },
  { name: 'Ironwood Rye',           category: 'Whiskey & Bourbon', stage: 'Screening',        score: 71, rec: 'Deep Diligence', pill: 'pill--green' },
  { name: 'Cascabel Mezcal',        category: 'Tequila & Mezcal',  stage: 'Screening',        score: 68, rec: 'Deep Diligence', pill: 'pill--amber' },
  { name: 'Orin Swift Imitation',   category: 'Distilleries & Other', stage: 'Application',  score: 55, rec: 'Hold — Pending Info', pill: 'pill--amber' },
  { name: 'Heritage Gin Works',     category: 'Gin',               stage: 'Initial Inquiry',  score: 48, rec: 'Hold — More Info', pill: 'pill--amber' },
  { name: 'Sunset Spirits Co.',     category: 'Brandy & Cognac',   stage: 'Application',      score: 42, rec: 'Decline — Insufficient Data', pill: 'pill--red' },
]

export const DILIGENCE_LIBRARY = [
  { category: 'Rum',                briefDate: 'March 2025', topBrands: 'Diplomatico, Flor de Caña, Ten To One', whiteSpace: 'Premium aged expressions in 750mL for on-premise' },
  { category: 'Whiskey & Bourbon',  briefDate: 'February 2025', topBrands: 'Elijah Craig, Buffalo Trace, Uncle Nearest', whiteSpace: 'Single barrel programs for chain retail' },
  { category: 'Tequila & Mezcal',   briefDate: 'April 2025', topBrands: 'Don Julio, Casamigos, Doce Mezcal', whiteSpace: 'Mid-tier mezcal with culinary positioning' },
  { category: 'Gin',                briefDate: 'January 2025', topBrands: "Hendrick's, Tanqueray, Bayab", whiteSpace: 'Provenance-forward expressions with African or Caribbean terroir' },
  { category: 'Vodka',              briefDate: 'December 2024', topBrands: 'Grey Goose, Tito\'s, IslandJon', whiteSpace: 'Lifestyle vodka for multicultural Gen Z consumers' },
]
