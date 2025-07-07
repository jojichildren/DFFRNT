import React, { useState } from 'react';
import { Task, History, WorkoutExercise } from '../types';
import HomeScreen from './HomeScreen';
import WorkoutLogger from './WorkoutLogger';

interface ExerciseScreenProps {
  dailyTasks: Task[];
  completedTaskIds: number[];
  onCompleteTask: (taskId: number) => void;
  history: History;
  onSaveWorkoutLog: (log: WorkoutExercise[]) => void;
}

type ExerciseView = 'selection' | 'strength-confirm' | 'cardio-tasks' | 'logging-workout';

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ dailyTasks, completedTaskIds, onCompleteTask, history, onSaveWorkoutLog }) => {
  const [view, setView] = useState<ExerciseView>('selection');

  const exerciseTasks = dailyTasks.filter(task => task.category === 'exercise');
  const strengthTasks = exerciseTasks.filter(task => task.subCategory === 'strength');
  const strengthTasksCompleted = strengthTasks.length > 0 && strengthTasks.every(t => completedTaskIds.includes(t.id));

  const renderTaskScreen = (subCategory: 'cardio') => {
    const tasksForSelection = exerciseTasks.filter(task => task.subCategory === subCategory);
    const categoryName = 'ランニング';

    return (
      <div className="h-full flex flex-col animate-fade-in">
        <div className="p-6 pt-6 pb-2 flex-shrink-0">
          <button
            onClick={() => setView('selection')}
            className="text-secondary hover:text-primary transition-colors duration-200 flex items-center text-sm font-bold"
            aria-label="運動選択に戻る"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            選択に戻る
          </button>
        </div>
        <div className="flex-grow min-h-0">
          <HomeScreen
            key={subCategory}
            tasks={tasksForSelection}
            completedTaskIds={completedTaskIds}
            onCompleteTask={onCompleteTask}
            history={history}
            categoryName={categoryName}
            allDailyTasks={dailyTasks}
          />
        </div>
      </div>
    );
  };
  
  if (strengthTasksCompleted && view !== 'selection') {
     setView('selection'); // Force back to selection if tasks get completed
  }
  
  if (view === 'logging-workout') {
    return <WorkoutLogger onFinish={() => setView('selection')} onSaveLog={onSaveWorkoutLog} />;
  }

  if (view === 'cardio-tasks') {
    return renderTaskScreen('cardio');
  }

  if (view === 'strength-confirm') {
    return (
      <div className="p-6 animate-fade-in flex flex-col items-center justify-center h-full text-center">
        <p className="text-xl text-primary mb-12 max-w-md">
          プレワークアウトを飲み、筋トレで限界まで追い込む覚悟はできたか？
        </p>
        <button
          onClick={() => setView('logging-workout')}
          className="w-48 h-48 rounded-full bg-primary text-background font-bold text-3xl tracking-widest flex items-center justify-center animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105"
        >
          START
        </button>
        <button
            onClick={() => setView('selection')}
            className="mt-6 text-secondary font-bold tracking-widest hover:text-primary transition-colors duration-200"
        >
            戻る
        </button>
      </div>
    );
  }

  // Selection UI ('selection' view)
  return (
    <div className="p-6 animate-fade-in flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-black text-primary mb-2 text-center">運動を選択</h1>
      <p className="text-secondary mb-12 text-center">今日、どの山を登る？</p>
      <div className="w-full max-w-sm space-y-6">
        <button
          onClick={() => setView('strength-confirm')}
          className={`w-full p-8 bg-surface rounded-lg border-2  hover:border-primary focus:border-primary focus:outline-none transition-all duration-200 text-left relative ${strengthTasksCompleted ? 'border-green-500' : 'border-surface'}`}
          aria-label="筋トレを選択"
          disabled={strengthTasksCompleted}
        >
          {strengthTasksCompleted && (
              <div className="absolute top-3 right-3 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </div>
          )}
          <div>
            <span className={`font-bold text-2xl ${strengthTasksCompleted ? 'text-secondary' : 'text-primary'}`}>筋トレ</span>
            <p className="text-secondary mt-1">{strengthTasksCompleted ? '完了' : '鋼の肉体と精神を鍛え上げる。'}</p>
          </div>
        </button>
        <button
          onClick={() => setView('cardio-tasks')}
          className="w-full p-8 bg-surface rounded-lg border-2 border-surface hover:border-primary focus:border-primary focus:outline-none transition-all duration-200 text-left"
          aria-label="ランニングを選択"
        >
          <div>
            <span className="font-bold text-2xl text-primary">ランニング</span>
            <p className="text-secondary mt-1">心肺機能を高め、持久力を養う。</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ExerciseScreen;