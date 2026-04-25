"use client";

import { useState, useEffect } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  totalSeconds: number;
}

export function useCountdown(targetDate: string): CountdownValues {
  const calculate = (): CountdownValues => {
    const now = Date.now();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, totalSeconds: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, isPast: false, totalSeconds };
  };

  const [values, setValues] = useState<CountdownValues>(calculate);

  useEffect(() => {
    const timer = setInterval(() => {
      setValues(calculate());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return values;
}
