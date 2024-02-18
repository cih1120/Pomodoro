export interface ITimeDashboardState {
  mode: TimeDashboardModeType;
  task: string | null;
  isRunning: boolean;
  isPausing: boolean;
  modeName: {
    [K in TimeDashboardModeType]: string;
  };
  timerDurations: {
    [K in TimeDashboardModeType]: number;
  };
}

export type TimeDashboardModeType = "focus" | "shortBreak" | "longBreak";

export enum TimeDashboardActionTypes {
  SET_MODE = "SET_MODE",
  SET_TASK = "SET_TASK",
  SET_START = "SET_START",
  SET_RESTART = "SET_RESTART",
  TOGGLE_PAUSE = "TOGGLE_PAUSE",
  TOGGLE_RUNNING = "TOGGLE_RUNNING",
}

export type TimeDashboardAction =
  | { type: TimeDashboardActionTypes.SET_MODE; payload: TimeDashboardModeType }
  | { type: TimeDashboardActionTypes.SET_TASK; payload: string | null }
  | { type: TimeDashboardActionTypes.SET_START }
  | { type: TimeDashboardActionTypes.SET_RESTART }
  | { type: TimeDashboardActionTypes.TOGGLE_PAUSE }
  | { type: TimeDashboardActionTypes.TOGGLE_RUNNING };
