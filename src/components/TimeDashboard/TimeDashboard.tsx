"use client";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/src/utils";
import TimeDashboardProvider, { useTimeDashboard } from "@/src/providers/TimeDashboard";
import {
  TimeDashboardActionTypes,
  TimeDashboardModeType,
} from "@/src/providers/TimeDashboard/type";
import TaskName from "./TaskName";
import ProgressBar from "./ProgressBar";
import TimeController from "./TimeController";

const TimeDashboard = () => {
  return (
    <TimeDashboardProvider>
      <div className="shadow-normal inline-flex flex-col items-center gap-7 border border-compared-200 bg-white bg-opacity-30 p-10">
        <ModeSwitcher />
        <div className="flex flex-col gap-1">
          <TaskName />
          <ProgressBar />
          <TimeController />
        </div>
      </div>
    </TimeDashboardProvider>
  );
};

export default TimeDashboard;

const ModeSwitcher = () => {
  const { state, dispatch } = useTimeDashboard();
  const { modeName, isRunning } = state;

  const handleMode = (mode: TimeDashboardModeType) => {
    dispatch({ type: TimeDashboardActionTypes.SET_MODE, payload: mode });
  };

  const activeClass = (value: TimeDashboardModeType): ClassNameValue => {
    return value === state.mode ? "font-black" : "font-medium";
  };

  const modesArray: TimeDashboardModeType[] = ["focus", "shortBreak", "longBreak"];
  return (
    <ul className="flex gap-8">
      {modesArray.map((value) => {
        return (
          <li key={value}>
            <button
              onClick={() => handleMode(value)}
              disabled={isRunning}
              className={cn("text-lg text-compared-100 disabled:opacity-40", activeClass(value))}
            >
              {modeName[value]}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
