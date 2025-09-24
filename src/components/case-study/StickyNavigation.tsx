import React, { useState, useEffect } from 'react';

interface StickyNavigationProps {
  isVisible: boolean;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const sections = [
  { id: 'problem', label: 'PROBLEM' },
  { id: 'solution', label: 'SOLUTION' },
  { id: 'impact', label: 'IMPACT' },
  { id: 'approach', label: 'APPROACH' },
  { id: 'challenges', label: 'CHALLENGES' },
  { id: 'experiment', label: 'EXPERIMENT' },
  { id: 'learnings', label: 'LEARNINGS' },
];

const StickyNavigation: React.FC<StickyNavigationProps> = ({
  isVisible,
  activeSection,
  onSectionClick
}) => {
  return (
    <div className="sticky top-6 bg-bg-1/95 backdrop-blur-sm z-20">
      <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="space-y-1 py-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`block w-full text-left font-['IBM_Plex_Mono'] font-semibold text-[14px] tracking-[-0.28px] transition-colors duration-200 hover:text-fg-1 py-1 ${
                activeSection === section.id ? 'text-fg-1' : 'text-fg-2'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyNavigation;
