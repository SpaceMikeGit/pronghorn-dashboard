// Talent pipeline data for Module 04
// Status: Semi-illustrative · Placement totals from Pronghorn Impact Report; stage/partner data illustrative
// Requires: ATS integration (Greenhouse/Lever) for live pipeline stage data

export const PIPELINE_OVERVIEW = {
  totalInPipeline:      847,
  activeApplications:   312,
  placementsYTD:        127,
  placementsAllTime:    542,
  targetPlacements:     1800,
  targetYears:          10,
  missionYearCurrent:   5,
  placementPaceMonthly: 3.6,
  openRoles:            48,
  activeEmployers:      62,
}

export const PIPELINE_STAGES = [
  { stage: 'Application Received',    count: 312, pct: 37 },
  { stage: 'Initial Screen',          count: 198, pct: 23 },
  { stage: 'Program Assessment',      count: 142, pct: 17 },
  { stage: 'Employer Introduction',   count: 89,  pct: 11 },
  { stage: 'Interview Stage',         count: 64,  pct: 8  },
  { stage: 'Offer & Placement',       count: 42,  pct: 5  },
]

export const PROGRAM_PERFORMANCE = [
  { program: 'Spirits Academy',      enrolled: 128, graduates: 94,  placements: 78,  rate: '83%', trend: 'Stable'      },
  { program: 'PREP',                 enrolled: 96,  graduates: 71,  placements: 58,  rate: '82%', trend: 'Improving'   },
  { program: 'HBCU Lab',             enrolled: 64,  graduates: 48,  placements: 38,  rate: '79%', trend: 'Stable'      },
  { program: 'Spirit Forward',       enrolled: 48,  graduates: 39,  placements: 36,  rate: '92%', trend: 'Accelerating'},
]

export const EMPLOYER_PARTNERS = [
  { name: 'Diageo',              tier: 'Anchor',   openRoles: 8,  totalPlacements: 42, commitment: 'Active' },
  { name: 'Beam Suntory',        tier: 'Premier',  openRoles: 3,  totalPlacements: 28, commitment: 'Active' },
  { name: 'Brown-Forman',        tier: 'Premier',  openRoles: 4,  totalPlacements: 24, commitment: 'Active' },
  { name: 'E&J Gallo',           tier: 'Premier',  openRoles: 5,  totalPlacements: 19, commitment: 'Active' },
  { name: 'Constellation Brands',tier: 'Premier',  openRoles: 6,  totalPlacements: 17, commitment: 'Active' },
  { name: 'Pernod Ricard',       tier: 'Standard', openRoles: 2,  totalPlacements: 14, commitment: 'Active' },
  { name: 'Bacardi USA',         tier: 'Standard', openRoles: 3,  totalPlacements: 11, commitment: 'Active' },
  { name: 'Campari Group',       tier: 'Standard', openRoles: 1,  totalPlacements: 8,  commitment: 'Active' },
  { name: 'Heaven Hill',         tier: 'Standard', openRoles: 2,  totalPlacements: 7,  commitment: 'Active' },
  { name: 'RNDC',                tier: 'Distributor', openRoles: 4, totalPlacements: 22, commitment: 'Active' },
  { name: 'Southern Glazers',    tier: 'Distributor', openRoles: 6, totalPlacements: 18, commitment: 'Active' },
]

export const SAMPLE_ROLES = [
  { employer: 'Beam Suntory',     title: 'Brand Activation Manager',   location: 'New York, NY',     category: 'Brand Marketing', daysOpen: 24 },
  { employer: 'Beam Suntory',     title: 'Regional Sales Manager',      location: 'New York, NY',     category: 'Sales',           daysOpen: 31 },
  { employer: 'Beam Suntory',     title: 'On-Premise Account Manager',  location: 'New York, NY',     category: 'Sales',           daysOpen: 18 },
  { employer: 'Southern Glazers', title: 'Portfolio Specialist',         location: 'Miami, FL',        category: 'Distribution',    daysOpen: 12 },
  { employer: 'Diageo',           title: 'Innovation Manager',           location: 'Norwalk, CT',      category: 'Brand Marketing', daysOpen: 8  },
  { employer: 'RNDC',             title: 'Sales Representative',         location: 'Atlanta, GA',      category: 'Distribution',    daysOpen: 19 },
  { employer: 'Brown-Forman',     title: 'Trade Marketing Manager',      location: 'Louisville, KY',   category: 'Brand Marketing', daysOpen: 14 },
  { employer: 'E&J Gallo',        title: 'Market Development Manager',   location: 'Los Angeles, CA',  category: 'Sales',           daysOpen: 22 },
]
