export default function IntroReveal({ onOpen }) {
  return (
    <section className="experience-screen">
      <div className="eyebrow">FOR SOMEONE SPECIAL</div>
      <h1>You've Got a Birthday Surprise! 🎁</h1>
      <p style={{ margin: '1rem 0 1.5rem', color: '#64748b' }}>
        A magical experience crafted just for you.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onOpen}
      >
        Open Gift ✨
      </button>
    </section>
  );
}