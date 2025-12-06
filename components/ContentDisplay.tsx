import 
React, { useState } from 
'react';

import 
type { ApiResult, 
UiTranslations } from 
'../types';

import { 
LoadingSpinner, RefreshIcon, 
CopyIcon, GlobeIcon, 
DownloadIcon } from 
'./Icons';



interface 
ContentDisplayProps {

  isLoading: boolean;

  result: ApiResult | 
null;

  error: string | 
null;

  vertical: string | 
null; 

  onUpdateReport: () => void;

  translations: UiTranslations;

  // New Props for Language Toggle

  isEnglishMode: boolean;

  onToggleLanguage: () => void;

  marketCode: string;

}



const 
AppFooter: React.FC<{ text:
string }> = ({ text }) => (

    <footer className="text-center py-4 mt-8">

        <p className="text-sm text-gray-500">

            {text} <span className="font-bold">eAMS</span>

        </p>

    </footer>

);



const 
InitialState: React.FC<{ t:
UiTranslations }> = ({ t }) => (

    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8 animate-fade-in">

        <div className="flex-grow flex flex-col items-center justify-center">

            {/* Container for logo and title */}

            <div className="w-full max-w-lg flex flex-col items-center">

                <img 

                    src="/images/welcome-page.png"

                    alt="eAMS Marketpulse"

                    className="w-full h-auto object-contain"

                />

            </div>



            <div className="mt-4 max-w-2xl">

                <h2 className="text-2xl font-bold text-gray-700">{t.welcomeTitle}</h2>

                <p className="mt-4 text-lg">

                    {t.welcomeIntro}

                </p>

                <p className="mt-2 text-lg">

                    {t.welcomeInstruction}

                </p>

            </div>

        </div>

        <AppFooter text={t.footerText} />

    </div>

);



const 
LoadingState: React.FC<{vertical:
string, message: 
string}> = ({vertical, message}) => (

    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 p-8">

        <LoadingSpinner />

        <p className="mt-4 text-lg">{message}</p>

        <p className="text-lg font-semibold text-primary-700">{vertical}...</p>

    </div>

);



const 
ErrorState: React.FC<{error:
string, title: 
string}> = ({error, title}) => (

    <div className="m-4 flex flex-col items-center justify-center text-center text-red-700 bg-red-100 border border-red-300 p-6 rounded-lg">

        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none"
 viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round"
 strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

        <h3 className="text-xl font-bold">{title}</h3>

        <p className="mt-2">{error}</p>

    </div>

);



