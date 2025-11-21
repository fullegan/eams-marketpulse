import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk } from '../types';
import { getCurrentQuarterInfo } from '../utils';
import { getCurrentMarket } from '../config';

// Use standard Vite environment variable access.
// Note: This value is injected by vite.config.ts during build.
const apiKey = import.meta.env.VITE_API_KEY;

// Debugging: Log status to console (never log the actual key)
if (!apiKey) {
  console.error("CRITICAL: API Key is missing. The app will not function.");
} else {
  console.log("System: API Key is present and configured.");
}

// We only need a single instance of the AI client.
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const fetchVerticalInsights = async (vertical: string): Promise<{ text: string, sources: GroundingChunk[] }> => {
  try {
    // Fail fast if no key is present to avoid unnecessary network calls
    if (!apiKey) {
      throw new Error("API Key is missing (VITE_API_KEY is empty).");
    }

    const { currentQuarter, nextQuarter, currentYear, nextQuarterYear } = getCurrentQuarterInfo();
    const market = getCurrentMarket();
    
    console.log(`Fetching insights for: ${vertical} (${market.code})...`);

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
    
    console.log("Insights successfully retrieved.");
    return { text, sources };
  } catch (error: any) {
    console.error("Error fetching insights from Gemini API:", error);
    
    let errorMessage = `Failed to retrieve insights for ${vertical}.`;
    const errorString = error.toString().toLowerCase() + (error.message || '').toLowerCase();
    
    if (!apiKey) {
      errorMessage += " Reason: API Key is missing. Please check Vercel Environment Variables.";
    } else if (errorString.includes('api has not been used') || errorString.includes('is disabled')) {
      errorMessage += " Reason: The Generative AI API is disabled for this Google Cloud Project. Please enable it in the Google Cloud Console.";
    } else if (errorString.includes('403') || errorString.includes('permission_denied')) {
      errorMessage += " Reason: Invalid API Key or permissions denied (403).";
    } else if (errorString.includes('401')) {
      errorMessage += " Reason: Invalid API Key (401).";
    } else if (errorString.includes('failed to fetch')) {
      errorMessage += " Reason: Network error. Check firewall or connection.";
    } else {
      errorMessage += " Please check your API key and network connection.";
    }

    throw new Error(errorMessage);
  }
};