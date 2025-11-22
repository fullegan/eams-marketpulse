import type { UiTranslations, MarketConfig } from './types';

// The Master List of Verticals (English) - kept for reference or fallback
const MASTER_VERTICALS_EN: string[] = [
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
  "Media",
];

// Translations for German (DE)
const TRANSLATIONS_DE: UiTranslations = {
  welcomeTitle: "Willkommen bei eAMS Marketpulse",
  welcomeIntro: "Dieses Tool bietet Echtzeit-Marktanalysen und strategische Einblicke für eBay-Verticals.",
  welcomeInstruction: "Bitte wählen Sie links eine Kategorie aus, um zu beginnen.",
  loadingMessage: "Lade aktuelle Einblicke für",
  errorMessage: "Ein Fehler ist aufgetreten",
  reportTitleSuffix: "Marktbericht",
  lastUpdated: "Zuletzt aktualisiert",
  copyButton: "Bericht kopieren",
  copiedButton: "Kopiert!",
  updateButton: "Bericht aktualisieren",
  sourcesTitle: "Quellen",
  footerText: "Bereitgestellt von",
  verticals: [
    "Teile & Zubehör",
    "Haus & Garten",
    "Lifestyle",
    "Business & Industrie",
    "Elektronik",
    "Mode",
    "Spielzeug & Spiele",
    "Health & Beauty",
    "Sport",
    "Sammeln & Seltenes",
    "Medien"
  ]
};

// Translations for French (FR)
const TRANSLATIONS_FR: UiTranslations = {
  welcomeTitle: "Bienvenue sur eAMS Marketpulse",
  welcomeIntro: "Cet outil fournit une analyse de marché en temps réel et des informations exploitables pour les catégories eBay.",
  welcomeInstruction: "Pour commencer, veuillez sélectionner une catégorie dans le menu de gauche.",
  loadingMessage: "Chargement des analyses pour",
  errorMessage: "Une erreur est survenue",
  reportTitleSuffix: "Rapport de Marché",
  lastUpdated: "Dernière mise à jour",
  copyButton: "Copier le rapport",
  copiedButton: "Copié !",
  updateButton: "Mettre à jour",
  sourcesTitle: "Sources",
  footerText: "Propulsé par",
  verticals: [
    "Pièces & Accessoires",
    "Maison & Jardin",
    "Art de vivre",
    "PME, Artisans & Agriculteurs",
    "High-Tech",
    "Mode",
    "Jeux & Jouets",
    "Beauté, Bien-être & Parfums",
    "Sports & Vacances",
    "Collections",
    "Médias"
  ]
};

// Translations for Italian (IT)
const TRANSLATIONS_IT: UiTranslations = {
  welcomeTitle: "Benvenuto in eAMS Marketpulse",
  welcomeIntro: "Questo strumento fornisce analisi di mercato in tempo reale e approfondimenti strategici per le categorie eBay.",
  welcomeInstruction: "Per iniziare, seleziona una categoria dal menu a sinistra.",
  loadingMessage: "Caricamento approfondimenti per",
  errorMessage: "Si è verificato un errore",
  reportTitleSuffix: "Rapporto di Mercato",
  lastUpdated: "Ultimo aggiornamento",
  copyButton: "Copia rapporto",
  copiedButton: "Copiato!",
  updateButton: "Aggiorna rapporto",
  sourcesTitle: "Fonti",
  footerText: "Offerto da",
  verticals: [
    "Ricambi e Accessori",
    "Casa e Giardino",
    "Lifestyle",
    "Commercio, Ufficio e Industria",
    "Elettronica",
    "Moda",
    "Giocattoli e Modellismo",
    "Bellezza e Salute",
    "Sport e Viaggi",
    "Collezionismo",
    "Film e DVD"
  ]
};

// Default English (UK, US, AU)
const TRANSLATIONS_EN: UiTranslations = {
  welcomeTitle: "Welcome to eAMS Marketpulse",
  welcomeIntro: "This tool provides real-time market analysis and actionable insights for eBay verticals.",
  welcomeInstruction: "To get started, please select a vertical from the menu on the left.",
  loadingMessage: "Fetching latest insights for",
  errorMessage: "An Error Occurred",
  reportTitleSuffix: "Market Report",
  lastUpdated: "Last updated",
  copyButton: "Copy Report",
  copiedButton: "Copied!",
  updateButton: "Update Report",
  sourcesTitle: "Sources",
  footerText: "Powered by",
  verticals: MASTER_VERTICALS_EN
};

// Helper to get the correct translation set
export const getTranslations = (code: MarketConfig['code']): UiTranslations => {
  switch (code) {
    case 'DE': return TRANSLATIONS_DE;
    case 'FR': return TRANSLATIONS_FR;
    case 'IT': return TRANSLATIONS_IT;
    case 'UK':
    case 'US':
    case 'AU':
    default:
      return TRANSLATIONS_EN;
  }
};
