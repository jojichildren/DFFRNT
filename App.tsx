import React, { useState, useEffect, useCallback } from 'react';
import { Mode, Task, History, WorkoutExercise } from './types';
import { ALL_TASKS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import WakeUpScreen from './components/WakeUpScreen';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import ExerciseScreen from './components/ExerciseScreen';
import GoodNightScreen from './components/GoodNightScreen';
import PreNightRoutineScreen from './components/PreNightRoutineScreen';
import Icon from './components/Icon';
import type { IconProps } from './components/Icon';

type Screen = 'routine' | 'meal' | 'exercise' | 'settings';
type AppState = 'asleep' | 'awake';

const getTodayDateString = (): string => new Date().toISOString().split('T')[0];

const generateDailyTasks = (mode: Mode): Task[] => {
  return ALL_TASKS
    .filter(task => task.modes.includes(mode))
    .sort((a, b) => a.priority - b.priority);
};

interface NavButtonProps {
    label: string;
    icon: IconProps['name'];
    isActive: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon, isActive, onClick }) => (
    <button 
        onClick={onClick} 
        className={`flex flex-col items-center justify-center w-full h-full rounded-lg transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
    >
        <Icon name={icon} className="w-6 h-6 mb-1" />
        <span className="text-xs font-bold">{label}</span>
    </button>
);

const App: React.FC = () => {
  const [mode, setMode] = useLocalStorage<Mode>('dffrnt-mode', Mode.NORMAL);
  const [history, setHistory] = useLocalStorage<History>('dffrnt-history', {});
  const [appState, setAppState] = useState<AppState>('awake');
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [currentScreen, setCurrentScreen] = useState<Screen>('routine');
  const [hasStartedNightRoutine, setHasStartedNightRoutine] = useLocalStorage('dffrnt-night-started', false);
  
  useEffect(() => {
    const todayStr = getTodayDateString();
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const todaysHistory = history[todayStr];
    const yesterdayHistory = history[yesterdayStr];

    if ((yesterdayHistory?.sleepStartTime && !yesterdayHistory?.sleepEndTime) ||
        (todaysHistory?.sleepStartTime && !todaysHistory?.sleepEndTime)) {
      setAppState('asleep');
    } else {
      setAppState('awake');
    }

    if (!todaysHistory) {
      const tasks = generateDailyTasks(mode);
      setHistory(prev => ({
        ...prev,
        [todayStr]: {
            completedTasks: [],
            totalTasks: tasks.length,
            mode: mode,
        }
      }));
      setDailyTasks(tasks);
      setHasStartedNightRoutine(false);
    } else {
       if(todaysHistory.mode !== mode) {
        const newTasks = generateDailyTasks(mode);
        setDailyTasks(newTasks);
        setHistory(prev => ({
          ...prev,
          [todayStr]: { ...todaysHistory, totalTasks: newTasks.length, completedTasks: [], mode: mode, workoutLog: todaysHistory.workoutLog || [] }
        }));
        setHasStartedNightRoutine(false);
      } else {
        setDailyTasks(generateDailyTasks(todaysHistory.mode));
      }
    }
  }, [mode, history, setHistory, setHasStartedNightRoutine]);

  const handleGoodNight = useCallback((targetWakeupTime: string) => {
    const today = getTodayDateString();
    setHistory(prev => ({
      ...prev,
      [today]: {
        ...prev[today],
        sleepStartTime: Date.now(),
        targetWakeupTime,
      }
    }));
  }, [setHistory]);

  const handleAwaken = useCallback(() => {
    const findEntryToAwaken = () => {
        const today = getTodayDateString();
        if (history[today]?.sleepStartTime && !history[today]?.sleepEndTime) return today;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (history[yesterdayStr]?.sleepStartTime && !history[yesterdayStr]?.sleepEndTime) return yesterdayStr;

        return today;
    }
    
    const dateToUpdate = findEntryToAwaken();

    setHistory(prev => ({
      ...prev,
      [dateToUpdate]: {
        ...prev[dateToUpdate],
        sleepEndTime: Date.now(),
      }
    }));

    const today = getTodayDateString();
    if (!history[today]) {
         const tasks = generateDailyTasks(mode);
         setDailyTasks(tasks);
         setHistory(prev => ({
            ...prev,
            [today]: {
                completedTasks: [],
                totalTasks: tasks.length,
                mode: mode,
            }
         }));
    }
    
    setHasStartedNightRoutine(false);
    setAppState('awake');
    setCurrentScreen('routine');
  }, [mode, setHistory, history, setHasStartedNightRoutine]);

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setCurrentScreen('routine');
  }, [setMode]);

  const handleCompleteTask = useCallback((taskId: number) => {
    const today = getTodayDateString();
    setHistory(prev => {
      const todaysHistory = prev[today];
      if (todaysHistory && !todaysHistory.completedTasks.includes(taskId)) {
        return {
          ...prev,
          [today]: {
            ...todaysHistory,
            completedTasks: [...todaysHistory.completedTasks, taskId]
          }
        };
      }
      return prev;
    });
  }, [setHistory]);

  const handleSaveWorkoutLog = useCallback((log: WorkoutExercise[]) => {
    const today = getTodayDateString();
    setHistory(prev => {
      const todaysHistory = prev[today];
      if (todaysHistory) {
        return {
          ...prev,
          [today]: {
            ...todaysHistory,
            workoutLog: log,
          },
        };
      }
      return prev;
    });
    const strengthTaskIds = dailyTasks
        .filter(t => t.category === 'exercise' && t.subCategory === 'strength')
        .map(t => t.id);
    strengthTaskIds.forEach(id => handleCompleteTask(id));
  }, [setHistory, dailyTasks, handleCompleteTask]);

  if (appState === 'asleep') {
    return <WakeUpScreen onAwaken={handleAwaken} />;
  }

  const today = getTodayDateString();
  const completedTaskIds = history[today]?.completedTasks || [];
  
  const renderScreen = () => {
    switch(currentScreen) {
      case 'routine': {
        const nightTasks = dailyTasks.filter(t => t.subCategory === 'night');
        const allNightTasksCompleted = nightTasks.length > 0 && nightTasks.every(t => completedTaskIds.includes(t.id));

        // Night phase logic
        if (!history[today]?.sleepStartTime) {
            if (allNightTasksCompleted) {
                return <GoodNightScreen onGoodNight={handleGoodNight} />;
            }
            if (!hasStartedNightRoutine) {
                return <PreNightRoutineScreen onStart={() => setHasStartedNightRoutine(true)} />;
            }
        }
        
        const tasksToShow = history[today]?.sleepStartTime 
            ? dailyTasks.filter(t => t.subCategory === 'morning') // Woke up, show morning
            : dailyTasks.filter(t => t.subCategory === 'night' || !t.subCategory); // Not yet slept, show night

        const categoryName = history[today]?.sleepStartTime ? 'モーニングルーティン' : 'ナイトルーティン';

        return (
          <HomeScreen
            key={categoryName}
            tasks={tasksToShow}
            completedTaskIds={completedTaskIds}
            onCompleteTask={handleCompleteTask}
            history={history}
            categoryName={categoryName}
            allDailyTasks={dailyTasks}
          />
        );
      }
      case 'meal': {
        const tasksForScreen = dailyTasks.filter(task => task.category === 'meal');
        return (
          <HomeScreen
            key={currentScreen}
            tasks={tasksForScreen}
            completedTaskIds={completedTaskIds}
            onCompleteTask={handleCompleteTask}
            history={history}
            categoryName={'食事'}
            allDailyTasks={dailyTasks}
          />
        );
      }
      case 'exercise':
        return (
            <ExerciseScreen
                dailyTasks={dailyTasks}
                completedTaskIds={completedTaskIds}
                onCompleteTask={handleCompleteTask}
                history={history}
                onSaveWorkoutLog={handleSaveWorkoutLog}
            />
        );
      case 'settings':
        return <SettingsScreen currentMode={mode} onModeChange={handleModeChange} />;
      default:
        return null;
    }
  };

  const navItems: { screen: Screen; label: string; icon: IconProps['name'] }[] = [
    { screen: 'routine', label: '睡眠', icon: 'sleep' },
    { screen: 'meal', label: '食事', icon: 'meal' },
    { screen: 'exercise', label: '運動', icon: 'exercise' },
    { screen: 'settings', label: '設定', icon: 'settings' },
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background text-primary overflow-hidden">
      <main className="flex-grow overflow-y-auto min-h-0">
        {renderScreen()}
      </main>

      <nav className="flex-shrink-0 bg-surface w-full">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto">
          {navItems.map((item) => (
            <NavButton
                key={item.screen}
                label={item.label}
                icon={item.icon}
                isActive={currentScreen === item.screen}
                onClick={() => setCurrentScreen(item.screen)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;