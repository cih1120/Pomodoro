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
    case TimeDashboardActionTypes.TOGGLE_RUNNING: {
      return produce(state, (draft) => {
        draft.isRunning = !state.isRunning;
      });
    }
    default:
      return state;
  }
}
