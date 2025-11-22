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

// --- DYNAMIC MARKET CONFIGURATION ---
// We check if an Environment Variable is set (e.g., in Vercel).
// If not found, we default to 'UK' for local development.
const envCode = import.meta.env.VITE_MARKET_CODE;
export const CURRENT_MARKET_CODE: MarketConfig['code'] = (envCode as MarketConfig['code']) || 'UK';
// ------------------------------------

export const getCurrentMarket = (): MarketConfig => {
  const market = MARKETS.find(m => m.code === CURRENT_MARKET_CODE);
  if (!market) {
    // Fallback to UK if an invalid code was provided in the environment
    console.warn(`Market configuration for code "${CURRENT_MARKET_CODE}" not found. Falling back to UK.`);
    return MARKETS.find(m => m.code === 'UK')!;
  }
  return market;
};