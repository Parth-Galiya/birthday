import { useState, useRef, useEffect } from 'react';

export function useSound() {
  const [enabled, setEnabled] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Loads birthday.mp3 from the public/ folder
    audioRef.current = new Audio('/birthday.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTone = () => {};
  const playPop = () => {};
  const playBlow = () => {};

  const startCelebrationMusic = () => {
    if (audioRef.current && enabled) {
      audioRef.current.play().catch(() => {});
    }
  };

  const stopCelebrationMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (!enabled && audioRef.current) {
      audioRef.current.pause();
    }
  }, [enabled]);

  return {
    enabled,
    setEnabled,
    playTone,
    playPop,
    playBlow,
    startCelebrationMusic,
    stopCelebrationMusic,
  };
}