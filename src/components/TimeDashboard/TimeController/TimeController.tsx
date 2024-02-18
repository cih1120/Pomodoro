import React, { MouseEventHandler } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/src/utils";
import { TimeDashboardActionTypes } from "@/src/providers/TimeDashboard/type";
import { useTimeDashboard } from "@/src/providers/TimeDashboard";

const TimeController = () => {
  const { state, dispatch } = useTimeDashboard();
  const { isRunning, mode } = state;

  const handleStart = () => {
    dispatch({ type: TimeDashboardActionTypes.TOGGLE_RUNNING });
  };

  const handleRestart = () => {
    dispatch({ type: TimeDashboardActionTypes.TOGGLE_RUNNING });
  };

  const handlePause = () => {};

  return (
    <div className="flex gap-1">
      <ControllerButton onClick={isRunning ? handlePause : handleStart} />
      {isRunning && (
        <button onClick={handleRestart} className="p-3 text-lg font-semibold text-compared-100">
          Restart
        </button>
      )}
    </div>
  );
};

const ControllerButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const { state, dispatch } = useTimeDashboard();
  const { isRunning, mode, modeName } = state;

  const buttonVariants = cva(
    "w-full rounded-lg px-1 py-3 text-center font-garamond text-[25px] font-extrabold text-white italic transition",
    {
      variants: {
        variant: {
          default: "shadow-normal",
          isRunning: "",
        },
        mode: {
          focus: "bg-cherry-200 hover:bg-cherry-300",
          shortBreak: "bg-green-200 hover:bg-green-300",
          longBreak: "bg-brown-200 hover:bg-brown-300",
        },
      },
      defaultVariants: {
        variant: "default",
        mode: "focus",
      },
    },
  );

  const className = cn(buttonVariants({ mode, variant: isRunning ? "isRunning" : "default" }));

  return (
    <button onClick={onClick} className={className}>
      {isRunning ? "Pause" : `Start ${modeName[mode]}`}
    </button>
  );
};

export default TimeController;
