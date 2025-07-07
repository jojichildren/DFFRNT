
import React, { useState, useEffect } from 'react';

interface WakeUpScreenProps {
  onAwaken: () => void;
}

const WakeUpScreen: React.FC<WakeUpScreenProps> = ({ onAwaken }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-GB');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-black text-primary tracking-tighter">
          {formattedTime}
        </h1>
        <p className="text-secondary mt-2">The day belongs to you.</p>
      </div>
      <button
        onClick={onAwaken}
        className="mt-24 px-12 py-4 bg-primary text-background font-bold text-2xl tracking-widest rounded-md hover:bg-accent hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-primary/10"
      >
        AWAKEN
      </button>
    </div>
  );
};

export default WakeUpScreen;
