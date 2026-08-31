import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function FinalCelebration({ name, onReplay }) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <section className="experience-screen">
      <div className="eyebrow">CELEBRATION 🥳</div>
      <h1>Have the Happiest Birthday, {name}! 💖</h1>
      <p>
        May this year bring you all the joy, success, and love
        in the world.
      </p>

      <button className="btn btn-primary" onClick={onReplay}>
        Replay Experience ↺
      </button>
    </section>
  );
}
