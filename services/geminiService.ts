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

export const fetchVerticalInsights = async (
  vertical: string,
  forceEnglish: boolean = false
): Promise<{ text: string; sources: GroundingChunk[] }> => {
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

    // --- DYNAMIC SEASONAL CONTEXT GENERATION ---
    // We inject specific trend hooks based on the relevant quarters to enrich the report.
    let seasonalContext = "";

    // Insights specific to Q4 (October - December)
    if (currentQuarter === 4 || nextQuarter === 4) {
      seasonalContext += `
      - **Potential Q4 Trend Drivers:** "Doorscaping" (front door decor), "Celestial Motifs", or vertical-specific gifting trends.
      - **Potential Q4 Reseller/BOLO Alerts:** High-value vintage/collectible items specific to this vertical (e.g., Antique German Kugel glass for Home, or specific retro electronics for Tech).
      `;
    }

    // Insights specific to Q1 (January - March)
    if (currentQuarter === 1 || nextQuarter === 1) {
      seasonalContext += `
      - **Potential Q1 Cost Hook:** Rising professional service costs (Renovation/Repair) driving DIY/Self-Repair product sales.
      - **Potential Q1 Design Trends:** "Retro Revival" - specifically Y2K and retro-inspired designs.
      `;
    }

    const prompt = `
      Act as a senior e-commerce strategy consultant for eBay's ${market.name} market.
      Provide a high-level, professional strategic report for sellers in the "${vertical}" vertical.
      The report must be written in ${targetLanguage}.
      
      Your goal is to help sellers plan their **Inventory (Stock Levels)** and **Promoted Listings (Ad Spend)**.

      **UNIVERSAL E-COMMERCE DRIVERS (Apply these ONLY where relevant to ${vertical}):**
      1. **Mobile-First:** ~70% of category visits are likely on mobile. Emphasize that listings and images must be optimized for small screens.
      2. **Visualisation:** Buyers increasingly value Augmented Reality (AR) and video for high-ticket items. Advise on using video in listings.
      3. **Consumer Psychology:** Emphasize "Pre-owned," "Refurbished," and "Sustainability" as key conversion drivers (78% of consumers value this).
      4. **Financial Context:** Use the local currency of the ${market.name} market for all valuations.
      ${seasonalContext}

      **STRICT OUTPUT FORMAT RULES:**
      1. **Do NOT add a document title** (e.g., "Strategic Report for...").
      2. **Do NOT add an introduction text.**
      3. **Start IMMEDIATELY with the first section header (Markdown H2 / ##).**
      4. **Use Markdown H2 (##) for all Main Section Headers.**
      5. **Do NOT use H1 (#) anywhere.**
      6. **IMPORTANT: If a specific seasonal trend driver mentioned above (e.g., "Doorscaping" or "Celestial Motifs") is NOT relevant to the "${vertical}" vertical, IGNORE IT COMPLETELY. Do not mention that it is irrelevant.**

      The report must follow this exact Markdown structure:

      ## ${t.sectionExecutiveSummary}
      (A concise, executive-level overview of the vertical's health and immediate opportunities.)

      ## ${t.sectionMarketHealth}
      (Analysis of growth areas vs. declining segments. **Specific Requirement:** Include specific financial market valuation projections (e.g., "Market valued at [Local Currency] X bn") if data is available in the search grounding.)

      ## ${t.sectionCurrentQuarter} (Q${currentQuarter} ${currentYear})
      (STRATEGIC INVENTORY ACTION: Analyze the remaining weeks of this quarter. **Do NOT list keywords here.** Instead, explicitly categorize product sub-categories using exactly these phrases:
      1. **Expected to increase in demand**: Items with rising demand.
      2. **Expected to decrease in demand**: Items where demand is fading.
      Explain the drivers: weather, holidays, or economic shifts.)

      ## ${t.sectionLookAhead} Q${nextQuarter} ${nextQuarterYear}
      (FUTURE PLANNING: **Do NOT list keywords here.** Focus on Long-lead ordering. What inventory should sellers order NOW to be ready for next quarter? Focus on early seasonal shifts and macro-trends. Identify the 'Early Bird' opportunities.)

      ## ${t.sectionBuyerInfluencers}
      (What drives conversion in this category right now? e.g., Speed, Price, Eco-friendly, Bundles. Incorporate the Mobile-First and Visualisation insights here.)

      ## ${t.sectionKeyTakeaways}
      (3-5 bullet points of concrete actions the seller should take immediately. Include a point on Sustainability/Consumer Psychology.)

      ## ${t.sectionKeywords}
      (STRICT FORMAT: Provide a clean list of 10-15 high-volume search terms. Do NOT add commentary, sub-sections, or analysis here. Just the terms.)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
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