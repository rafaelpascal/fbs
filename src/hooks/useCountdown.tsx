import { useState, useEffect } from "react";

interface CountdownHook {
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
  isActive: boolean;
}

const useCountdown = (
  initialMinutes: number = 1,
  initialSeconds: number = 0,
  onCountdownEnd?: () => void
): CountdownHook => {
  const [totalSeconds, setTotalSeconds] = useState<number>(
    initialMinutes * 60 + initialSeconds
  );
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isActive && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      setIsActive(false);
      onCountdownEnd?.(); // Trigger the callback when time reaches 0
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, totalSeconds, onCountdownEnd]);

  const startCountdown = () => setIsActive(true);
  const resetCountdown = () => {
    setIsActive(false);
    setTotalSeconds(initialMinutes * 60 + initialSeconds);
  };

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { minutes, seconds, startCountdown, resetCountdown, isActive };
};

export default useCountdown;
