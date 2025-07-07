
import React from 'react';
import { Mode } from '../types';
import { MODE_DETAILS } from '../constants';

interface SettingsScreenProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-3xl font-black text-primary mb-2">Settings</h1>
      <p className="text-secondary mb-8">Choose your path for today. Changing the mode will regenerate your tasks.</p>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-secondary tracking-widest uppercase">Mode</h2>
        {(Object.keys(MODE_DETAILS) as Mode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              currentMode === mode
                ? 'bg-primary text-background border-primary'
                : 'bg-surface border-surface hover:border-secondary'
            }`}
          >
            <span className="font-bold text-lg">{MODE_DETAILS[mode].name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsScreen;
