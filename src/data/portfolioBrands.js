// Portfolio brand roster — Module 02 Brand Activation + Module 03 Portfolio Health
// Status: Live (manually curated) · Source: Pronghorn public portfolio disclosures
// Requires: Manual update when portfolio changes; no live API integration planned

export const PORTFOLIO_BRANDS = [
  // RUM
  { name: 'Ten To One Caribbean Rum',                category: 'Rum',                verified: true },
  // WHISKEY & BOURBON
  { name: 'Den of Thieves',                          category: 'Whiskey & Bourbon',  verified: true },
  { name: 'Greenwood Whiskey',                       category: 'Whiskey & Bourbon',  verified: true },
  { name: 'Red Hazel Whiskey',                       category: 'Whiskey & Bourbon',  verified: true },
  { name: 'Old Hillside Bourbon Company',            category: 'Whiskey & Bourbon',  verified: true },
  { name: "Edmond's Honor Madagascar Vanilla Bourbon", category: 'Whiskey & Bourbon', verified: true },
  { name: 'Abisola Whiskey',                         category: 'Whiskey & Bourbon',  verified: true },
  { name: 'Alexander James Whiskey',                 category: 'Whiskey & Bourbon',  verified: true },
  { name: 'Shingu Spirits',                          category: 'Whiskey & Bourbon',  notes: 'Japanese whisky', verified: true },
  // TEQUILA & MEZCAL
  { name: 'Anteel Tequila',                          category: 'Tequila & Mezcal',   verified: true },
  { name: 'Ego Tequila',                             category: 'Tequila & Mezcal',   verified: true },
  { name: 'TCapri Tequila',                          category: 'Tequila & Mezcal',   verified: true },
  { name: 'Tequila With Friends',                    category: 'Tequila & Mezcal',   verified: true },
  { name: 'Los Hermanos Tequila 1978',               category: 'Tequila & Mezcal',   verified: true },
  { name: 'Humano Tequila',                          category: 'Tequila & Mezcal',   verified: true },
  { name: 'Doce Mezcal',                             category: 'Tequila & Mezcal',   verified: true },
  // GIN
  { name: 'Bayab Gin',                               category: 'Gin',                verified: true, isDefault: true },
  { name: 'Rally Gin',                               category: 'Gin',                verified: true },
  { name: 'Common Ground Spirits',                   category: 'Gin',                verified: true },
  { name: 'Spearhead Spirits',                       category: 'Gin',                verified: true },
  // VODKA
  { name: 'IslandJon Vodka',                         category: 'Vodka',              verified: true },
  // BRANDY & COGNAC
  { name: 'Acquired Taste Cognac',                   category: 'Brandy & Cognac',    verified: true },
  // DISTILLERIES & OTHER
  { name: 'Hella Cocktail Co.',                      category: 'Distilleries & Other', notes: 'cocktail mixers', verified: true },
  { name: 'Mocktail Club',                           category: 'Distilleries & Other', notes: 'non-alcoholic',   verified: true },
  { name: 'Delta Dirt Distillery',                   category: 'Distilleries & Other', verified: true },
  { name: 'New England Sweetwater Farm & Distillery',category: 'Distilleries & Other', verified: true },
]

export const CATEGORIES = [
  'Rum',
  'Whiskey & Bourbon',
  'Tequila & Mezcal',
  'Gin',
  'Vodka',
  'Brandy & Cognac',
  'Distilleries & Other',
]

export function getBrandsByCategory(category) {
  return PORTFOLIO_BRANDS.filter(b => b.category === category)
}

export function getDefaultBrand() {
  return PORTFOLIO_BRANDS.find(b => b.isDefault) || PORTFOLIO_BRANDS[0]
}
