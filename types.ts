
export enum Mode {
  NORMAL = 'NORMAL',
  MONK = 'MONK',
  BULK_UP = 'BULK_UP',
  CUTTING = 'CUTTING',
}

export type WorkoutCategory = 'push' | 'pull' | 'leg';

export type TaskCategory = 'routine' | 'meal' | 'exercise';

export interface Task {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  priority: number;
  modes: Mode[];
  category: TaskCategory;
  subCategory?: 'strength' | 'cardio' | 'morning' | 'night';
}

export interface WorkoutSet {
  weight: number;
  reps: number;
  status: 'pending' | 'active' | 'completed';
}

export interface WorkoutExercise {
  name: string;
  sets: WorkoutSet[];
}

export interface HistoryEntry {
  wakeupTime?: number; // Kept for potential legacy data, but sleepEndTime is preferred
  completedTasks: number[]; // array of task ids
  totalTasks: number;
  mode: Mode;
  workoutLog?: WorkoutExercise[];
  sleepStartTime?: number;
  sleepEndTime?: number;
  targetWakeupTime?: string; // Stored as HH:mm string
}

export interface History {
  [date: string]: HistoryEntry;
}
