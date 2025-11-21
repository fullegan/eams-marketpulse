
import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk } from '../types';
import { getCurrentQuarterInfo } from '../utils';
import { getCurrentMarket } from '../config';

// We only need a single instance of the AI client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const fetchVerticalInsights = async (vertical: string): Promise<{ text: string, sources: GroundingChunk[] }> => {
  try {
    const { currentQuarter, nextQuarter, currentYear, nextQuarterYear } = getCurrentQuarterInfo();
    const market = getCurrentMarket();
    
    const prompt = `
      As an expert e-commerce analyst for the ${market.name} market, provide a detailed and professionally formatted report for sellers on the ${market.platformName} for the "${vertical}" vertical. The report must be written in ${market.language}.

      The report must follow this exact Markdown structure:

      ## Executive Summary
      (A brief, high-level overview of the vertical's current state and key opportunities.)

      ## Current Market Health & Trends
      (Detailed analysis of the vertical's health, growth areas, declining segments, and recent consumer trends.)

      ## Seasonal Demand Variations
      (Identify key seasonal peaks and troughs. Provide actionable advice for sellers.)

      ## Key Buyer Influencers
      (Analysis of the most important purchasing factors for customers, e.g., price, brand, quality, shipping.)

      ## Key Takeaways & Actionable Advice
      (A bulleted list of concrete, actionable recommendations for stocking, pricing, and promotional strategies.)

      ## Top Keywords for eBay Listings
      (A bulleted list of the top 10-15 relevant keywords that sellers should include in their eBay listings to improve visibility.)

      ### Current Quarter (Q${currentQuarter} ${currentYear})
      (Comment on specific items expected to surge or decline in demand *right now*.)

      ### Look Ahead to Q${nextQuarter} ${nextQuarterYear}
      (Provide a forecast and preparation advice for the upcoming quarter.)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const text = response.text || "No content generated.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Clean and map the sources to ensure they match the strict GroundingChunk type.
    const sources: GroundingChunk[] = [];

    if (groundingChunks) {
      for (const chunk of groundingChunks) {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            web: {
              uri: chunk.web.uri,
              title: chunk.web.title || chunk.web.uri // Ensure title is a string
            }
          });
        }
      }
    }

    return { text, sources };
  } catch (error) {
    console.error("Error fetching insights from Gemini API:", error);
    throw new Error(`Failed to retrieve insights for ${vertical}. Please check your API key and network connection.`);
  }
};