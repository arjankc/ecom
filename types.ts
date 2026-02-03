export interface Team {
  id: number;
  name: string;
  color: string;
  metrics: {
    revenue: number;
    customers: number;
    infrastructure: number; // 0-100 score
    brandAwareness: number; // 0-100 score
  };
  badges: string[];
  history: string[]; // Log of decisions
}

export interface Choice {
  id: string;
  label: string;
  description: string;
  impact: {
    revenue: number;
    customers: number;
    infrastructure: number;
    brandAwareness: number;
  };
  feedback: string;
}

export interface Scenario {
  id: number;
  title: string;
  unit: string; // e.g., "Unit 1: Intro"
  description: string;
  choices: Choice[];
}

export interface MarketEvent {
  title: string;
  description: string;
  impactType: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

export enum GamePhase {
  SETUP = 'SETUP',
  SCENARIO_INTRO = 'SCENARIO_INTRO',
  TEAM_TURN = 'TEAM_TURN',
  ROUND_SUMMARY = 'ROUND_SUMMARY',
  GAME_OVER = 'GAME_OVER'
}
