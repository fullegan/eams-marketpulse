
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface ApiResult {
  text: string;
  sources: GroundingChunk[];
  lastUpdated: Date;
}

export interface MarketConfig {
  name: string;
  // Expanded list of supported market codes
  code: 'UK' | 'US' | 'DE' | 'AU' | 'FR' | 'IT' | 'ES' | 'NL' | 'CA' | 'CA-FR' | 'IE' | 'AT' | 'PL' | 'CH' | 'BE-NL' | 'BE-FR' | 'HK' | 'MY' | 'PH' | 'SG';
  platformName: string;
  language: string;
}

export interface UiTranslations {
  welcomeTitle: string;
  welcomeIntro: string;
  welcomeInstruction: string;
  loadingMessage: string;
  errorMessage: string;
  reportTitleSuffix: string;
  lastUpdated: string;
  copyButton: string;
  copiedButton: string;
  updateButton: string;
  downloadButton: string;
  sourcesTitle: string;
  footerText: string;
  verticals: string[]; // The list of categories in the local language

  // Report Section Headings
  sectionExecutiveSummary: string;
  sectionMarketHealth: string;
  sectionBuyerInfluencers: string;
  sectionKeyTakeaways: string;
  sectionKeywords: string;
  sectionCurrentQuarter: string;
  sectionLookAhead: string;

  // Report Sub-Headings (Demand)
  subHeadingIncrease: string;
  subHeadingDecrease: string;
}
