import React, { useState } from 'react';
import type { ApiResult } from '../types';
import { EAMSLogo, LoadingSpinner, RefreshIcon, CopyIcon } from './Icons';

interface ContentDisplayProps {
  isLoading: boolean;
  result: ApiResult | null;
  error: string | null;
  vertical: string | null; // Allow null for initial state
  marketName: string;
  onUpdateReport: () => void;
}

const AppFooter: React.FC = () => (
    <footer className="text-center py-4 mt-8">
        <p className="text-sm text-gray-500">
            Powered by <span className="font-bold">eAMS</span>
        </p>
    </footer>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8 animate-fade-in">
        <div className="flex-grow flex flex-col items-center justify-center">
            {/* Container for logo and title to control their collective width */}
            <div className="w-full max-w-sm">
                <EAMSLogo className="w-full h-auto" /> {/* Logo will fill the container */}
                <p className="text-3xl mt-2 font-bold text-gray-800 uppercase tracking-widest">MARKETPULSE</p>
            </div>

            {/* Restored welcome text */}
            <div className="mt-12 max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-700">Welcome to eAMS Marketpulse</h2>
                <p className="mt-4 text-lg">
                    This tool provides real-time market analysis and actionable insights for eBay verticals.
                </p>
                <p className="mt-2 text-lg">
                    To get started, please select a vertical from the menu on the left.
                </p>
            </div>
        </div>
        <AppFooter />
    </div>
);

const LoadingState: React.FC<{vertical: string}> = ({vertical}) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 p-8">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Fetching latest insights for</p>
        <p className="text-lg font-semibold text-primary-700">{vertical}...</p>
    </div>
);

const ErrorState: React.FC<{error: string}> = ({error}) => (
    <div className="m-4 flex flex-col items-center justify-center text-center text-red-700 bg-red-100 border border-red-300 p-6 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="text-xl font-bold">An Error Occurred</h3>
        <p className="mt-2">{error}</p>
    </div>
);

const ReportDisplay: React.FC<{result: ApiResult, vertical: string, isLoading: boolean, onUpdateReport: () => void}> = ({ result, vertical, isLoading, onUpdateReport }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (result?.text) {
            navigator.clipboard.writeText(result.text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500); // Reset after 2.5 seconds
        }
    };

    const renderFormattedText = (text: string) => {
        const lines = text.split('\n');
        // FIX: Qualified JSX.Element with React.JSX.Element to resolve "Cannot find namespace 'JSX'" error.
        const elements: React.JSX.Element[] = [];
        let listItems: string[] = [];
    
        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`ul-${elements.length}`} className="list-disc space-y-2 pl-6 mb-4">
                        {listItems.map((item, j) => (
                            <li key={j} className="ml-2">{item}</li>
                        ))}
                    </ul>
                );
                listItems = [];
            }
        };
    
        lines.forEach((line, i) => {
            const trimmedLine = line.trim();
    
            if (trimmedLine.startsWith('### ')) {
                flushList();
                elements.push(<h3 key={i} className="text-xl font-bold mt-6 mb-2">{trimmedLine.substring(4)}</h3>);
            } else if (trimmedLine.startsWith('## ')) {
                flushList();
                elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-3 pt-4 border-t border-gray-200 first:mt-0 first:border-t-0">{trimmedLine.substring(3)}</h2>);
            } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                listItems.push(trimmedLine.replace(/^[-*]\s*/, ''));
            } else if (trimmedLine === '') {
                flushList();
            } else {
                flushList();
                elements.push(<p key={i} className="mb-4">{trimmedLine}</p>);
            }
        });
    
        flushList(); // Ensure any trailing list is rendered
    
        return elements;
    };

    return (
        <div key={vertical} className="animate-fade-in">
            <div className="md:flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        {vertical} Market Report
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Last updated: {result.lastUpdated.toLocaleString()}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0">
                    <button
                        onClick={handleCopy}
                        className="flex items-center justify-center px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-200 disabled:bg-slate-300"
                    >
                       <CopyIcon className="w-5 h-5 mr-2" />
                       {isCopied ? 'Copied!' : 'Copy Report'}
                    </button>
                    <button
                        onClick={onUpdateReport}
                        disabled={isLoading}
                        className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-200 disabled:bg-primary-300 disabled:cursor-not-allowed"
                    >
                       <RefreshIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                       Update Report
                    </button>
                </div>
            </div>

            <article className="prose-lg max-w-none bg-white p-6 md:p-8 rounded-lg shadow-lg">
                {renderFormattedText(result.text)}
            </article>
            
            {result.sources.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sources</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <ul className="space-y-3">
                            {result.sources.map((source, index) => (
                                source.web && <li key={index} className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline hover:text-primary-800 transition-colors break-words">
                                        {source.web.title || source.web.uri}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <AppFooter />
        </div>
    );
}


export const ContentDisplay: React.FC<ContentDisplayProps> = ({ isLoading, result, error, vertical, marketName, onUpdateReport }) => {
    const renderContent = () => {
        // Show full page loader ONLY if we are loading AND have no previous data to show.
        if (isLoading && !result) {
            return <LoadingState vertical={vertical!} />;
        }
        if (error) {
            return <ErrorState error={error} />;
        }
        // Show the report if we have data (even if we are loading a fresh version).
        if (result && vertical) {
            return <ReportDisplay result={result} vertical={vertical} isLoading={isLoading} onUpdateReport={onUpdateReport} />;
        }
        // Show the initial welcome screen if no vertical is selected yet.
        return <InitialState />;
    };

    return (
        <main className="w-full md:w-3/4 lg:w-4/5 p-4 md:p-8 bg-slate-100 overflow-y-auto h-screen">
           {renderContent()}
        </main>
    );
};