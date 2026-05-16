// User profiles for demo mode — drives personalized synthesis panel outputs
// Status: Static demo data · Not connected to auth/identity provider
// Requires: Auth0/Okta integration + user preference API for live personalization

export const USER_PROFILES = {
  toni: {
    id: 'toni',
    name: 'Toni Fletcher',
    title: 'VP Business Operations & Finance',
    primaryFocus: 'Diageo milestone reporting and KPI accountability',
    brands: ['Bayab Gin', "Edmond's Honor Madagascar Vanilla Bourbon"],
    synthesis: {
      module01: "Three of the five Diageo milestone KPIs are currently tracking above target. The one most at risk — executive placement pace — is 12% behind the 90-day projection. The narrative for your next milestone conversation is stronger if it leads with brand portfolio growth rather than placement velocity. Want me to generate a board summary that frames it this way?",
      module02: "Bayab Gin's Audience Targeting section has four competitor gaps that are currently unaddressed in the active content calendar. Hendrick's and Uncle Val's are both running high-frequency craft bar programming in Q2. The Content Strategy section has two pillar slots this month that could be repositioned to own that white space.",
      module03: "Portfolio velocity data shows three brands in the Tequila & Mezcal category outperforming their category benchmark by more than 20% this quarter. Chain authorization in those states is below portfolio average. That gap is the commercial opportunity most worth presenting to the Diageo team.",
      module04: "Pipeline placement pace for Q2 is currently 8% ahead of the annualized target. The program producing the most placement-ready candidates this quarter is Spirit Forward, not Spirits Academy. That's a reversal from Q1 and worth noting in the next board update.",
      module05: "Four applications in the current pipeline have been in the Due Diligence Library stage for more than 30 days. Two of them have Founder Readiness scores above 70. The bottleneck is Commercial Traction data — both founders have incomplete distribution records. One follow-up ask per founder would unblock both.",
      module06: "Bayab Gin's Brand Profile completeness is at 78%. The two incomplete fields — primary distributor contact and retail authorization map — are the ones that most affect Asset Studio output quality. Completing those would unlock higher-confidence generation across the Trade Package and Content Calendar sections.",
    }
  },
  connor: {
    id: 'connor',
    name: 'Connor McKenna',
    title: 'Portfolio Manager',
    primaryFocus: 'Brand velocity and distribution health across 40+ portfolio brands',
    brands: ['Humano Tequila', 'Doce Mezcal', 'Rally Gin', 'Common Ground Spirits'],
    synthesis: {
      module01: "Portfolio growth is outpacing the industry benchmark by 15.8 points year-to-date. The narrative that lands hardest with investors right now is the brand velocity story — 12% revenue growth against a market that's contracting 3.8%. That's the frame worth leading with in the next external summary.",
      module02: "Brand Activation data shows a pattern: brands with completed Trade Activation sections are generating 40% more on-premise placements in their target markets. Four brands in your active portfolio have incomplete Trade Activation data. Completing those sections is the highest-leverage action in this module right now.",
      module03: "Three brands you haven't reviewed this month — Doce Mezcal, Abisola Whiskey, and Common Ground Spirits — are showing velocity patterns similar to Rally Gin at the same stage. Rally Gin's current trajectory followed a distributor relationship deepening in months four through six. That window is open for these three now.",
      module04: "Five open employer roles have been unmatched for more than 21 days. Three of those roles are in spirits sales — the most active hiring category this quarter. Your pipeline has 12 candidates with spirits sales backgrounds. Running candidate matches on those three roles would likely surface at least two strong fits.",
      module05: "The two applications with the highest overall readiness scores this month are both in the Tequila & Mezcal category — the same category currently showing the strongest portfolio velocity. That's a pattern worth flagging for the investment committee: category momentum aligns with both your existing portfolio strength and your best new applicants.",
      module06: "Three portfolio brands are actively using the Brand Partner Toolkit this week. The one with the highest Asset Studio usage — Humano Tequila — hasn't yet connected their Performance Intelligence data. Without that connection, the insight recommendations in Performance Intelligence are generating from brand profile data alone, not actual results.",
    }
  },
  allison: {
    id: 'allison',
    name: 'Allison Irby',
    title: 'Talent Programs Manager',
    primaryFocus: 'Candidate matching and placement across DISCUS partner network',
    brands: [],
    synthesis: {
      module01: "Mission progress data shows the talent pipeline commitment at 74% of goal with 50% of the mission timeline elapsed. The placement velocity required to hit the 1,800-role target is 3.6 placements per month over the remaining 5 years — down from the original 6/year pace. The story is ahead of schedule, not behind.",
      module02: "The Brand Activation module has a talent angle that's underutilized: bartender ambassador programs are the third-highest engagement channel in the Audience Targeting data. Those programs run through your DISCUS employer network. There may be a placement pathway there that isn't currently being tracked.",
      module03: "Portfolio health data shows eight brands in active distribution expansion phases across New York, Chicago, and Los Angeles. All three markets have open roles in your pipeline. A cross-module flag for Dallas and Cruz: candidate placement in those markets could accelerate the brands' on-premise velocity.",
      module04: "You've run candidate matches in Atlanta and Chicago seventeen times this month but haven't matched any candidates to the three open roles at Beam Suntory in New York. Two of your strongest pipeline candidates have New York flexibility flagged. Want me to run those matches?",
      module05: "Six of the twelve applications currently in Due Diligence have founders with backgrounds in hospitality or food service — not spirits. Historically, those founders have a 40% lower completion rate in the first 18 months. That's not a screen-out signal, but it is a support-need signal. Those founders may be strong candidates for the Spirits Academy track.",
      module06: "Four portfolio brand founders in the Brand Partner Toolkit are asking questions about distributor relationships in their brand profiles. That's a signal they'd benefit from a connection to someone in the talent pipeline who's placed candidates in distributor roles. The system can surface that connection — it just needs a flag in the Employer Relationships section.",
    }
  },
  dallas: {
    id: 'dallas',
    name: 'Dallas Foster',
    title: 'Director of Sales & Distribution',
    primaryFocus: 'Distributor relationships and on-premise activation across priority markets',
    brands: ['Humano Tequila', 'Bayab Gin', 'Ten To One Caribbean Rum'],
    synthesis: {
      module01: "Commercial outperformance data in Mission Progress shows the portfolio growing at 12% revenue while the total market contracts 3.8%. The on-premise activation investment is the clearest driver — brands with active trade programs are outperforming by a wider margin than brands without.",
      module02: "Trade Activation data for Bayab Gin shows the Florida market is the highest-velocity on-premise opportunity not yet activated. The competitor landscape in Florida has a clear craft gin gap — no brand in the Bayab competitive set is currently running bartender ambassador programs in Miami. That's a first-mover window.",
      module03: "Humano Tequila is your fastest-moving brand by depletion velocity in Florida this quarter. Chain authorization in Florida is currently limited to two accounts. The velocity data makes a strong case for a chain expansion conversation. Want me to generate a distributor brief for the Florida market?",
      module04: "Pipeline data shows four candidates with active distributor relationship experience in your priority markets — New York, Chicago, Los Angeles, Atlanta, and Florida. Two of those candidates are unmatched. A placement in a distributor role in Chicago or Florida would directly support your Q3 activation targets.",
      module05: "Three applications in the screening pipeline are founders with strong Florida or Texas distribution roots. If those brands advance to investment, their distributor relationships overlap with your current priority markets. Worth flagging for Connor and the investment committee.",
      module06: "Humano Tequila's Trade Package section in the Brand Partner Toolkit is 60% complete. The missing field — recommended on-premise targets by account tier in Florida — is the one piece that would make their trade materials ready for your next distributor conversation. One question to the founder would unlock that output.",
    }
  },
  dia: {
    id: 'dia',
    name: 'Dia Simms',
    title: 'Co-Founder & Board Chair',
    primaryFocus: 'Mission narrative, investor relations, and portfolio growth story',
    brands: ["Edmond's Honor Madagascar Vanilla Bourbon", 'Bayab Gin'],
    synthesis: {
      module01: "Your last three press mentions led with the 542 careers accelerated figure. The strongest performing external narrative this quarter is the 101% portfolio growth figure paired with a specific founder story. Edmond's Honor's Madagascar Vanilla Bourbon award in February is the most media-ready proof point you haven't used yet.",
      module02: "Brand Activation content strategy data shows the Source pillar — provenance and heritage storytelling — is generating the highest engagement across three portfolio brands. Bayab's African botanical sourcing story hasn't been formatted for long-form content. That's a narrative gap worth closing before the next press cycle.",
      module03: "Portfolio health data shows the suite is tracking $428M in cumulative economic impact against a $364M goal — 18% ahead of pace. The investor update format that lands best is: mission metric + commercial proof + specific founder story. The data is here. The founder story is Edmond's Honor. Want me to draft that paragraph?",
      module04: "Talent pipeline is at 74% of goal at the 50% mission timeline mark — ahead of pace. The program producing the most board-ready narrative isn't the headline number; it's the Spirit Forward program placement velocity, which has doubled in 18 months. That's the proof of operational maturity investors and Diageo want to see.",
      module05: "Deal pipeline data shows the highest-readiness applications this month are concentrated in two categories: Tequila & Mezcal and Gin. Both align with category growth trends that are 18 months ahead of portfolio entry in the first investment cycle. That pattern — ahead of category curve — is a strong investor narrative.",
      module06: "Three portfolio brand founders are actively using the Brand Partner Toolkit. The most engaged founder has run 12 AI actions this week. That usage pattern is exactly the proof of concept the supercharging program needs: a 25-person HQ meaningfully activating 40+ brands. That story is the most powerful thing in the suite right now.",
    }
  },
}

export function getSynthesisOutput(userId, moduleId) {
  const user = USER_PROFILES[userId]
  if (!user) return null
  return user.synthesis[moduleId] || null
}
