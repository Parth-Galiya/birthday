import { Volume2, VolumeX } from 'lucide-react';

export default function SoundControl({ enabled, onChange, sound }) {
  const toggleSound = () => {
    const nextState = !enabled;
    onChange(nextState);
    if (nextState && sound?.startCelebrationMusic) {
      sound.startCelebrationMusic();
    } else if (!nextState && sound?.stopCelebrationMusic) {
      sound.stopCelebrationMusic();
    }
  };

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggleSound}
      title={enabled ? 'Mute Music' : 'Play Music'}
    >
      {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}