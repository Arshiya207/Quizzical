export default function Start(props) {
  return (
    <div className="start">
      <h1 className="start__title">Quizzical</h1>
      <p className="start__description">developed by Arshiya </p>
      <button
        aria-label="start the quiz"
        className="start__btn"
        onClick={props.startTheGame}
      >
        start quiz
      </button>
    </div>
  );
}
