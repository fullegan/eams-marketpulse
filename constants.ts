import type { UiTranslations, MarketConfig, CategoryGroup } from './types';

// Moved to top-level constant for absolute reliability
export const VERTICAL_GROUPS: CategoryGroup[] = [
  {
    segment: "Verticals",
    categories: [
      "Parts & Accessories",
      "Home & Garden",
      "Lifestyle",
      "Business, Office & Industrial",
      "Electronics",
      "Fashion",
      "Toys & Games",
      "Health & Beauty",
      "Sporting Goods",
      "Collectables",
      "Media"
    ]
  }
];

export const getTranslations = (code: MarketConfig['code']): UiTranslations => {
  const isDE = code === 'DE' || code === 'AT' || code === 'CH';
  const lang = isDE ? 'DE' : 'EN';

  return {
    reportTitleSuffix: "Marketpulse Intelligence Report",
    footerText: "Powered by",
    lastUpdated: "Last updated",
    copyButton: "Copy Insights",
    copiedButton: "Copied!",
    updateButton: "Refresh Data",
    downloadButton: "Export PDF",
    sourcesTitle: "Data Sources",
    welcomeTitle: "Welcome to eAMS Marketpulse",
    welcomeIntro: "This tool provides real-time market analysis and actionable insights for eBay verticals.",
    welcomeInstruction: "To get started, please select a vertical from the menu on the left.",
    loadingMessage: "Analyzing market data for",
    errorMessage: "System Error",
    groups: VERTICAL_GROUPS, // Direct reference to the constant
    sectionExecutiveSummary: "Market Overview",
    sectionMarketHealth: "Category Dynamics",
    sectionBuyerInfluencers: "Consumer Buying Triggers",
    sectionKeyTakeaways: "Advertising & Inventory Strategy",
    sectionKeywords: "High-Volume Keywords",
    sectionCurrentQuarter: "Current Trends",
    sectionLookAhead: "Seasonal Outlook",
    subHeadingIncrease: "Rising Demand Opportunities",
    subHeadingDecrease: "Declining Interest Areas"
  };
};