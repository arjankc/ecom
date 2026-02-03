import { GoogleGenAI } from "@google/genai";
import { Team, Scenario, Choice } from '../types';

let aiClient: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const generateMarketAnalysis = async (
  teams: Team[],
  scenario: Scenario,
  round: number
): Promise<string> => {
  if (!aiClient) {
    return "Market Analysis unavailable (Check API Key). General trend: The market is reacting to recent infrastructure investments.";
  }

  const teamSummaries = teams.map(t => 
    `${t.name}: Rev $${t.metrics.revenue}, Cust ${t.metrics.customers}, Infra ${t.metrics.infrastructure}, Brand ${t.metrics.brandAwareness}. Last Action: ${t.history[t.history.length - 1] || 'None'}`
  ).join('\n');

  const prompt = `
    You are an E-commerce business analyst for a simulation game.
    Round: ${round}
    Scenario Context: ${scenario.title} - ${scenario.description}
    
    Team Data:
    ${teamSummaries}
    
    Provide a witty, 2-sentence commentary on the market state. Mention one team doing well and one risk factor for the group. 
    Keep it under 40 words.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Market is volatile.";
  } catch (error) {
    console.error("Gemini API Error", error);
    return "Analysts are crunching the numbers. Competition is heating up!";
  }
};
