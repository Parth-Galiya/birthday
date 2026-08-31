import { useState } from 'react';

export default function BalloonReasons({ reasons = [], onDone }) {
  const [popped, setPopped] = useState([]);

  const pop = (idx) => {
    if (!popped.includes(idx)) {
      setPopped([...popped, idx]);
    }
  };

  return (
    <section className="experience-screen">
      <div className="eyebrow">WHY YOU'RE SPECIAL 🎈</div>
      <h2>Pop the balloons to reveal messages:</h2>

      <div className="balloon-grid">
        {reasons.map((r, i) => (
          <div
            key={i}
            className={`balloon-card ${
              popped.includes(i) ? 'popped' : ''
            }`}
            onClick={() => pop(i)}
          >
            {popped.includes(i) ? (
              <span>{r}</span>
            ) : (
              <span>🎈 Pop Me!</span>
            )}
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary"
        style={{ marginTop: '1.5rem' }}
        onClick={onDone}
      >
        See Memories 📸
      </button>
    </section>
  );
}
