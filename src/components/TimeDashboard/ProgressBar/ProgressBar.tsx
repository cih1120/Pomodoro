import { useEffect, useMemo, useState } from "react";
import { useTimeDashboard } from "@/src/providers/TimeDashboard";
import { cn } from "@/src/utils";
import { cva } from "class-variance-authority";

const ProgressBar = () => {
  const { state, dispatch } = useTimeDashboard();
  const { isRunning, mode } = state;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const progressPercentage = Math.min((elapsedSeconds / state.timer[mode]) * 100, 100);

  useEffect(() => {
    setElapsedSeconds(state.timer[mode]);
  }, [mode]);

  return (
    <div className="relative">
      <ProgressCircle percent={progressPercentage} />
      <p
        className={cn([
          isRunning ? "text-compared-200" : "text-compared-100",
          "absolute-center text-5xl font-black",
        ])}
      >
        {Math.floor(elapsedSeconds / 60)} : {elapsedSeconds % 60}
      </p>
    </div>
  );
};

const ProgressCircle = ({ percent }: { percent: number }) => {
  const { state, dispatch } = useTimeDashboard();
  const { mode } = state;

  const circumference = useMemo(() => {
    return 110 * 2 * Math.PI;
  }, []);
  const setProgress = useMemo(() => {
    return circumference - (percent / 100) * circumference;
  }, [percent, circumference]);

  const progressBarVariants = cva("origin-center translate-x-[-6px] translate-y-[6px] -rotate-90", {
    variants: {
      progress: {
        "100": "opacity-100",
        "<50": "opacity-95",
        "<10": "opacity-85",
      },
      mode: {
        focus: "text-cherry-200",
        shortBreak: "text-green-200",
        longBreak: "text-brown-200",
      },
    },
    defaultVariants: {
      progress: "100",
      mode: "focus",
    },
  });

  return (
    <svg className="relative h-[260px] w-[260px]">
      <circle
        className="text-gray-30 origin-center translate-x-[10px] translate-y-[10px]"
        strokeWidth="5"
        stroke="currentColor"
        fill="transparent"
        r="110"
        cx="120"
        cy="120"
      />
      <circle
        className="origin-center translate-x-[-20px] translate-y-[20px] -rotate-90 text-compared-200"
        strokeWidth="20"
        strokeDasharray={circumference}
        strokeDashoffset={setProgress}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="110"
        cx="150"
        cy="150"
      />
      <circle
        className={cn(
          progressBarVariants({
            mode,
            progress: circumference > 50 ? "100" : circumference > 10 ? "<50" : "<10",
          }),
        )}
        strokeWidth="18"
        strokeDasharray={circumference}
        strokeDashoffset={setProgress}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="110"
        cx="136"
        cy="136"
      />
    </svg>
  );
};

export default ProgressBar;
