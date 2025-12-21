
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
  downloadButton: "PDF herunterladen",
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
  ],
  // Report Headings
  sectionExecutiveSummary: "Management Summary",
  sectionMarketHealth: "Aktuelle Marktlage & Trends",
  sectionBuyerInfluencers: "Wichtige Einflussfaktoren für Käufer",
  sectionKeyTakeaways: "Wichtige Erkenntnisse & Handlungsempfehlungen",
  sectionKeywords: "Top-Keywords für eBay-Angebote",
  sectionCurrentQuarter: "Aktuelles Quartal",
  sectionLookAhead: "Ausblick auf",
  // Sub-Headings
  subHeadingIncrease: "Erwarteter Anstieg der Nachfrage",
  subHeadingDecrease: "Erwarteter Rückgang der Nachfrage"
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
  downloadButton: "Télécharger PDF",
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
  ],
  // Report Headings
  sectionExecutiveSummary: "Synthèse",
  sectionMarketHealth: "Santé Actuelle du Marché & Tendances",
  sectionBuyerInfluencers: "Facteurs Clés d'Influence des Acheteurs",
  sectionKeyTakeaways: "Points Clés & Conseils Pratiques",
  sectionKeywords: "Mots-clés Principaux pour les Annonces eBay",
  sectionCurrentQuarter: "Trimestre Actuel",
  sectionLookAhead: "Perspectives pour",
  // Sub-Headings
  subHeadingIncrease: "Hausse de la demande prévue",
  subHeadingDecrease: "Baisse de la demande prévue"
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
  downloadButton: "Scarica PDF",
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
  ],
  // Report Headings
  sectionExecutiveSummary: "Sintesi",
  sectionMarketHealth: "Salute Attuale del Mercato e Tendenze",
  sectionBuyerInfluencers: "Fattori Chiave di Influenza sugli Acquirenti",
  sectionKeyTakeaways: "Punti Chiave e Consigli Pratici",
  sectionKeywords: "Parole Chiave Principali per le Inserzioni eBay",
  sectionCurrentQuarter: "Trimestre Attuale",
  sectionLookAhead: "Prospettive per",
  // Sub-Headings
  subHeadingIncrease: "Aumento della domanda previsto",
  subHeadingDecrease: "Calo della domanda previsto"
};

// Translations for Spanish (ES)
const TRANSLATIONS_ES: UiTranslations = {
  welcomeTitle: "Bienvenido a eAMS Marketpulse",
  welcomeIntro: "Esta herramienta proporciona análisis de mercado en tiempo real e información estratégica para las categorías de eBay.",
  welcomeInstruction: "Para comenzar, seleccione una categoría en el menú de la izquierda.",
  loadingMessage: "Cargando información para",
  errorMessage: "Ocurrió un error",
  reportTitleSuffix: "Informe de Mercado",
  lastUpdated: "Última actualización",
  copyButton: "Copiar informe",
  copiedButton: "¡Copiado!",
  updateButton: "Actualizar informe",
  downloadButton: "Descargar PDF",
  sourcesTitle: "Fuentes",
  footerText: "Impulsado por",
  verticals: [
    "Motor: piezas y accesorios",
    "Casa y Jardín",
    "Estilo de vida",
    "Equipamiento y maquinaria",
    "Electrónica",
    "Moda",
    "Juguetes y juegos",
    "Belleza y Salud",
    "Deportes",
    "Coleccionismo",
    "Cine, DVD y Películas"
  ],
  // Report Headings
  sectionExecutiveSummary: "Resumen Ejecutivo",
  sectionMarketHealth: "Salud del Mercado y Tendencias",
  sectionBuyerInfluencers: "Factores Clave de Influencia en el Comprador",
  sectionKeyTakeaways: "Puntos Clave y Consejos Prácticos",
  sectionKeywords: "Palabras Clave Principales para Anuncios de eBay",
  sectionCurrentQuarter: "Trimestre Actual",
  sectionLookAhead: "Perspectivas para",
  // Sub-Headings
  subHeadingIncrease: "Se espera un aumento en la demanda",
  subHeadingDecrease: "Se espera una caída en la demanda"
};

