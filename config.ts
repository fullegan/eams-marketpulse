import type { MarketConfig } from './types';

export const MARKETS: MarketConfig[] = [
  { name: 'UK', code: 'UK', platformName: 'the eBay.co.uk platform', language: 'English' },
  { name: 'USA', code: 'US', platformName: 'the eBay.com platform', language: 'English' },
  { name: 'Germany', code: 'DE', platformName: 'the eBay.de platform', language: 'German' },
  { name: 'France', code: 'FR', platformName: 'the eBay.fr platform', language: 'French' },
  { name: 'Italy', code: 'IT', platformName: 'the eBay.it platform', language: 'Italian' },
  { name: 'Australia', code: 'AU', platformName: 'the eBay.com.au platform', language: 'English' },
  { name: 'Canada (English)', code: 'CA', platformName: 'the eBay.ca platform', language: 'English' },
  { name: 'Canada (French)', code: 'CA-FR', platformName: 'the eBay.ca (French) platform', language: 'French' },
  { name: 'Spain', code: 'ES', platformName: 'the eBay.es platform', language: 'Spanish' },
  { name: 'Netherlands', code: 'NL', platformName: 'the eBay.nl platform', language: 'Dutch' },
  { name: 'Austria', code: 'AT', platformName: 'the eBay.at platform', language: 'German' },
  { name: 'Ireland', code: 'IE', platformName: 'the eBay.ie platform', language: 'English' },
  { name: 'Poland', code: 'PL', platformName: 'the eBay.pl platform', language: 'Polish' },
  { name: 'Switzerland', code: 'CH', platformName: 'the eBay.ch platform', language: 'German' },
  { name: 'Belgium (Dutch)', code: 'BE-NL', platformName: 'the benl.ebay.be platform', language: 'Dutch' },
  { name: 'Belgium (French)', code: 'BE-FR', platformName: 'the befr.ebay.be platform', language: 'French' },
  { name: 'Hong Kong', code: 'HK', platformName: 'the eBay.com.hk platform', language: 'English' },
  { name: 'Malaysia', code: 'MY', platformName: 'the eBay.com.my platform', language: 'English' },
  { name: 'Philippines', code: 'PH', platformName: 'the eBay.ph platform', language: 'English' },
  { name: 'Singapore', code: 'SG', platformName: 'the eBay.com.sg platform', language: 'English' },
];

const getEnvMarketCode = (): MarketConfig['code'] => {
  try {
    // Check both process.env (injected by Vite define) and standard Vite import.meta.env
    const code = (process.env as any).VITE_MARKET_CODE || (import.meta as any).env?.VITE_MARKET_CODE;
    return (code as MarketConfig['code']) || 'UK';
  } catch (e) {
    return 'UK';
  }
};

export const CURRENT_MARKET_CODE: MarketConfig['code'] = getEnvMarketCode();

export const getCurrentMarket = (): MarketConfig => {
  const market = MARKETS.find(m => m.code === CURRENT_MARKET_CODE);
  return market || MARKETS.find(m => m.code === 'UK')!;
};