import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import IntroReveal from '../components/BirthdayExperience/IntroReveal';
import BirthdayReveal from '../components/BirthdayExperience/BirthdayReveal';
import InteractiveCake from '../components/BirthdayExperience/InteractiveCake';
import BalloonReasons from '../components/BirthdayExperience/BalloonReasons';
import MemoryGallery from '../components/BirthdayExperience/MemoryGallery';
import LetterReveal from '../components/BirthdayExperience/LetterReveal';
import FinalCelebration from '../components/BirthdayExperience/FinalCelebration';
import SoundControl from '../components/common/SoundControl';
import FloatingParticles from '../components/common/FloatingParticles';
import { api } from '../services/api';
import { useCountdown } from '../hooks/useCountdown';
import { useSound } from '../hooks/useSound';

export default function BirthdayExperience() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const [data, setData] = useState(null);
  const [stage, setStage] = useState(params.get('preview') ? 1 : 0);
  const [error, setError] = useState('');
  const sound = useSound();

  const count = useCountdown(data?.birthday);

  useEffect(() => {
    api
      .getBirthday(id)
      .then((r) => setData(r.data.data))
      .catch((e) => setError(e.response?.data?.message || e.message));
  }, [id]);

  if (error) {
    return (
      <main className="experience-shell">
        <h2>Oops! The magic got tangled for a second. ✨</h2>
        <p>{error}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="experience-shell">
        <div className="loader">✦</div>
        <p>Sprinkling some birthday magic... ✨</p>
      </main>
    );
  }

  const birthdayToday = count.done;

  if (!birthdayToday && !params.get('preview')) {
    return (
      <main className="experience-shell countdown-screen">
        <FloatingParticles />
        <div className="eyebrow">A SURPRISE IS WAITING</div>
        <h1>Your surprise unlocks in...</h1>
        <div className="countdown">
          {[
            ['days', count.days],
            ['hours', count.hours],
            ['minutes', count.minutes],
            ['seconds', count.seconds],
          ].map(([k, v]) => (
            <div key={k}>
              <strong>{String(v).padStart(2, '0')}</strong>
              <span>{k}</span>
            </div>
          ))}
        </div>
        <p>
          Come back on{' '}
          {new Date(data.birthday).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
          })}{' '}
          🎂
        </p>
      </main>
    );
  }

  const handleNext = (nextStage) => {
    try {
      if (sound?.playTone) sound.playTone(600, 'sine', 0.15, 0.1);
    } catch (_) {}
    setStage(nextStage);
  };

  return (
    <main className="experience-shell">
      <FloatingParticles />
      <SoundControl enabled={sound.enabled} onChange={sound.setEnabled} />

      {stage === 0 && (
        <IntroReveal
          onOpen={() => {
            try {
              if (sound?.startCelebrationMusic) sound.startCelebrationMusic();
            } catch (_) {}
            handleNext(1);
          }}
        />
      )}

      {stage === 1 && (
        <div className="experience-screen">
          <BirthdayReveal name={data.recipientName} />
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={() => handleNext(2)}
          >
            Continue ✨
          </button>
        </div>
      )}

      {stage === 2 && (
        <InteractiveCake
          theme={data.cakeTheme || 'strawberry'}
          onDone={() => handleNext(3)}
        />
      )}

      {stage === 3 && (
        <BalloonReasons
          reasons={data.reasons || []}
          onDone={() => handleNext(4)}
        />
      )}

      {stage === 4 && (
        <MemoryGallery
          photos={data.photos || []}
          onDone={() => handleNext(5)}
        />
      )}

      {stage === 5 && (
        <LetterReveal
          letter={
            data.letter ||
            'Happy birthday! Wishing you endless joy, laughter, and success today and always.'
          }
          creator={data.creatorName}
          onDone={() => handleNext(6)}
        />
      )}

      {stage === 6 && (
        <FinalCelebration
          name={data.recipientName}
          onReplay={() => handleNext(0)}
        />
      )}
    </main>
  );
}