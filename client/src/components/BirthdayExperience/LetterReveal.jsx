export default function LetterReveal({
  letter,
  creator,
  onDone,
}) {
  return (
    <section className="experience-screen letter-screen">
      <div className="eyebrow">A LETTER FOR YOU 💌</div>

      <div className="letter-paper">
        <p>{letter}</p>
        <span className="letter-signoff">
          — With love, {creator}
        </span>
      </div>

      <button className="btn btn-primary" onClick={onDone}>
        Final Celebration 🎊
      </button>
    </section>
  );
}