const 
ReportDisplay: React.FC<{result:
ApiResult, vertical: 
string, isLoading: boolean, onUpdateReport: () =>
void, t: 
UiTranslations, marketCode: string}> = ({ result, vertical, isLoading, onUpdateReport, t, marketCode }) => {

    const [isCopied, setIsCopied] = useState(false);

    const [isDownloading, setIsDownloading] = useState(false);



    const handleCopy = () => {

        if (result?.text) {

            navigator.clipboard.writeText(result.text);

            setIsCopied(true);

            setTimeout(() => setIsCopied(false),
2500); 
// Reset after 2.5 seconds

        }

    };



    const handleDownloadPDF = () => {

        const element = document.getElementById('report-container');

        if (!element) 
return;



        setIsDownloading(true);



        const opt = {

            margin: [10, 
15, 15, 
15], // top, left, bottom, right

            // Prefix filename with Market Code (e.g., UK_Fashion_Market_Report.pdf)

            filename: `${marketCode}_${vertical.replace(/\s+/g,
'_')}_Market_Report.pdf`,

            image: { type: 
'jpeg', quality: 0.98 },

            html2canvas: { scale: 2, useCORS:
true, logging: 
false },

            jsPDF: { unit: 'mm', format:
'a4', orientation: 
'portrait' }

        };



        // Access html2pdf from window (loaded via CDN)

        // @ts-ignore

        if (window.html2pdf) {

             // @ts-ignore

            window.html2pdf().set(opt).from(element).save().then(() => {

                setIsDownloading(false);

            }).catch((err: 
any) => {

                console.error("PDF generation failed", err);

                setIsDownloading(false);

            });

        } else {

            console.error("html2pdf library not loaded");

            setIsDownloading(false);

        }

    };



    const renderFormattedText = (text:
string) => {

        const lines = text.split('\n');

        const elements: 
React.JSX.Element[] = [];

        let listItems: 
string[] = [];

    

        const flushList = () => {

            if (listItems.length > 
0) {

                elements.push(

                    // Added marker:text-black to ensure bullets are black

                    <ul key={`ul-${elements.length}`} className="list-disc space-y-2 pl-6 mb-4 text-black marker:text-black">

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

                // Ensure headings are strictly black

                elements.push(<h3 key={i} className="text-xl font-bold mt-6 mb-2 text-black">{trimmedLine.substring(4)}</h3>);

            } else 
if (trimmedLine.startsWith('## ')) {

                flushList();

                // Ensure headings are strictly black

                elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-3 pt-4 border-t border-gray-200 first:mt-0 first:border-t-0 text-black">{trimmedLine.substring(3)}</h2>);

            } else 
if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {

                listItems.push(trimmedLine.replace(/^[-*]\s*/,
''));

            } else 
if (trimmedLine === '') {

                flushList();

            } else {

                flushList();

                // Ensure paragraph text is strictly black

                elements.push(<p key={i} className="mb-4 text-black">{trimmedLine}</p>);

            }

        });

    

        flushList(); 

    

        return elements;

    };



    return (

        <div key={vertical} className="animate-fade-in" id="report-container">

            <div className="md:flex justify-between items-center mb-6">

                <div>

                    {/* Explicitly set title text to black and include Market Code prefix */}

                    <h1 className="text-3xl md:text-4xl font-extrabold text-black">

                        {marketCode}: {vertical} {t.reportTitleSuffix}

                    </h1>

                    {/* Darker grey (nearly black) for metadata to ensure it prints well */}

                    <p className="text-sm text-gray-900 mt-1">

                        {t.lastUpdated}: {result.lastUpdated.toLocaleString()}

                    </p>

                </div>

                {/* 

                   data-html2canvas-ignore="true" tells the PDF generator to SKIP this entire div.

                   This keeps the buttons out of the final PDF.

                */}

                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0" data-html2canvas-ignore="true">

                     <button

                        onClick={handleDownloadPDF}

                        disabled={isDownloading}

                        className="flex items-center justify-center px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg shadow-sm border border-slate-300 hover:bg-slate-200 transition-colors duration-200 disabled:opacity-50"

                        title={t.downloadButton}

                    >

                       <DownloadIcon className={`w-5 h-5 mr-2
${isDownloading ? 'animate-bounce' :
''}`} />

                       {t.downloadButton}

                    </button>



                    <button

                        onClick={handleCopy}

                        className="flex items-center justify-center px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-200 disabled:bg-slate-300"

                    >

                       <CopyIcon className="w-5 h-5 mr-2" />

                       {isCopied ? t.copiedButton : t.copyButton}

                    </button>

                    <button

                        onClick={onUpdateReport}

                        disabled={isLoading}

                        className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-200 disabled:bg-primary-300 disabled:cursor-not-allowed"

                    >

                       <RefreshIcon className={`w-5 h-5 mr-2
${isLoading ? 'animate-spin' : 
''}`} />

                       {t.updateButton}

                    </button>

                </div>

            </div>



            {/* 

                Updated prose classes to override default grey colors with strict black.

                prose-headings:text-black = Force H1, H2, H3 to black

                prose-p:text-black = Force paragraphs to black

                prose-li:text-black = Force list items to black

                prose-strong:text-black = Force bold text to black

            */}

            <article className="prose-lg max-w-none bg-white p-6 md:p-8 rounded-lg shadow-lg prose-headings:text-black prose-p:text-black prose-li:text-black prose-strong:text-black text-black">

                {renderFormattedText(result.text)}

            </article>

            

            {result.sources.length > 0 && (

                <div className="mt-10">

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.sourcesTitle}</h2>

                    <div className="bg-white p-6 rounded-lg shadow-lg">

                        <ul className="space-y-3">

                            {result.sources.map((source, index) => (

                                source.web && <li key={index} className="flex items-start">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-primary-500 flex-shrink-0"
 fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round"
 strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>

                                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline
 hover:text-primary-800 transition-colors break-words">

                                        {source.web.title || source.web.uri}

                                    </a>

                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

            )}

            <AppFooter text={t.footerText} />

        </div>

    );

}





export 
const ContentDisplay: 
React.FC<ContentDisplayProps> = ({

    isLoading, result, error, vertical, onUpdateReport, translations, 

    isEnglishMode, onToggleLanguage, marketCode 

}) => {

    

    // Check if we should show the toggle button.

    // We hide it for EN speaking native markets (UK, US, AU) as they don't need translation.

    const showLanguageToggle = !['UK',
'US', 
'AU'].includes(marketCode);



    return (

        <main className="w-full md:w-3/4 lg:w-4/5 p-4 md:p-8 bg-slate-100 overflow-y-auto h-screen relative">

           

           {/* Language Toggle Button (Absolute positioned top-right) */}

           {showLanguageToggle && (

             <div className="absolute top-4 right-4 z-10" data-html2canvas-ignore="true">

                <button 

                    onClick={onToggleLanguage}

                    className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors"

                    title={isEnglishMode ? 
"Switch to Local Language" : "Switch to English"}

                >

                    <GlobeIcon className="w-4 h-4 mr-2 text-gray-500" />

                    {isEnglishMode ? "Native" :
"English"}

                </button>

             </div>

           )}



           {/* Render Logic */}

           {isLoading && !result ? (

                <LoadingState vertical={vertical!} message={translations.loadingMessage} />

           ) : error ? (

                <ErrorState error={error} title={translations.errorMessage} />

           ) : result && vertical ? (

                <ReportDisplay 

                    result={result} 

                    vertical={vertical} 

                    isLoading={isLoading} 

                    onUpdateReport={onUpdateReport} 

                    t={translations} 

                    marketCode={marketCode} 

                />

           ) : (

                <InitialState t={translations} />

           )}

        </main>

    );

};



