
import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk } from '../types';
import { getCurrentQuarterInfo } from '../utils';
import { getCurrentMarket } from '../config';
import { getTranslations } from '../constants';

// Use standard Vite environment variable access.
// Note: This value is injected by vite.config.ts during build via the 'define' property.
const apiKey = import.meta.env.VITE_API_KEY;

// Debugging: Log status to console (never log the actual key)
if (!apiKey) {
  console.error("CRITICAL: API Key is missing (Empty String). The app will not function.");
} else {
  console.log("System: API Key is present and configured.");
}

// We only need a single instance of the AI client.
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const fetchVerticalInsights = async (vertical: string, forceEnglish: boolean = false): Promise<{ text: string, sources: GroundingChunk[] }> => {
  try {
    // Fail fast if no key is present to avoid unnecessary network calls
    if (!apiKey) {
      throw new Error("API Key is missing (VITE_API_KEY is empty). Please check Vercel Environment Variables.");
    }

    const { currentQuarter, nextQuarter, currentYear, nextQuarterYear } = getCurrentQuarterInfo();
    const market = getCurrentMarket();
    
    // Logic: If forced to English, we use the 'UK' translations (which are English) for the headers
    // and explicitly tell the AI to write in English.
    const t = forceEnglish ? getTranslations('UK') : getTranslations(market.code);
    const targetLanguage = forceEnglish ? 'English' : market.language;
    
    console.log(`Fetching insights for: ${vertical} (${market.code}). Language: ${targetLanguage}...`);

    const prompt = `
      Act as a senior e-commerce strategy consultant for eBay's ${market.name} market. 
      Provide a high-level, professional strategic report for sellers in the "${vertical}" vertical.
      The report must be written in ${targetLanguage}.
      
      Your goal is to help sellers plan their **Inventory (Stock Levels)** and **Promoted Listings (Ad Spend)**.

      The report must follow this exact Markdown structure:

      ## ${t.sectionExecutiveSummary}
      (A concise, executive-level overview of the vertical's health and immediate opportunities.)

      ## ${t.sectionMarketHealth}
      (Analysis of growth areas vs. declining segments. Be specific about consumer shifts.)

      ## ${t.sectionSeasonalDemand} & Inventory Strategy
      (Identify key seasonal peaks. **Crucial:** Explicitly list items to "Stock Up / Increase Spend" and items to "Clearance / Reduce Spend" based on upcoming trends.)

      ## ${t.sectionBuyerInfluencers}
      (What drives conversion in this category right now? e.g., Speed, Price, Eco-friendly, Bundles.)

      ## ${t.sectionKeyTakeaways}
      (3-5 bullet points of concrete actions the seller should take immediately.)

      ## ${t.sectionKeywords}
      (A list of the top 10-15 high-volume search terms. Format this as a clean list.)

      ### ${t.sectionCurrentQuarter} (Q${currentQuarter} ${currentYear})
      (Immediate focus areas for the current weeks.)

      ### ${t.sectionLookAhead} Q${nextQuarter} ${nextQuarterYear}
      (Forecast for the next quarter to help with long-term stock ordering.)
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
