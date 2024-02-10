"use client";
import { createContext, useContext, useReducer } from "react";
import timeDashboardReducer from "./reducer";
import { ITimeDashboardState, TimeDashboardAction } from "./type";

const TimeDashboardState: ITimeDashboardState = {
  mode: "focus",
  task: null,
  isActive: false,
};

const TimeDashboardContext = createContext<{
  state: ITimeDashboardState;
  dispatch: React.Dispatch<TimeDashboardAction>;
}>({
  state: TimeDashboardState,
  dispatch: () => undefined,
});

const TimeDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(timeDashboardReducer, TimeDashboardState);

  return (
    <TimeDashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeDashboardContext.Provider>
  );
};

export default TimeDashboardProvider;
export const useTimeDashboard = () => useContext(TimeDashboardContext);
