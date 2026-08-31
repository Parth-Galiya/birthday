import { useEffect, useState } from 'react';

export function useCountdown(date) {
  const calculate = () => {
    if (!date) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    }

    const target = new Date(date).getTime();
    const diff = Math.max(0, target - Date.now());

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      minutes: Math.floor(diff / 60000) % 60,
      seconds: Math.floor(diff / 1000) % 60,
      done: diff <= 0,
    };
  };

  const [value, setValue] = useState(calculate);

  useEffect(() => {
    setValue(calculate());
    if (!date) return;

    const timer = setInterval(() => setValue(calculate()), 1000);
    return () => clearInterval(timer);
  }, [date]);

  return value;
}
