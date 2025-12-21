
import React from 'react';

interface SidebarProps {
  verticals: string[];
  selectedVertical: string | null; // Allow null for initial state
  onSelectVertical: (vertical: string) => void;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ verticals, selectedVertical, onSelectVertical, isLoading }) => {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-xl md:h-screen md:sticky md:top-0 overflow-y-auto flex flex-col z-20 border-none scrollbar-hide">
      {/* Minimized top and bottom padding around the logo to save vertical space */}
      <div className="w-full pt-5 pb-3 px-4 flex-shrink-0">
        <div className="w-full flex items-center justify-center">
          <img 
            src="/images/sidebar-menu.png" 
            alt="eAMS Logo" 
            className="w-full max-w-[220px] h-auto object-contain" 
          />
        </div>
      </div>
      
      {/* Tightened navigation spacing */}
      <nav className="px-4 py-1 flex-grow">
        <ul className="space-y-0.5">
          {verticals.map((vertical) => (
            <li key={vertical}>
              <button
                onClick={() => onSelectVertical(vertical)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-gray-700 font-semibold text-sm xl:text-base
                  ${selectedVertical === vertical
                    ? 'bg-primary-600 text-white shadow-md transform scale-[1.01]'
                    : 'hover:bg-primary-50 hover:text-primary-700'}
                  ${isLoading ? 'cursor-not-allowed opacity-60' : ''}
                `}
              >
                {vertical}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Ensure no extra padding at the bottom */}
      <div className="h-4 flex-shrink-0"></div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </aside>
  );
};
