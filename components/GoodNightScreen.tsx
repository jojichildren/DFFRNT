
import React, { useState } from 'react';

interface GoodNightScreenProps {
  onGoodNight: (targetWakeupTime: string) => void;
}

const GoodNightScreen: React.FC<GoodNightScreenProps> = ({ onGoodNight }) => {
  const [wakeupTime, setWakeupTime] = useState('06:00');

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-background p-6 text-center animate-fade-in">
      <h1 className="text-5xl font-black text-primary">NIGHTLY DUTIES COMPLETE</h1>
      <p className="text-secondary mt-2 mb-12">Rest is a weapon. Use it wisely.</p>
      
      <div className="w-full max-w-xs space-y-6">
          <div>
            <label htmlFor="wakeup-time" className="block text-sm font-bold text-secondary tracking-widest uppercase mb-2">
                Target Wake-up
            </label>
            <input
                type="time"
                id="wakeup-time"
                value={wakeupTime}
                onChange={(e) => setWakeupTime(e.target.value)}
                className="w-full bg-surface p-4 rounded-lg text-primary text-3xl font-bold text-center appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => onGoodNight(wakeupTime)}
            className="w-full px-12 py-4 bg-primary text-background font-bold text-2xl tracking-widest rounded-md hover:bg-accent hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-primary/10"
          >
            GOOD NIGHT
          </button>
      </div>

    </div>
  );
};

export default GoodNightScreen;
