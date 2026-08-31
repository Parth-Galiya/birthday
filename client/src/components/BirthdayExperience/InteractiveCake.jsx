import { useState } from 'react';

export default function InteractiveCake({ theme, onDone }) {
  const [blown, setBlown] = useState(false);

  return (
    <section className="experience-screen">
      <div className="eyebrow">MAKE A WISH 🎂</div>
      <h2>
        {blown
          ? 'Wish Made! ✨'
          : 'Click the candle to blow it out!'}
      </h2>

      <div
        className="cake-display"
        onClick={() => setBlown(true)}
        style={{
          cursor: 'pointer',
          fontSize: '5rem',
          margin: '1.5rem 0',
        }}
      >
        <div className={`candle ${blown ? 'blown' : ''}`}>
          {!blown && <span style={{ fontSize: '2rem' }}>🔥</span>}
        </div>
        <div className={`cake-body ${theme}`}>🎂</div>
      </div>

      {blown && (
        <button
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          onClick={onDone}
        >
          Continue ✨
        </button>
      )}
    </section>
  );
}