// Translations for Dutch (NL)
const TRANSLATIONS_NL: UiTranslations = {
  welcomeTitle: "Welkom bij eAMS Marketpulse",
  welcomeIntro: "Deze tool biedt realtime marktanalyses en strategische inzichten voor eBay-categorieën.",
  welcomeInstruction: "Selecteer een categorie in het menu links om te beginnen.",
  loadingMessage: "Inzichten ophalen voor",
  errorMessage: "Er is een fout opgetreden",
  reportTitleSuffix: "Marktrapport",
  lastUpdated: "Laatst bijgewerkt",
  copyButton: "Rapport kopiëren",
  copiedButton: "Gekopieerd!",
  updateButton: "Rapport bijwerken",
  downloadButton: "PDF downloaden",
  sourcesTitle: "Bronnen",
  footerText: "Mogelijk gemaakt door",
  verticals: [
    "Auto-onderdelen en accessoires",
    "Tuin en terras",
    "Lifestyle",
    "Professionele uitrusting",
    "Elektronica",
    "Kleding en accessoires",
    "Speelgoed en spellen",
    "Mooi en gezond",
    "Sport en vakantie",
    "Verzamelen",
    "Films en dvd's"
  ],
  // Report Headings
  sectionExecutiveSummary: "Management Samenvatting",
  sectionMarketHealth: "Huidige Marktsituatie & Trends",
  sectionBuyerInfluencers: "Belangrijkste Invloedsfactoren voor Kopers",
  sectionKeyTakeaways: "Belangrijkste Inzichten & Advies",
  sectionKeywords: "Top Zoekwoorden voor eBay-advertenties",
  sectionCurrentQuarter: "Huidig Kwartaal",
  sectionLookAhead: "Vooruitblik op",
  // Sub-Headings
  subHeadingIncrease: "Verwachte stijging van de vraag",
  subHeadingDecrease: "Verwachte daling van de vraag"
};

// Translations for Polish (PL)
const TRANSLATIONS_PL: UiTranslations = {
  welcomeTitle: "Witamy w eAMS Marketpulse",
  welcomeIntro: "To narzędzie zapewnia analizy rynku w czasie rzeczywistym i strategiczne wskazówki dla kategorii eBay.",
  welcomeInstruction: "Aby rozpocząć, wybierz kategorię z menu po lewej stronie.",
  loadingMessage: "Pobieranie danych dla",
  errorMessage: "Wystąpił błąd",
  reportTitleSuffix: "Raport Rynkowy",
  lastUpdated: "Ostatnia aktualizacja",
  copyButton: "Kopiuj raport",
  copiedButton: "Skopiowano!",
  updateButton: "Aktualizuj raport",
  downloadButton: "Pobierz PDF",
  sourcesTitle: "Źródła",
  footerText: "Wspierane przez",
  verticals: [
    "Motoryzacja: Części i akcesoria",
    "Dom i Ogród",
    "Styl życia",
    "Firma i Przemysł",
    "Elektronika",
    "Moda",
    "Zabawki",
    "Uroda i Zdrowie",
    "Sport i Turystyka",
    "Kolekcje",
    "Filmy i DVD"
  ],
  // Report Headings
  sectionExecutiveSummary: "Podsumowanie Wykonawcze",
  sectionMarketHealth: "Kondycja Rynku i Trendy",
  sectionBuyerInfluencers: "Kluczowe Czynniki Wpływające na Kupujących",
  sectionKeyTakeaways: "Kluczowe Wnioski i Porady",
  sectionKeywords: "Najlepsze Słowa Kluczowe dla Ofert eBay",
  sectionCurrentQuarter: "Obecny Kwartał",
  sectionLookAhead: "Perspektywy na",
  // Sub-Headings
  subHeadingIncrease: "Oczekiwany wzrost popytu",
  subHeadingDecrease: "Oczekiwany spadek popytu"
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
  downloadButton: "Download PDF",
  sourcesTitle: "Sources",
  footerText: "Powered by",
  verticals: MASTER_VERTICALS_EN,
  // Report Headings
  sectionExecutiveSummary: "Executive Summary",
  sectionMarketHealth: "Current Market Health & Trends",
  sectionBuyerInfluencers: "Key Buyer Influencers",
  sectionKeyTakeaways: "Key Takeaways & Actionable Advice",
  sectionKeywords: "Top Keywords for eBay Listings",
  sectionCurrentQuarter: "Current Quarter",
  sectionLookAhead: "Look Ahead to",
  // Sub-Headings
  subHeadingIncrease: "Expected to increase in demand",
  subHeadingDecrease: "Expected to drop in demand"
};

// Helper to get the correct translation set
export const getTranslations = (code: MarketConfig['code']): UiTranslations => {
  switch (code) {
    case 'DE': 
    case 'AT': // Austria uses German
    case 'CH': // Switzerland (Mapped to German default)
      return TRANSLATIONS_DE;

    case 'FR': 
    case 'BE-FR': // Belgium (French)
    case 'CA-FR': // Canada (French)
      return TRANSLATIONS_FR;

    case 'IT': 
      return TRANSLATIONS_IT;

    case 'ES': 
      return TRANSLATIONS_ES;

    case 'NL': 
    case 'BE-NL': // Belgium (Dutch)
      return TRANSLATIONS_NL;

    case 'PL': 
      return TRANSLATIONS_PL;

    case 'UK':
    case 'US':
    case 'AU':
    case 'CA': // Canada (English)
    case 'IE': // Ireland
    case 'HK': // Hong Kong
    case 'MY': // Malaysia
    case 'PH': // Philippines
    case 'SG': // Singapore
    default:
      return TRANSLATIONS_EN;
  }
};
