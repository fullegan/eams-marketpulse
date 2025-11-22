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
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-gray-800">
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
    </div>
  );
};

export default App;
