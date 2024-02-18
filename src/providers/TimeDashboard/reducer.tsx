import { produce } from "immer";
import { ITimeDashboardState } from "./type";
import { TimeDashboardAction, TimeDashboardActionTypes } from "./type";

export default function timeDashboardReducer(
  state: ITimeDashboardState,
  action: TimeDashboardAction,
) {
  switch (action.type) {
    case TimeDashboardActionTypes.SET_MODE: {
      return produce(state, (draft) => {
        draft.mode = action.payload;
      });
    }
    case TimeDashboardActionTypes.SET_TASK: {
      return produce(state, (draft) => {
        draft.task = action.payload;
      });
    }
    case TimeDashboardActionTypes.SET_START: {
      return produce(state, (draft) => {
        draft.isRunning = true;
        draft.isPausing = false;
      });
    }
    case TimeDashboardActionTypes.SET_RESTART: {
      return produce(state, (draft) => {
        draft.isRunning = false;
        draft.isPausing = false;
      });
    }
    case TimeDashboardActionTypes.TOGGLE_PAUSE: {
      return produce(state, (draft) => {
        draft.isPausing = !state.isPausing;
      });
    }
    case TimeDashboardActionTypes.TOGGLE_RUNNING: {
      return produce(state, (draft) => {
        draft.isRunning = !state.isRunning;
      });
    }
    default:
      return state;
  }
}
