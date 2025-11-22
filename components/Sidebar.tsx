import React from 'react';
import { EAMSLogo } from './Icons';

interface SidebarProps {
  verticals: string[];
  selectedVertical: string | null; // Allow null for initial state
  onSelectVertical: (vertical: string) => void;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ verticals, selectedVertical, onSelectVertical, isLoading }) => {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-white p-4 md:p-6 shadow-lg md:h-screen md:sticky md:top-0 overflow-y-auto">
      <div className="text-center mb-8">
        <div className="inline-block"> {/* This container shrinks to fit the content width */}
          <EAMSLogo className="h-auto w-32 mx-auto" /> {/* Logo size reduced for a more refined look */}
          <div className="mt-2">
            <p className="text-sm font-semibold text-gray-600 leading-tight whitespace-nowrap">Advertising Managed Services</p>
            <p className="text-xl font-bold text-gray-800 leading-tight uppercase tracking-wider">MARKETPULSE</p>
          </div>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          {verticals.map((vertical) => (
            <li key={vertical}>
              <button
                onClick={() => onSelectVertical(vertical)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 text-gray-700 font-medium
                  ${selectedVertical === vertical
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'hover:bg-primary-100 hover:text-primary-800'}
                  ${isLoading ? 'cursor-not-allowed opacity-60' : ''}
                `}
              >
                {vertical}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
