export interface ITimeDashboardState {
  mode: TimeDashboardModeType;
  task: string | null;
  isActive: boolean;
}

export type TimeDashboardModeType = "focus" | "shortBreak" | "longBreak";

export enum TimeDashboardActionTypes {
  SET_MODE = "SET_MODE",
  SET_TASK = "SET_TASK",
  TOGGLE_ACTIVE = "TOGGLE_ACTIVE",
}

export type TimeDashboardAction =
  | { type: TimeDashboardActionTypes.SET_MODE; payload: TimeDashboardModeType }
  | { type: TimeDashboardActionTypes.SET_TASK; payload: string | null }
  | { type: TimeDashboardActionTypes.TOGGLE_ACTIVE };
