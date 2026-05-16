// Portfolio health data for Module 03
// Status: Illustrative · Not sourced from live distributor feeds
// Requires: Distributor EDI/VIP integration (RNDC, Southern Glazer's) for live velocity data

export const VELOCITY_DATA = [
  { name: 'Abisola Whiskey',                      category: 'Whiskey & Bourbon', velocity: 4.7, trend: '+0.3',  status: 'Leading',      pill: 'pill--green' },
  { name: 'Bayab Gin',                           category: 'Gin',               velocity: 4.2, trend: '+0.8',  status: 'Accelerating', pill: 'pill--green' },
  { name: "Edmond's Honor",                      category: 'Whiskey & Bourbon', velocity: 3.9, trend: '+1.1',  status: 'Accelerating', pill: 'pill--green' },
  { name: 'Humano Tequila',                      category: 'Tequila & Mezcal',  velocity: 3.7, trend: '+0.6',  status: 'Accelerating', pill: 'pill--green' },
  { name: 'Rally Gin',                           category: 'Gin',               velocity: 3.5, trend: '+0.4',  status: 'Stable',       pill: 'pill--green' },
  { name: 'Ten To One Caribbean Rum',            category: 'Rum',               velocity: 3.2, trend: '+0.5',  status: 'Building',     pill: 'pill--green' },
  { name: 'Anteel Tequila',                      category: 'Tequila & Mezcal',  velocity: 3.0, trend: '+0.2',  status: 'Stable',       pill: 'pill--green' },
  { name: 'Common Ground Spirits',               category: 'Gin',               velocity: 2.8, trend: '+0.3',  status: 'Building',     pill: 'pill--amber' },
  { name: 'Doce Mezcal',                         category: 'Tequila & Mezcal',  velocity: 2.6, trend: '+0.4',  status: 'Building',     pill: 'pill--amber' },
  { name: 'Den of Thieves',                      category: 'Whiskey & Bourbon', velocity: 2.4, trend: '+0.1',  status: 'Stable',       pill: 'pill--amber' },
  { name: 'Acquired Taste Cognac',               category: 'Brandy & Cognac',   velocity: 2.2, trend: '0.0',   status: 'Stable',       pill: 'pill--amber' },
  { name: 'Abisola Whiskey',                     category: 'Whiskey & Bourbon', velocity: 2.1, trend: '+0.5',  status: 'Building',     pill: 'pill--amber' },
  { name: 'IslandJon Vodka',                     category: 'Vodka',             velocity: 2.0, trend: '+0.2',  status: 'Building',     pill: 'pill--amber' },
  { name: 'Tequila With Friends',                category: 'Tequila & Mezcal',  velocity: 1.9, trend: '−0.1',  status: 'Watch',        pill: 'pill--amber' },
  { name: 'Ego Tequila',                         category: 'Tequila & Mezcal',  velocity: 1.8, trend: '−0.2',  status: 'Watch',        pill: 'pill--red'  },
  { name: 'Greenwood Whiskey',                   category: 'Whiskey & Bourbon', velocity: 1.7, trend: '−0.3',  status: 'Watch',        pill: 'pill--red'  },
  { name: 'Hella Cocktail Co.',                  category: 'Distilleries & Other', velocity: 3.8, trend: '+0.7', status: 'Accelerating', pill: 'pill--green' },
  { name: 'Mocktail Club',                       category: 'Distilleries & Other', velocity: 2.9, trend: '+0.4', status: 'Building',   pill: 'pill--amber' },
  { name: 'Spearhead Spirits',                   category: 'Gin',               velocity: 2.3, trend: '+0.1',  status: 'Stable',       pill: 'pill--amber' },
  { name: 'Alexander James Whiskey',             category: 'Whiskey & Bourbon', velocity: 1.6, trend: '−0.4',  status: 'Concern',      pill: 'pill--red'  },
  { name: 'Los Hermanos Tequila 1978',           category: 'Tequila & Mezcal',  velocity: 2.2, trend: '+0.3',  status: 'Building',     pill: 'pill--amber' },
  { name: 'TCapri Tequila',                      category: 'Tequila & Mezcal',  velocity: 1.9, trend: '0.0',   status: 'Stable',       pill: 'pill--amber' },
  { name: 'Old Hillside Bourbon Company',        category: 'Whiskey & Bourbon', velocity: 1.8, trend: '−0.2',  status: 'Watch',        pill: 'pill--amber' },
  { name: 'Red Hazel Whiskey',                   category: 'Whiskey & Bourbon', velocity: 1.5, trend: '−0.5',  status: 'Concern',      pill: 'pill--red'  },
  { name: 'Delta Dirt Distillery',               category: 'Distilleries & Other', velocity: 2.1, trend: '+0.2', status: 'Building',   pill: 'pill--amber' },
  { name: 'New England Sweetwater Farm',         category: 'Distilleries & Other', velocity: 1.8, trend: '+0.1', status: 'Building',   pill: 'pill--amber' },
  { name: 'Shingu Spirits',                      category: 'Whiskey & Bourbon', velocity: 2.0, trend: '+0.3',  status: 'Building',     pill: 'pill--amber' },
]

export const EXIT_READINESS = [
  { name: 'Abisola Whiskey',             velocity: 5, distribution: 5, revenue: 5, team: 5, composite: 20, signal: 'Exit Ready',    pill: 'pill--green' },
  { name: "Edmond's Honor",             velocity: 4, distribution: 4, revenue: 4, team: 4, composite: 16, signal: 'Near Ready',    pill: 'pill--green' },
  { name: 'Bayab Gin',                  velocity: 4, distribution: 3, revenue: 3, team: 4, composite: 14, signal: 'Near Ready',    pill: 'pill--green' },
  { name: 'Humano Tequila',             velocity: 4, distribution: 3, revenue: 3, team: 3, composite: 13, signal: 'Building',      pill: 'pill--amber' },
  { name: 'Rally Gin',                  velocity: 3, distribution: 4, revenue: 3, team: 3, composite: 13, signal: 'Building',      pill: 'pill--amber' },
  { name: 'Hella Cocktail Co.',         velocity: 4, distribution: 3, revenue: 3, team: 3, composite: 13, signal: 'Building',      pill: 'pill--amber' },
  { name: 'Ten To One Caribbean Rum',   velocity: 3, distribution: 3, revenue: 3, team: 3, composite: 12, signal: 'Building',      pill: 'pill--amber' },
  { name: 'Anteel Tequila',             velocity: 3, distribution: 3, revenue: 2, team: 3, composite: 11, signal: 'Early',         pill: 'pill--amber' },
  { name: 'Common Ground Spirits',      velocity: 3, distribution: 2, revenue: 2, team: 3, composite: 10, signal: 'Early',         pill: 'pill--amber' },
  { name: 'Red Hazel Whiskey',          velocity: 1, distribution: 2, revenue: 1, team: 2, composite: 6,  signal: 'Needs Support', pill: 'pill--red'  },
]
