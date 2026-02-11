import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentDisplay } from './components/ContentDisplay';
import { getTranslations, VERTICAL_GROUPS } from './constants';
import { fetchVerticalInsights } from './services/geminiService';
import type { ApiResult } from './types';
import { getCurrentMarket } from './config';

const ReviewBanner: React.FC = () => {
  // Use optional chaining to prevent crash if import.meta.env is undefined
  const isReviewMode = import.meta.env?.VITE_REVIEW_MODE === 'true';
  
  if (!isReviewMode) return null;

  return (
    <div className="bg-amber-100 border-b border-amber-200 py-2 px-4 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
          Internal Preview
        </span>
        <p className="text-amber-900 text-xs md:text-sm font-bold">
          Stakeholder Review Mode &mdash; Do not share this URL with external sellers.
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultsCache, setResultsCache] = useState<Record<string, ApiResult>>({});
  const [error, setError] = useState<string | null>(null);
  const [forceEnglish, setForceEnglish] = useState<boolean>(false);
  
  const currentMarket = getCurrentMarket();
  
  // Directly compute translations to avoid any useMemo stale-state issues
  const translations = useMemo(() => {
    try {
      return forceEnglish ? getTranslations('UK') : getTranslations(currentMarket.code);
    } catch (e) {
      console.warn("Falling back to default translations", e);
      return getTranslations('UK');
    }
  }, [currentMarket.code, forceEnglish]);

  useEffect(() => {
    document.title = `eAMS Marketpulse | ${currentMarket.name}`;
  }, [currentMarket]);

  const fetchInsightsForVertical = useCallback(async (vertical: string, isEnglishMode: boolean) => {
    if (!vertical) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchVerticalInsights(vertical, isEnglishMode);
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
    
    if (!resultsCache[cacheKey]) {
      fetchInsightsForVertical(vertical, forceEnglish);
    }
  };
  
  const handleUpdateReport = () => {
    if (selectedVertical) {
        fetchInsightsForVertical(selectedVertical, forceEnglish);
    }
  };

  const handleToggleLanguage = () => {
    const newMode = !forceEnglish;
    setForceEnglish(newMode);
    
    if (selectedVertical) {
        const cacheKey = `${selectedVertical}-${newMode ? 'EN' : 'NATIVE'}`;
        if (!resultsCache[cacheKey]) {
            fetchInsightsForVertical(selectedVertical, newMode);
        }
    }
  };

  const currentCacheKey = selectedVertical ? `${selectedVertical}-${forceEnglish ? 'EN' : 'NATIVE'}` : '';
  const currentResult = selectedVertical ? resultsCache[currentCacheKey] : null;

  // Resilient vertical list derivation
  const allVerticals = useMemo(() => {
    // Primary source: current translations
    if (translations && Array.isArray(translations.groups) && translations.groups.length > 0) {
      return translations.groups.flatMap(group => group.categories || []);
    }
    // Secondary source: direct import from constants
    return VERTICAL_GROUPS.flatMap(group => group.categories || []);
  }, [translations]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <ReviewBanner />
      <div className="flex flex-col md:flex-row flex-grow text-gray-800 pb-8">
        <Sidebar 
          verticals={allVerticals}
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
    </div>
  );
};

export default App;