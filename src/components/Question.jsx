import Answer from "./Answer";
export default function Question(props) {
  // create Elements
  const answerElements = props.items.answers.map((answer) => {
    return (
      <Answer
        key={answer.id}
        items={answer}
        parentId={props.items.id}
        flipAnswer={props.flipAnswer}
        gameState={props.gameState}
        isUnanswered={props.items.unanswered}
      />
    );
  });

  return (
    <div className="question">
      <h2 className="question__title">{props.items.question}</h2>
      <div className="question__answers">{answerElements}</div>
    </div>
  );
}
