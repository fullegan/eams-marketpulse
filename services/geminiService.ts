
import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk } from '../types';
import { getCurrentQuarterInfo } from '../utils';
import { getCurrentMarket } from '../config';
import { getTranslations } from '../constants';

export const fetchVerticalInsights = async (vertical: string, forceEnglish: boolean = false): Promise<{ text: string, sources: GroundingChunk[] }> => {
  try {
    const { currentQuarter, nextQuarter, currentYear, nextQuarterYear } = getCurrentQuarterInfo();
    const market = getCurrentMarket();
   
    const t = forceEnglish ? getTranslations('UK') : getTranslations(market.code);
    const targetLanguage = forceEnglish ? 'English' : market.language;
   
    console.log(`Fetching insights for: ${vertical} (${market.code}). Language: ${targetLanguage}...`);

    const prompt = `
      Act as a senior e-commerce strategy consultant for eBay's ${market.name} market.
      Provide a high-level, professional strategic report for sellers in the "${vertical}" vertical.
      The report must be written in ${targetLanguage}.
     
      **STRICT PROHIBITION - DO NOT INCLUDE:**
      - NO administrative headers like "To:", "From:", "Date:", or "Subject:".
      - NO professional email preambles or correspondence placeholders.
      - Start IMMEDIATELY with the narrative Executive Summary header (##).
      - NEVER reference a "January 13, 2026 update", "last year's update", or any specific fabricated timeline for "advertising suite changes". 
      - DO NOT invent historical or future technical overhaul events. Focus ONLY on existing, established product features.

      **EBAY ADVERTISING NOMENCLATURE:**
      Recommend these ONLY if relevant: **Promoted Listings Priority (PLP)**, **Promoted Listings General (PLG)**, **Promoted Stores (PS)**, **Promoted Offsite (PO)**.
      Rule: Introduce full name and abbreviation ONCE (e.g., "Promoted Listings General (PLG)"), then use one or the other. NEVER use "halo" in relation to PLG. Focus on TACOS and ad rate caps. 
      Focus on strategic implementation of these products as they currently exist.

      **SECTION SPECIFIC INSTRUCTIONS:**
      - **Executive Summary:** A compelling, professional narrative synthesis of market opportunities.
      - **Demand Lists:** Use "${t.subHeadingIncrease}" and "${t.subHeadingDecrease}" as headers. Provide substantial lists (8+ increase, 6+ decrease) as Markdown bullet points.
      - **Consumer Buying Triggers (Buyer Influencers):** Provide 4-6 distinct factors driving purchase decisions. 
        MANDATORY FORMATTING: 
        1. Each factor MUST be a separate item in a Markdown numbered list (1., 2., 3.).
        2. You MUST put a BLANK LINE between every numbered item. 
        3. Never put two numbered items on the same line or in the same paragraph.
      - **Key Takeaways:** Substantial, expert-level advice linking trends to eBay ad products using a bulleted list.
      - **Keywords Section:** A detailed Markdown TABLE with columns: Category, Primary Keywords, Secondary/Trending Keywords.

      **GROUNDING & SOURCES:**
      Use Google Search for current data. Ensure grounding chunks are generated.

      **FORMAT:**
      1. Start with ## ${t.sectionExecutiveSummary}.
      2. Use ## for main sections, ### for sub-sections.
      3. Use standard Markdown | table | format for the Keywords section.

      Structure:
      ## ${t.sectionExecutiveSummary}
      ## ${t.sectionMarketHealth}
      ## ${t.sectionCurrentQuarter} (Q${currentQuarter} ${currentYear})
         ### ${t.subHeadingIncrease}
         ### ${t.subHeadingDecrease}
      ## ${t.sectionLookAhead} Q${nextQuarter} ${nextQuarterYear}
         ### ${t.subHeadingIncrease}
         ### ${t.subHeadingDecrease}
      ## ${t.sectionBuyerInfluencers}
      ## ${t.sectionKeyTakeaways}
      ## ${t.sectionKeywords}
    `;

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
   
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const text = response.text || "No content generated.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: GroundingChunk[] = [];
    if (groundingChunks) {
      for (const chunk of groundingChunks) {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            web: {
              uri: chunk.web.uri,
              title: chunk.web.title || chunk.web.uri
            }
          });
        }
      }
    }
   
    return { text, sources };
  } catch (error: any) {
    console.error("Error fetching insights:", error);
    throw new Error(`Failed to retrieve insights for ${vertical}.`);
  }
};
