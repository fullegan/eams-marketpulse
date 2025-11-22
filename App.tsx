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
  const currentMarket = getCurrentMarket();
  
  // Retrieve translations for the current market
  const translations = useMemo(() => getTranslations(currentMarket.code), [currentMarket.code]);

  useEffect(() => {
    document.title = `eAMS Marketpulse | ${currentMarket.name}`;
  }, [currentMarket]);

  const fetchInsightsForVertical = useCallback(async (vertical: string) => {
    if (!vertical) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchVerticalInsights(vertical);
      setResultsCache(prevCache => ({
        ...prevCache,
        [vertical]: { ...data, lastUpdated: new Date() }
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
    // Fetch only if the data is not already in the cache.
    if (!resultsCache[vertical]) {
      fetchInsightsForVertical(vertical);
    }
  };
  
  const handleUpdateReport = () => {
    // Always fetch when the update button is clicked.
    if (selectedVertical) {
        fetchInsightsForVertical(selectedVertical);
    }
  };

  const currentResult = selectedVertical ? resultsCache[selectedVertical] : null;

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
      />

      {/* DEBUG FOOTER: Helps verify if the Market Code is being read correctly in production */}
      <div className="fixed bottom-0 left-0 w-full bg-black text-white text-xs p-2 z-50 flex justify-between px-4 opacity-90 font-mono">
        <span className="flex items-center gap-2">
           <span className="text-gray-400">MARKET CODE:</span> 
           <span className="font-bold text-green-400">{currentMarket.code}</span>
        </span>
        <span className="flex items-center gap-2">
           <span className="text-gray-400">LANGUAGE:</span> 
           <span className="font-bold">{currentMarket.language}</span>
        </span>
        <span className="flex items-center gap-2">
           <span className="text-gray-400">TEST TRANSLATION:</span> 
           <span className="font-bold text-yellow-300">{translations.verticals[0]}</span>
        </span>
      </div>
    </div>
  );
};

export default App;