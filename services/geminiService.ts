import { Team, Scenario } from '../types';

const PRESET_ANALYSIS = [
  // Round 1: Intro
  [
    "The digital storefronts are open! Early adopters are gaining traction, but brand identity is still a blur.",
    "It's a scramble for digital real estate. Some teams are playing it safe, while others are betting the farm on custom tech.",
    "The market is waking up. Those who balanced speed with control are seeing the first dividends."
  ],
  // Round 2: Business Models
  [
    "Inventory costs are biting some teams, while the dropshippers are dealing with angry customers.",
    "Business models are locking in. Margins vary wildly across the board as logistics realities set in.",
    "Subscription models are looking tasty for recurring revenue, but churn is the silent killer here."
  ],
  // Round 3: Infrastructure
  [
    "Servers are smoking! Scalability is the name of the game now.",
    "The tech debt is real. Teams on solid platforms are shipping features while others are patching leaks.",
    "Custom stacks offer power, but maintenance costs are starting to creep up on the bottom line."
  ],
  // Round 4: Mobile
  [
    "Mobile traffic just overtook desktop! Teams without a responsive strategy are bleeding customers.",
    "App stores are crowded. Only the stickiest experiences are retaining users this quarter.",
    "The thumb-scroll economy is here. Seamless mobile checkout is separating the winners from the losers."
  ],
  // Round 5: Marketing
  [
    "CAC is skyrocketing! It's an expensive war for eyeballs out there.",
    "Organic reach is dead. Paid ads are driving volume, but is it sustainable?",
    "Influencers are making or breaking brands today. One viral post changed the leaderboard overnight."
  ],
  // Round 6: Supply Chain
  [
    "Logistics nightmares everywhere! The fulfillment crunch is testing everyone's operational limits.",
    "Warehouses are full. Automation is looking like a smart investment for those who can afford it.",
    "Shipping delays are causing cancellations. 3PL providers are overwhelmed but necessary."
  ],
  // Round 7: Global
  [
    "Going global isn't easy. Customs duties and language barriers are tripping up the ambitious.",
    "International markets are hungry, but logistics costs are eating into those new revenue streams.",
    "The world is flat for e-commerce, but local fulfillment centers are proving to be the kingmakers."
  ],
  // Round 8: Scaling
  [
    "Price wars have erupted! Margins are razor thin as competitors fight for market share.",
    "It's a race to the bottom on price, or a climb to the top on brand value. No middle ground left.",
    "Customer loyalty is the only shield against these aggressive new competitors."
  ],
  // Round 9: Emerging Tech
  [
    "AI is transforming the dashboard. Personalization is converting window shoppers into buyers.",
    "The robots are here to help. Predictive algorithms are saving fortunes in inventory management.",
    "Tech-forward teams are seeing efficiency gains that look like magic to the traditionalists."
  ],
  // Round 10: Security
  [
    "Trust is the new currency. A security scare has everyone double-checking their firewalls.",
    "Data privacy is paramount. Teams that cut corners on security are sweating right now.",
    "The simulation ends with a test of integrity. Long-term trust beats short-term gains."
  ]
];

const GENERIC_COMMENTS = [
  "The market is volatile. Agility is key to survival right now.",
  "Analysts are crunching the numbers. Competition is heating up!",
  "Revenue charts are looking interesting. It's anyone's game.",
  "Customer sentiment is shifting. Adaptation is necessary.",
  "The leaderboard is tight. Every decision counts."
];

export const generateMarketAnalysis = async (
  teams: Team[],
  scenario: Scenario,
  round: number
): Promise<string> => {
  // Simulate a short delay to feel like "processing" / analyzing
  await new Promise(resolve => setTimeout(resolve, 800));

  const scenarioIndex = round - 1;
  let comments = GENERIC_COMMENTS;

  if (scenarioIndex >= 0 && scenarioIndex < PRESET_ANALYSIS.length) {
    comments = PRESET_ANALYSIS[scenarioIndex];
  }

  const randomIndex = Math.floor(Math.random() * comments.length);
  return comments[randomIndex];
};