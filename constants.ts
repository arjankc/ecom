import { Scenario, Team } from './types';
import { ShoppingBag, Globe, Server, Smartphone, Users, Zap, Award, TrendingUp, Crown, Rocket, Cpu, Megaphone } from 'lucide-react';

export const INITIAL_REVENUE = 10000;
export const INITIAL_CUSTOMERS = 0;
export const INITIAL_INFRA = 10;
export const INITIAL_BRAND = 10;

export const TEAM_CONFIGS = [
  { name: 'Alpha Corp', color: 'bg-blue-600 border-blue-400' },
  { name: 'Beta Ltd', color: 'bg-red-600 border-red-400' },
  { name: 'Gamma Inc', color: 'bg-green-600 border-green-400' },
  { name: 'Delta Co', color: 'bg-purple-600 border-purple-400' },
];

export const BADGES: Record<string, { label: string; icon: any; color: string; description: string }> = {
  UNICORN: { 
    label: 'Unicorn Status', 
    icon: Crown, 
    color: 'text-yellow-400', 
    description: 'Achieved $40,000+ Revenue' 
  },
  TECH_TITAN: { 
    label: 'Tech Titan', 
    icon: Cpu, 
    color: 'text-purple-400', 
    description: 'Built 80+ Infrastructure' 
  },
  VIRAL_SENSATION: { 
    label: 'Viral Sensation', 
    icon: Users, 
    color: 'text-pink-400', 
    description: 'Acquired 2,500+ Customers' 
  },
  BRAND_ICON: { 
    label: 'Brand Icon', 
    icon: Megaphone, 
    color: 'text-indigo-400', 
    description: 'Achieved 80+ Brand Awareness' 
  },
  SCALABLE: {
    label: 'Scalable Startup',
    icon: Rocket,
    color: 'text-orange-400',
    description: 'Infrastructure ready for the big leagues'
  }
};

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    unit: 'Unit 1: Introduction to E-commerce',
    title: 'The Digital Leap',
    description: 'Your traditional retail business is seeing declining foot traffic. How do you enter the digital market?',
    choices: [
      {
        id: 'marketplace',
        label: 'Join a Marketplace',
        description: 'List products on Amazon/eBay. Low cost, high reach, low control.',
        impact: { revenue: 5000, customers: 500, infrastructure: 5, brandAwareness: 10 },
        feedback: 'Immediate sales boost, but you are struggling to build your own brand identity.'
      },
      {
        id: 'website',
        label: 'Build Own Website',
        description: 'Launch a custom domain store. Higher cost, full control, slower start.',
        impact: { revenue: 1000, customers: 100, infrastructure: 20, brandAwareness: 25 },
        feedback: 'Slow initial sales, but you own the customer data and brand experience.'
      },
      {
        id: 'hybrid',
        label: 'Hybrid Strategy',
        description: 'A small website plus social media selling.',
        impact: { revenue: 3000, customers: 300, infrastructure: 15, brandAwareness: 15 },
        feedback: 'A balanced start, catching trends early but spreading resources thin.'
      }
    ]
  },
  {
    id: 2,
    unit: 'Unit 2: Business Models',
    title: 'Defining the Model',
    description: 'You need to decide how you source and sell products. This defines your operational structure.',
    choices: [
      {
        id: 'inventory',
        label: 'Inventory Model',
        description: 'Buy stock, warehouse it, ship it. High margin, high risk.',
        impact: { revenue: 8000, customers: 200, infrastructure: 10, brandAwareness: 20 },
        feedback: 'Margins are great, but warehousing costs are eating into cash flow.'
      },
      {
        id: 'dropship',
        label: 'Dropshipping',
        description: 'Supplier ships directly. Low risk, low margin, high competition.',
        impact: { revenue: 4000, customers: 400, infrastructure: 5, brandAwareness: 5 },
        feedback: 'Easy to scale product range, but customer complaints about shipping times are up.'
      },
      {
        id: 'subscription',
        label: 'Subscription Box',
        description: 'Curated monthly deliveries. Recurring revenue, high churn risk.',
        impact: { revenue: 6000, customers: 150, infrastructure: 15, brandAwareness: 30 },
        feedback: 'Predictable monthly revenue! You need to keep the content fresh to stop cancellations.'
      }
    ]
  },
  {
    id: 3,
    unit: 'Unit 3: Infrastructure',
    title: 'Platform Foundation',
    description: 'Traffic is growing. Your current setup is crashing. Where do you invest?',
    choices: [
      {
        id: 'saas',
        label: 'SaaS Platform',
        description: 'Move to Shopify/BigCommerce. Monthly fee, reliable, less customizable.',
        impact: { revenue: 2000, customers: 200, infrastructure: 25, brandAwareness: 10 },
        feedback: 'Stability is excellent. You launched new features quickly.'
      },
      {
        id: 'opensource',
        label: 'Custom Open Source',
        description: 'Magento/WooCommerce on own servers. High control, high maintenance.',
        impact: { revenue: 1000, customers: 100, infrastructure: 40, brandAwareness: 10 },
        feedback: 'You spent a lot on developers, but the site is perfectly tailored to your niche.'
      },
      {
        id: 'cloud',
        label: 'Cloud Native Headless',
        description: 'Separate front-end/back-end on AWS. Ultimate scale, extremely complex.',
        impact: { revenue: 0, customers: 0, infrastructure: 50, brandAwareness: 5 },
        feedback: 'It took months to build, effectively pausing growth, but now you can scale infinitely.'
      }
    ]
  },
  {
    id: 4,
    unit: 'Unit 3: Mobile Commerce',
    title: 'The Mobile Wave',
    description: '60% of your visitors are on mobile devices. Bounce rates are high.',
    choices: [
      {
        id: 'responsive',
        label: 'Responsive Redesign',
        description: 'Optimize current site for all screens. Cost effective.',
        impact: { revenue: 5000, customers: 500, infrastructure: 10, brandAwareness: 10 },
        feedback: 'Conversion rate improved across the board. A safe, solid choice.'
      },
      {
        id: 'nativeapp',
        label: 'Native App',
        description: 'Build iOS and Android apps. High engagement, high barrier to entry.',
        impact: { revenue: 3000, customers: 100, infrastructure: 30, brandAwareness: 40 },
        feedback: 'Few people downloaded it, but those who did spend 3x more than web users.'
      },
      {
        id: 'pwa',
        label: 'Progressive Web App',
        description: 'App-like experience in browser. Fast, modern, indexable.',
        impact: { revenue: 4500, customers: 400, infrastructure: 20, brandAwareness: 20 },
        feedback: 'Great performance boost and SEO benefits without the App Store friction.'
      }
    ]
  },
  {
    id: 5,
    unit: 'Unit 4: Marketing Strategy',
    title: 'Customer Acquisition',
    description: 'Organic growth is plateauing. You need a proactive strategy to bring in new customers.',
    choices: [
      {
        id: 'ads',
        label: 'Paid Advertising Blitz',
        description: 'Heavy investment in Google & Social Ads. Immediate traffic.',
        impact: { revenue: 6000, customers: 1000, infrastructure: 0, brandAwareness: 20 },
        feedback: 'Traffic spiked immediately! Customer Acquisition Cost is high, but revenue is flowing.'
      },
      {
        id: 'content',
        label: 'SEO & Content Marketing',
        description: 'Blog posts, videos, and organic search focus. Slow burn.',
        impact: { revenue: 2000, customers: 300, infrastructure: 0, brandAwareness: 40 },
        feedback: 'It is slow going, but you are building a loyal audience who trust your brand authority.'
      },
      {
        id: 'influencer',
        label: 'Influencer Partnerships',
        description: 'Pay creators to promote your products to their niche audiences.',
        impact: { revenue: 4500, customers: 600, infrastructure: 0, brandAwareness: 50 },
        feedback: 'One viral post did wonders for your brand image, though some traffic was low quality.'
      }
    ]
  },
  {
    id: 6,
    unit: 'Unit 5: Supply Chain Management',
    title: 'The Fulfillment Crunch',
    description: 'Orders are piling up. Your current shipping process is too slow and causing complaints.',
    choices: [
      {
        id: '3pl',
        label: 'Outsource to 3PL',
        description: 'Use a Third-Party Logistics provider. They handle storage and shipping.',
        impact: { revenue: 3000, customers: 400, infrastructure: 30, brandAwareness: 10 },
        feedback: 'Shipping is faster and you have less headache, but your margins took a hit.'
      },
      {
        id: 'warehouse',
        label: 'Lease Bigger Warehouse',
        description: 'Keep it in-house but scale up. High fixed cost, total control.',
        impact: { revenue: 2000, customers: 200, infrastructure: 40, brandAwareness: 20 },
        feedback: 'You have total control over the unboxing experience, but rent is expensive.'
      },
      {
        id: 'automation',
        label: 'Warehouse Automation',
        description: 'Invest in robots and software to optimize your current space.',
        impact: { revenue: 1000, customers: 100, infrastructure: 60, brandAwareness: 10 },
        feedback: 'Efficiency is through the roof. You are ready to handle double the volume.'
      }
    ]
  },
  {
    id: 7,
    unit: 'Unit 6: Global E-commerce',
    title: 'Crossing Borders',
    description: 'International visitors are trying to buy, but shipping and currency are barriers.',
    choices: [
      {
        id: 'crossborder',
        label: 'Direct Cross-Border',
        description: 'Ship from home, calculate duties at checkout. High shipping cost.',
        impact: { revenue: 3000, customers: 200, infrastructure: 10, brandAwareness: 30 },
        feedback: 'International sales are happening, but cart abandonment is high due to shipping fees.'
      },
      {
        id: 'local_fulfillment',
        label: 'Regional Fulfillment Centers',
        description: 'Stock inventory in key international markets (EU, Asia).',
        impact: { revenue: 5000, customers: 600, infrastructure: 40, brandAwareness: 40 },
        feedback: 'Delivery speeds globally rival local shops. You are becoming a global brand.'
      },
      {
        id: 'marketplaces_global',
        label: 'Global Marketplaces',
        description: 'Use Amazon Global Selling or Alibaba to reach locals.',
        impact: { revenue: 4000, customers: 300, infrastructure: 5, brandAwareness: 10 },
        feedback: 'Easy entry into new markets, but you are just another commodity on their platform.'
      }
    ]
  },
  {
    id: 8,
    unit: 'Scaling & Competition',
    title: 'Market Saturation',
    description: 'A global competitor just entered your niche with lower prices.',
    choices: [
      {
        id: 'price',
        label: 'Price War',
        description: 'Cut prices to match them. Protect market share, kill margins.',
        impact: { revenue: 8000, customers: 800, infrastructure: 0, brandAwareness: -10 },
        feedback: 'You kept the customers, but you are barely breaking even.'
      },
      {
        id: 'niche',
        label: 'Hyper-Niche Branding',
        description: 'Focus on premium quality and storytelling. Lose volume, gain value.',
        impact: { revenue: 4000, customers: -100, infrastructure: 10, brandAwareness: 40 },
        feedback: 'You lost bargain hunters, but your loyal fanbase loves the new premium direction.'
      },
      {
        id: 'loyalty',
        label: 'Loyalty Program',
        description: 'Invest in retention and rewards to keep existing users.',
        impact: { revenue: 5000, customers: 200, infrastructure: 20, brandAwareness: 20 },
        feedback: 'Repeat purchase rate skyrocketed. It is cheaper to keep customers than find new ones.'
      }
    ]
  },
  {
    id: 9,
    unit: 'Unit 7: Emerging Technologies',
    title: 'The AI Advantage',
    description: 'The market is shifting towards hyper-personalization using AI.',
    choices: [
      {
        id: 'personalization',
        label: 'AI Personalization Engine',
        description: 'Dynamic website content based on user behavior.',
        impact: { revenue: 6000, customers: 200, infrastructure: 20, brandAwareness: 10 },
        feedback: 'Conversion rates jumped significantly. Customers feel you "get" them.'
      },
      {
        id: 'chatbots',
        label: 'Smart Service Bots',
        description: '24/7 AI customer support to handle queries instantly.',
        impact: { revenue: 2000, customers: 100, infrastructure: 30, brandAwareness: -10 },
        feedback: 'Support costs are down, but some customers are frustrated by talking to robots.'
      },
      {
        id: 'predictive',
        label: 'Predictive Inventory AI',
        description: 'Forecast demand to optimize stock levels and cash flow.',
        impact: { revenue: 4000, customers: 0, infrastructure: 50, brandAwareness: 0 },
        feedback: 'Stockouts are a thing of the past. Your operational efficiency is elite.'
      }
    ]
  },
  {
    id: 10,
    unit: 'Security & Ethics',
    title: 'Data Breach Scare',
    description: 'A vulnerability was found in a plugin you use. No data lost yet.',
    choices: [
      {
        id: 'patch',
        label: 'Quiet Patch',
        description: 'Fix it quickly without announcing. Low cost, high risk if discovered.',
        impact: { revenue: 1000, customers: 0, infrastructure: 10, brandAwareness: 0 },
        feedback: 'Problem solved cheaply. Hope no one finds out you were vulnerable.'
      },
      {
        id: 'audit',
        label: 'Full Security Audit',
        description: 'Halt dev, audit everything, announce commitment to security.',
        impact: { revenue: -2000, customers: 100, infrastructure: 40, brandAwareness: 30 },
        feedback: 'Expensive downtime, but customers trust you more than ever.'
      },
      {
        id: 'cyber',
        label: 'Cyber Insurance & 3rd Party',
        description: 'Outsource payment processing completely to reduce scope.',
        impact: { revenue: -500, customers: 0, infrastructure: 20, brandAwareness: 10 },
        feedback: 'You reduced liability, but transaction fees are slightly higher now.'
      }
    ]
  }
];

export const ICONS = {
  Revenue: ShoppingBag,
  Customers: Users,
  Infra: Server,
  Brand: Globe,
  Mobile: Smartphone,
  Event: Zap,
  Winner: Award,
  Trend: TrendingUp
};
