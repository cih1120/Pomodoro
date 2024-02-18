import { useEffect, useRef, useState } from "react";
import { useTimeDashboard } from "@/src/providers/TimeDashboard";
import { TimeDashboardActionTypes } from "@/src/providers/TimeDashboard/type";

export const useTimer = () => {
  const { state, dispatch } = useTimeDashboard();
  const { isRunning, isPausing, mode, timerDurations } = state;

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const konamiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const progressPercentage = Math.min((remainingSeconds / state.timerDurations[mode]) * 100, 100);
  // Speed multiplier is adjusted when the Konami code is entered
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1000);

  // Initializes or resets the timer with default settings
  const initializeTimer = () => {
    setSpeedMultiplier(1000);
    setRemainingSeconds(timerDurations[mode]);
  }

  // Handles the completion of the timer, resetting the speed multiplier and stopping the timer
  const handleTimerCompletion = () => {
    setSpeedMultiplier(1000);
    dispatch({ type: TimeDashboardActionTypes.TOGGLE_RUNNING });
    clearInterval(timerIdRef.current as NodeJS.Timeout);
  }

  // Starts the timer, using the speed multiplier to adjust the interval speed
  const startTimer = () => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
    }
    timerIdRef.current = setInterval(() => {
      if (remainingSeconds < 0) {
        handleTimerCompletion();
      }
      setRemainingSeconds(prev => prev - 1);
    }, speedMultiplier);
  }

  // Resets the timer when the app is initialized or the mode changes
  useEffect(() => {
    if (!isRunning) {
      initializeTimer();
    }
  }, [isRunning, mode]);

  // Listens for changes to isRunning or isPausing to start or reset the timer
  useEffect(() => {
    if (isRunning && !isPausing) {
      startTimer();
    } else {
      clearInterval(timerIdRef.current as NodeJS.Timeout);
    }

    return () => clearInterval(timerIdRef.current as NodeJS.Timeout);
  }, [isRunning, isPausing, speedMultiplier, remainingSeconds]);

  // Konami Code !
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let index = 0;

    const resetKonamiTimeout = () => {
      if (konamiTimeoutRef.current) {
        clearTimeout(konamiTimeoutRef.current);
      }
      konamiTimeoutRef.current = setTimeout(() => {
        index = 0;
      }, 10000); // 10-second limit for completing the input sequence
    }

    const handler = (event: KeyboardEvent) => {
      resetKonamiTimeout();
      if (event.code === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          setSpeedMultiplier(10); // Changes the speed multiplier upon successful code entry
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      if (konamiTimeoutRef.current) {
        clearTimeout(konamiTimeoutRef.current);
      }
    };
  }, []);

  return { remainingSeconds, progressPercentage }
}