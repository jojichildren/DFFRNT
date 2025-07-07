import React from 'react';

interface PreNightRoutineScreenProps {
  onStart: () => void;
}

const PreNightRoutineScreen: React.FC<PreNightRoutineScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-background p-6 text-center animate-fade-in">
      <h1 className="text-5xl font-black text-primary">ナイトルーティン</h1>
      <p className="text-secondary mt-2 mb-12 max-w-md">最高の睡眠がテストステロンを高める。</p>
      
      <button
        onClick={onStart}
        className="w-48 h-48 rounded-full bg-primary text-background font-bold text-3xl tracking-widest flex items-center justify-center animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105"
      >
        START
      </button>

    </div>
  );
};

export default PreNightRoutineScreen;
