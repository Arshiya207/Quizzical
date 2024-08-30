export default function Answer(props) {
  const pItems = props.items;
  const selectCondition = pItems.isSelected && props.gameState;
  const mistakeCondition = pItems.gotItRight === false && !props.gameState;
  const correctAnswerCondition = pItems.gotItRight && !props.gameState;
  const unanswered = props.isUnanswered && pItems.isTrue;
  return (
    <button
      className={`answers__btn 
        ${selectCondition ? "selected" : ""} 
        ${mistakeCondition ? "answer-false" : ""} ${
        correctAnswerCondition ? "answer-right" : ""
      }
      ${unanswered ? "hightlight-currect" : ""}
     
      `}
      onClick={() => props.flipAnswer(props.parentId, props.items.id)}
    >
      {props.items.value}
    </button>
  );
}
