
import React, { useState } from 'react';
import type { WorkoutExercise, WorkoutSet, WorkoutCategory } from '../types';
import { WORKOUT_CATEGORIES, WORKOUT_EXERCISES } from '../constants';

const ConfirmationModal: React.FC<{ onConfirm: () => void; onClose: () => void }> = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
    <div className="bg-surface rounded-lg p-6 text-center max-w-sm w-full shadow-lg">
      <h2 className="text-xl font-bold text-primary mb-4">Are you truly finished?</h2>
      <p className="text-secondary mb-6">限界まで追い込めた者のみが、筋トレの終了に値する。</p>
      <div className="flex flex-col space-y-3">
        <button onClick={onConfirm} className="w-full px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
          本当に終了する
        </button>
        <button onClick={onClose} className="w-full px-4 py-3 bg-primary text-background font-bold rounded-lg hover:bg-accent transition-colors">
          筋トレに戻る
        </button>
      </div>
    </div>
  </div>
);

const AddExerciseSelection: React.FC<{ onAdd: (name: string, sets: number) => void }> = ({ onAdd }) => {
  const [step, setStep] = useState<'category' | 'exercise'>('category');
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | null>(null);
  const [numSets, setNumSets] = useState(3);

  const handleCategorySelect = (category: WorkoutCategory) => {
    setSelectedCategory(category);
    setStep('exercise');
  };

  const handleExerciseSelect = (name: string) => {
    if (name.trim() && numSets > 0) {
      onAdd(name, numSets);
    }
  };
  
  const handleBack = () => {
    setStep('category');
    setSelectedCategory(null);
  };

  if (step === 'category') {
    return (
      <div className="bg-surface p-4 rounded-lg animate-fade-in mt-4">
        <h3 className="text-lg font-bold text-primary mb-3 text-center">種目のカテゴリーを選択</h3>
        <div className="space-y-3">
          {WORKOUT_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => handleCategorySelect(cat.id)} className="w-full p-4 bg-background rounded-md text-primary font-bold hover:bg-primary hover:text-background transition-colors duration-200">
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'exercise' && selectedCategory) {
    const exercisesInCategory = WORKOUT_EXERCISES.filter(ex => ex.category === selectedCategory);
    return (
      <div className="bg-surface p-4 rounded-lg animate-fade-in mt-4">
        <div className="flex items-center mb-4">
            <button onClick={handleBack} className="text-secondary hover:text-primary p-1 rounded-full transition-colors" aria-label="Back to categories">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                 </svg>
            </button>
            <h3 className="text-lg font-bold text-primary text-center flex-grow -ml-8">種目を選択</h3>
        </div>
        <div className="flex items-center space-x-2 mb-4 pl-2">
          <label htmlFor="sets" className="text-secondary font-bold">セット数:</label>
          <input
            id="sets"
            type="number"
            value={numSets}
            onChange={(e) => setNumSets(Math.max(1, parseInt(e.target.value, 10)))}
            min="1"
            className="w-20 bg-background p-2 rounded-md text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary text-center"
          />
        </div>
        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {exercisesInCategory.map(ex => (
                <button key={ex.name} onClick={() => handleExerciseSelect(ex.jp_name)} className="w-full text-left p-3 bg-background rounded-md text-primary hover:bg-primary hover:text-background transition-colors duration-200">
                    {ex.jp_name}
                </button>
            ))}
        </div>
      </div>
    );
  }

  return null;
};


const WorkoutLogger: React.FC<{ onFinish: () => void; onSaveLog: (log: WorkoutExercise[]) => void; }> = ({ onFinish, onSaveLog }) => {
    const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
    const [isAddingExercise, setIsAddingExercise] = useState(true);
    const [showEndConfirmation, setShowEndConfirmation] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const updateSet = (exIndex: number, setIndex: number, newSet: Partial<WorkoutSet>) => {
        setExercises(prev => 
            prev.map((ex, i) => 
                i === exIndex 
                ? { ...ex, sets: ex.sets.map((s, j) => j === setIndex ? { ...s, ...newSet } : s) }
                : ex
            )
        );
    };

    const handleAddExercise = (name: string, numSets: number) => {
        const newExercise: WorkoutExercise = {
            name,
            sets: Array.from({ length: numSets }, () => ({ weight: 0, reps: 0, status: 'pending' }))
        };
        setExercises(prev => [...prev, newExercise]);
        setIsAddingExercise(false);
    };

    const handleConfirmFinish = () => {
        onSaveLog(exercises);
        setIsFinished(true);
        setShowEndConfirmation(false);
    };

    if (isFinished) {
        return (
            <div className="p-6 animate-fade-in">
                <h1 className="text-3xl font-black text-primary mb-2">Workout Summary</h1>
                <p className="text-secondary mb-8">You conquered the iron today.</p>
                <div className="space-y-4">
                    {exercises.map((ex, i) => (
                        <div key={i} className="bg-surface p-4 rounded-lg">
                            <h2 className="text-xl font-bold text-primary mb-2">{ex.name}</h2>
                            <ul className="list-disc list-inside text-secondary space-y-1">
                                {ex.sets.map((s, j) => (
                                    <li key={j} className="text-primary">Set {j + 1}: <span className="font-semibold">{s.weight} kg</span> x <span className="font-semibold">{s.reps} reps</span></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <button onClick={onFinish} className="mt-8 w-full px-4 py-3 bg-primary text-background font-bold rounded-lg hover:bg-accent transition-colors">
                    Done
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 animate-fade-in relative min-h-full flex flex-col">
            {showEndConfirmation && <ConfirmationModal onConfirm={handleConfirmFinish} onClose={() => setShowEndConfirmation(false)} />}
            
            <div className="flex-shrink-0 flex items-center justify-between mb-4">
                 <button onClick={onFinish} className="text-secondary hover:text-primary transition-colors duration-200 flex items-center text-sm font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                 </button>
                 <h1 className="text-2xl font-black text-primary">Strength Log</h1>
                 <div className="w-16"></div>
            </div>

            <div className="flex-grow space-y-4">
                {exercises.map((ex, exIndex) => (
                    <div key={exIndex} className="bg-surface p-4 rounded-lg">
                        <h2 className="text-xl font-bold text-primary mb-3">{ex.name}</h2>
                        <div className="space-y-2">
                        {ex.sets.map((set, setIndex) => {
                            const isPending = set.status === 'pending';
                            const isActive = set.status === 'active';
                            const isCompleted = set.status === 'completed';

                            return (
                                <div key={setIndex} className="flex items-center space-x-2 text-sm">
                                    <span className="font-bold text-secondary w-10">Set {setIndex + 1}</span>
                                    <input type="number" value={set.weight} onChange={e => updateSet(exIndex, setIndex, { weight: Number(e.target.value) })} disabled={!isActive} className="w-16 bg-background p-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-surface disabled:text-secondary" />
                                    <span className="text-secondary">kg</span>
                                    <input type="number" value={set.reps} onChange={e => updateSet(exIndex, setIndex, { reps: Number(e.target.value) })} disabled={!isActive} className="w-16 bg-background p-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-surface disabled:text-secondary" />
                                    <span className="text-secondary">reps</span>
                                    
                                    {isPending && <button onClick={() => updateSet(exIndex, setIndex, { status: 'active' })} className="ml-auto px-3 py-1 bg-primary text-background text-xs font-bold rounded-md hover:bg-accent">START</button>}
                                    {isActive && <button onClick={() => updateSet(exIndex, setIndex, { status: 'completed' })} className="ml-auto px-3 py-1 bg-yellow-400 text-background text-xs font-bold rounded-md">END SET</button>}
                                    {isCompleted && <div className="ml-auto text-green-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>}
                                </div>
                            );
                        })}
                        </div>
                    </div>
                ))}

                {isAddingExercise ? (
                    <AddExerciseSelection onAdd={handleAddExercise} />
                ) : (
                    <button onClick={() => setIsAddingExercise(true)} className="w-full mt-4 px-4 py-3 bg-surface border-2 border-dashed border-secondary text-secondary font-bold rounded-lg hover:border-primary hover:text-primary transition-colors">
                        Add Another Exercise
                    </button>
                )}
            </div>

            <div className="mt-auto pt-6 flex-shrink-0">
                <button 
                    onClick={() => setShowEndConfirmation(true)} 
                    className="w-full px-4 py-3 bg-red-600/20 text-red-400 font-bold rounded-lg hover:bg-red-600/40 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={exercises.length === 0}
                >
                    Finish Workout
                </button>
            </div>
        </div>
    );
};

export default WorkoutLogger;
