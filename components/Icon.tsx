import React from 'react';

export interface IconProps {
  name: 'sleep' | 'meal' | 'exercise' | 'settings';
  className?: string;
}

const SleepIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 10h8a2 2 0 002-2V9a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
    </svg>
);

const MealIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.75v18.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.75 12h18.5" />
    </svg>
);

const ExerciseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 18h12M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-6 12v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9" />
    </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


const Icon: React.FC<IconProps> = ({ name, className }) => {
  switch (name) {
    case 'sleep':
      return <SleepIcon className={className} />;
    case 'meal':
      return <MealIcon className={className} />;
    case 'exercise':
        return <ExerciseIcon className={className} />;
    case 'settings':
      return <SettingsIcon className={className} />;
    default:
      return null;
  }
};

export default Icon;