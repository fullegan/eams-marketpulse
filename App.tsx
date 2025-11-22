
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentDisplay } from './components/ContentDisplay';
import { getTranslations } from './constants';
import { fetchVerticalInsights } from './services/geminiService';
import type { ApiResult } from './types';
import { getCurrentMarket } from './config';

const App: React.FC = () => {
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultsCache, setResultsCache] = useState<Record<string, ApiResult>>({});
  const [error, setError] = useState<string | null>(null);
  
  // New State: English Translation Toggle
  const [forceEnglish, setForceEnglish] = useState<boolean>(false);
  
  const currentMarket = getCurrentMarket();
  
  // Retrieve translations. If forceEnglish is true, we load 'UK' (English) defaults regardless of market.
  const translations = useMemo(() => {
    return forceEnglish ? getTranslations('UK') : getTranslations(currentMarket.code);
  }, [currentMarket.code, forceEnglish]);

  useEffect(() => {
    document.title = `eAMS Marketpulse | ${currentMarket.name}`;
  }, [currentMarket]);

  const fetchInsightsForVertical = useCallback(async (vertical: string, isEnglishMode: boolean) => {
    if (!vertical) return;

    setIsLoading(true);
    setError(null);
    try {
      // Pass the isEnglishMode flag to the service
      const data = await fetchVerticalInsights(vertical, isEnglishMode);
      
      // We key the cache by Vertical + Language to avoid showing German results in English mode
      const cacheKey = `${vertical}-${isEnglishMode ? 'EN' : 'NATIVE'}`;
      
      setResultsCache(prevCache => ({
        ...prevCache,
        [cacheKey]: { ...data, lastUpdated: new Date() }
      }));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectVertical = (vertical: string) => {
    setSelectedVertical(vertical);
    setError(null);
    
    const cacheKey = `${vertical}-${forceEnglish ? 'EN' : 'NATIVE'}`;
    
    // Fetch only if the data is not already in the cache for this specific language mode
    if (!resultsCache[cacheKey]) {
      fetchInsightsForVertical(vertical, forceEnglish);
    }
  };
  
  const handleUpdateReport = () => {
    // Always fetch when the update button is clicked.
    if (selectedVertical) {
        fetchInsightsForVertical(selectedVertical, forceEnglish);
    }
  };

  // Toggle Language Handler
  const handleToggleLanguage = () => {
    const newMode = !forceEnglish;
    setForceEnglish(newMode);
    
    // If we have a vertical selected, immediately re-fetch (or check cache) for the new language
    if (selectedVertical) {
        const cacheKey = `${selectedVertical}-${newMode ? 'EN' : 'NATIVE'}`;
        if (!resultsCache[cacheKey]) {
            fetchInsightsForVertical(selectedVertical, newMode);
        }
    }
  };

  const currentCacheKey = selectedVertical ? `${selectedVertical}-${forceEnglish ? 'EN' : 'NATIVE'}` : '';
  const currentResult = selectedVertical ? resultsCache[currentCacheKey] : null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-gray-800 pb-8">
      <Sidebar 
        verticals={translations.verticals}
        selectedVertical={selectedVertical}
        onSelectVertical={handleSelectVertical}
        isLoading={isLoading}
      />
      <ContentDisplay 
        isLoading={isLoading}
        result={currentResult}
        error={error}
        vertical={selectedVertical}
        onUpdateReport={handleUpdateReport}
        translations={translations}
        isEnglishMode={forceEnglish}
        onToggleLanguage={handleToggleLanguage}
        marketCode={currentMarket.code}
      />
    </div>
  );
};

export default App;
