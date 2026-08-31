export default function BirthdayReveal({ name }) {
  return (
    <div className="reveal-box">
      <div className="eyebrow">HAPPY BIRTHDAY</div>
      <h1 className="name-title">{name}! 🥳</h1>
      <p>Today is all about celebrating you.</p>
    </div>
  );
}
