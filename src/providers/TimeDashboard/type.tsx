export interface ITimeDashboardState {
  mode: TimeDashboardModeType;
  task: string | null;
  isRunning: boolean;
  modeName: {
    [K in TimeDashboardModeType]: string;
  };
  timer: {
    [K in TimeDashboardModeType]: number;
  };
}

export type TimeDashboardModeType = "focus" | "shortBreak" | "longBreak";

export enum TimeDashboardActionTypes {
  SET_MODE = "SET_MODE",
  SET_TASK = "SET_TASK",
  TOGGLE_RUNNING = "TOGGLE_RUNNING",
}

export type TimeDashboardAction =
  | { type: TimeDashboardActionTypes.SET_MODE; payload: TimeDashboardModeType }
  | { type: TimeDashboardActionTypes.SET_TASK; payload: string | null }
  | { type: TimeDashboardActionTypes.TOGGLE_RUNNING };
