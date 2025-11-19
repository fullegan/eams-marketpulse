import type { MarketConfig } from './types';

export const MARKETS: MarketConfig[] = [
  { 
    name: 'the United Kingdom', 
    code: 'UK', 
    platformName: 'the eBay UK platform',
    language: 'English',
  },
  { 
    name: 'the United States', 
    code: 'US', 
    platformName: 'the eBay.com platform',
    language: 'English',
  },
  { 
    name: 'Germany', 
    code: 'DE', 
    platformName: 'the eBay.de platform',
    language: 'German',
  },
  { 
    name: 'Australia', 
    code: 'AU', 
    platformName: 'the eBay.com.au platform',
    language: 'English',
  },
  { 
    name: 'France', 
    code: 'FR', 
    platformName: 'the eBay.fr platform',
    language: 'French',
  },
  { 
    name: 'Italy', 
    code: 'IT', 
    platformName: 'the eBay.it platform',
    language: 'Italian',
  },
];

// --- TO CREATE A NEW COUNTRY VERSION, CHANGE THIS CODE ---
export const CURRENT_MARKET_CODE: MarketConfig['code'] = 'UK';
// ---------------------------------------------------------

export const getCurrentMarket = (): MarketConfig => {
  const market = MARKETS.find(m => m.code === CURRENT_MARKET_CODE);
  if (!market) {
    throw new Error(`Market configuration for code "${CURRENT_MARKET_CODE}" not found.`);
  }
  return market;
};