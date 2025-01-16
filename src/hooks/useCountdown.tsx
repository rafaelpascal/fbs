import { useState, useEffect } from "react";

interface CountdownHook {
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
  isActive: boolean;
}

const useCountdown = (initialSeconds = 60): CountdownHook => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, seconds]);

  const startCountdown = () => setIsActive(true);
  const resetCountdown = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  return { seconds, startCountdown, resetCountdown, isActive };
};

export default useCountdown;
