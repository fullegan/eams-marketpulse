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
      
      **EBAY ADVERTISING NOMENCLATURE & REFERENCING:**
      Only recommend the following products if they are strategically relevant to the "${vertical}" vertical.
      - **Promoted Listings Priority (PLP)**
      - **Promoted Listings General (PLG)**
      - **Promoted Stores (PS)**
      - **Promoted Offsite (PO)**

      *Referencing Rules:* 1. Introduce the full name and abbreviation together ONLY ONCE (e.g., "Promoted Listings General (PLG)"). 
      2. After the first mention, use either the full name OR the abbreviation, but never both in parentheses.
      3. CRITICAL: Never use the term "halo" or "halo attribution" in relation to PLG. This terminology is deprecated. Focus on "Total Advertising Cost of Sale" (TACOS) and "ad rate caps" instead.

      **SECTION SPECIFIC INSTRUCTIONS:**
      - **Executive Summary:** Write this as a professional, compelling narrative. Do NOT use administrative headers like "Date:", "To:", "From:", or "Subject:". Synthesize market opportunities and macro-economic factors immediately.
      - **Demand Lists:** Provide extensive bulleted lists for "Expected to increase in demand" and "Expected to drop in demand". Aim for at least 8 specific items for Increase and 6 for Decrease. Provide strategic context for each item.
      - **Key Takeaways & Actionable Advice:** This section must be SUBSTANTIAL and expert-level. Provide concrete strategic tasks. Every takeaway MUST link a specific vertical trend to the optimal use of eBay ad products (PLP, PLG, PS, or PO). For example, explain when to switch from PLG to PLP for peak demand, or how to use PS to build brand loyalty during high-traffic periods.

      **GROUNDING & SOURCES REQUIREMENT:**
      - Use Google Search to find current pricing, volume trends, and competitor activity.
      - You MUST include enough verified information that grounding chunks are generated. The report is incomplete without a list of sources.

      **STRICT OUTPUT FORMAT RULES:**
      1. Start IMMEDIATELY with the first section header (Markdown H2 / ##).
      2. Use Markdown H2 (##) for Main Sections.
      3. Use Markdown H3 (###) for the Increase/Decrease demand lists specifically.
      4. For the Key Takeaways section, use numbered lists or bold paragraph headers to ensure it is substantial and easy to read.

      The report structure:
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

    // Updated to use the correct Vite environment variable syntax
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        // Updated 'thinkingLevel' for Gemini 3 compatibility to resolve TS2353
        thinkingConfig: { 
          thinkingLevel: 'high',
          includeThoughts: true 
        }
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