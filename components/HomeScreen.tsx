import React from 'react';
import { Task, History } from '../types';
import Dashboard from './Dashboard';

interface HomeScreenProps {
  tasks: Task[];
  completedTaskIds: number[];
  onCompleteTask: (taskId: number) => void;
  history: History;
  categoryName: string;
  allDailyTasks: Task[];
}

interface TaskViewProps {
    task: Task;
    taskNumber: number;
    totalTasks: number;
    onCompleteTask: (taskId: number) => void;
    onSkipTask: (taskId: number) => void;
}

const TaskView: React.FC<TaskViewProps> = ({ task, taskNumber, totalTasks, onCompleteTask, onSkipTask }) => {
    const [taskState, setTaskState] = React.useState<'start' | 'complete'>('start');

    const handleStart = () => {
        setTaskState('complete');
    };

    const handleComplete = () => {
        onCompleteTask(task.id);
    };

    const handleSkip = () => {
        onSkipTask(task.id);
    };

    return (
        <div className="flex flex-col h-full p-6 animate-fade-in">
          <div className="text-center">
            <p className="text-secondary font-bold tracking-widest">
              TASK {taskNumber} / {totalTasks}
            </p>
            <h1 className="text-4xl font-black text-primary mt-2">
              {task.title}
            </h1>
            {taskState === 'start' && task.subtitle && (
              <p className="text-secondary mt-4 text-lg animate-fade-in whitespace-pre-line">
                {task.subtitle}
              </p>
            )}
          </div>
          
          <div className="flex-grow flex items-center justify-center my-8">
            <div className={`text-center transition-opacity duration-500 ${taskState === 'complete' ? 'opacity-100' : 'opacity-0 h-0'}`}>
              <p className="text-secondary text-lg whitespace-pre-line">{task.description}</p>
            </div>
          </div>
    
          <div className="mt-auto flex justify-center">
            {taskState === 'start' ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleStart}
                  className="w-48 h-48 rounded-full bg-primary text-background font-bold text-3xl tracking-widest flex items-center justify-center animate-pulse hover:animate-none transition-transform duration-300 hover:scale-105"
                >
                  START
                </button>
                <button
                  onClick={handleSkip}
                  className="mt-6 text-secondary font-bold tracking-widest hover:text-primary transition-colors duration-200"
                >
                  SKIP
                </button>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="px-12 py-4 bg-primary text-background font-bold text-2xl tracking-widest rounded-md hover:bg-accent hover:scale-105 transition-all duration-300 ease-in-out shadow-lg shadow-primary/10"
              >
                COMPLETE
              </button>
            )}
          </div>
        </div>
      );
};


const HomeScreen: React.FC<HomeScreenProps> = ({ tasks, completedTaskIds, onCompleteTask, history, categoryName, allDailyTasks }) => {
  const [skippedTaskIds, setSkippedTaskIds] = React.useState<number[]>([]);

  const handleSkipTask = (taskId: number) => {
    setSkippedTaskIds(prev => [...prev, taskId]);
  };

  const uncompletedTasks = tasks.filter(task => !completedTaskIds.includes(task.id) && !skippedTaskIds.includes(task.id));
  const currentTask = uncompletedTasks[0];
  
  if (tasks.length === 0) {
    return (
         <div className="p-6 text-center animate-fade-in">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
                <h1 className="text-3xl font-black text-primary">NO TASKS TODAY</h1>
                <p className="text-secondary mt-2 mb-8">
                  There are no '{categoryName}' tasks in your current mode.
                </p>
            </div>
        </div>
    );
  }

  if (!currentTask) {
    const isMorningRoutine = categoryName === 'モーニングルーティン';
    const title = isMorningRoutine
      ? "MORNING ROUTINES COMPLETE"
      : `${categoryName.toUpperCase()} COMPLETE`;
    const subtitle = isMorningRoutine
      ? "You've conquered all Morning tasks. Excellent."
      : `You've conquered all ${categoryName} tasks. Excellent.`;

    const routineTasks = allDailyTasks.filter(t => t.category === 'routine');
    const completedRoutineTasks = routineTasks.filter(t => completedTaskIds.includes(t.id));
    const routineCompletionRate = routineTasks.length > 0 ? Math.round((completedRoutineTasks.length / routineTasks.length) * 100) : 0;

    return (
      <div className="p-6 text-center animate-fade-in">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-8">
              <h1 className="text-5xl font-black text-primary">{title}</h1>
              <p className="text-secondary mt-2 mb-8">
                {subtitle}
              </p>
              
              {isMorningRoutine && (
                <div className="mb-8 text-center">
                    <p className="text-secondary text-sm font-bold tracking-widest uppercase mb-1">Total Routine Completion</p>
                    <p className="text-primary text-6xl font-black">{routineCompletionRate}%</p>
                </div>
              )}

              <div className="w-full max-w-lg">
                <Dashboard history={history} />
              </div>
          </div>
      </div>
    );
  }

  const completedBefore = tasks.filter(t => completedTaskIds.includes(t.id)).length;
  const taskNumber = completedBefore + skippedTaskIds.length + 1;

  return (
    <TaskView 
        key={currentTask.id}
        task={currentTask}
        taskNumber={taskNumber}
        totalTasks={tasks.length}
        onCompleteTask={onCompleteTask}
        onSkipTask={handleSkipTask}
    />
  );
};

export default HomeScreen;