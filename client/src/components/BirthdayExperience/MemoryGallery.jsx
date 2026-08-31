import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MemoryGallery({ photos = [], onDone }) {
  const [i, setI] = useState(0);

  if (!photos.length) {
    return (
      <section className="experience-screen">
        <div className="eyebrow">MEMORIES</div>
        <h2>
          There are no photos here yet, but the memory still counts. ❤️
        </h2>
        <button className="btn btn-primary" onClick={onDone}>
          Continue →
        </button>
      </section>
    );
  }

  const p = photos[i];

  return (
    <section className="experience-screen gallery-screen">
      <div className="eyebrow">OUR LITTLE MEMORIES 📸</div>
      <h2>A few moments worth keeping.</h2>

      <div className="polaroid">
        <img
          src={p.url || p}
          alt={p.caption || `Memory ${i + 1}`}
        />
        <p>{p.caption || 'A moment worth remembering.'}</p>
      </div>

      <div className="gallery-controls">
        <button
          onClick={() =>
            setI((i - 1 + photos.length) % photos.length)
          }
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>

        <span>
          {String(i + 1).padStart(2, '0')} /{' '}
          {String(photos.length).padStart(2, '0')}
        </span>

        <button
          onClick={() => setI((i + 1) % photos.length)}
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      </div>

      <button
        className="btn btn-primary"
        style={{ marginTop: '1rem' }}
        onClick={onDone}
      >
        {i === photos.length - 1
          ? 'One last thing 💌'
          : 'Continue →'}
      </button>
    </section>
  );
}
