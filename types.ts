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