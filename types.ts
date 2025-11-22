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
  code: 'UK' | 'US' | 'DE' | 'AU' | 'FR' | 'IT';
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
  sourcesTitle: string;
  footerText: string;
  verticals: string[]; // The list of categories in the local language
}
