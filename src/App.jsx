import React, { useEffect } from "react";
import Question from "./components/Question";
import Start from "./components/Start";
import { nanoid } from "nanoid";
import he from "he";
import Loading from "./components/Loading";

export default function App() {
  const [questions, setQuestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [gameState, setGameState] = React.useState(false);
  const [totalQuestions, setTotalQuestions] = React.useState(0);
  const [currectAnswerCount, setCurrectAnswerCount] = React.useState(0);
  const [loadFinish, setLoadFinish] = React.useState(false);
  const [gameStart, setGameStart] = React.useState(false);

  //event function

  function startTheGame() {
    async function getQuestions() {
      try {
        setIsLoading(true);
        setLoadFinish(false);
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await res.json();
        const crudeDataArray = data.results;
        const useableDataArray = crudeDataArray.map((que) => {
          const answers = [
            {
              id: nanoid(),
              value: he.decode(que.correct_answer),
              isSelected: false,
              isTrue: true,
              gotItRight: null,
            },
          ];
          que.incorrect_answers.forEach((answ) => {
            answers.push({
              id: nanoid(),
              value: he.decode(answ),
              isSelected: false,
              isTrue: false,
              gotItRight: null,
            });
          });

          return {
            id: nanoid(),
            question: he.decode(que.question),
            answers: shuffleArray(answers),
            unanswered: null,
          };
        });

        setQuestions(useableDataArray);
        setLoadFinish(true);
      } catch (error) {
        alert("there is an error " + error);
        setIsLoading(false);
        setLoadFinish(false);
      }
    }
    getQuestions();
  }

  function setGameVariables() {
    setGameState(true);
    setIsLoading(false);
    setGameStart(true);
  }

  function flipAnswer(parentId, childId) {
    if (!gameState) return;
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion) => {
        if (prevQuestion.id === parentId) {
          const updatedAnswers = prevQuestion.answers.map((answer) => {
            if (answer.id === childId) {
              return { ...answer, isSelected: !answer.isSelected };
            } else {
              return { ...answer, isSelected: false };
            }
          });
          return { ...prevQuestion, answers: updatedAnswers };
        } else {
          return prevQuestion;
        }
      });
    });
  }

  function checkAnswers(gameState) {
    if (gameState) {
      setGameState(false);
      setQuestions((prevQuestions) => {
        return prevQuestions.map((prevQuestion) => {
          const prevAnswers = prevQuestion.answers;
          const checkUnanswerd = prevAnswers.every(
            (preAnswer) => !preAnswer.isSelected
          );
          const checkedAnswers = prevAnswers.map((prevAnswer) => {
            if (prevAnswer.isTrue && prevAnswer.isSelected) {
              return { ...prevAnswer, gotItRight: true };
            } else if (!prevAnswer.isTrue && prevAnswer.isSelected) {
              return { ...prevAnswer, gotItRight: false };
            } else {
              return prevAnswer;
            }
          });

          return {
            ...prevQuestion,
            answers: checkedAnswers,
            unanswered: checkUnanswerd,
          };
        });
      });
    } else {
      startTheGame();
      setGameStart(false);
    }
  }

  //event function
  // useEffects
  useEffect(() => {
    const correctAnswers = questions.filter((que) => {
      return que.answers.filter((answer) => answer.gotItRight)[0];
    });

    setTotalQuestions(questions.length);
    setCurrectAnswerCount(correctAnswers.length);
  }, [questions]);

  // useEffects
  // function
  function shuffleArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      let randomValue = arr[randomIndex];
      arr[randomIndex] = arr[i];
      arr[i] = randomValue;
    }
    return arr;
  }

  // create Elements
  const questionElements = questions.map((question) => {
    return (
      <Question
        key={question.id}
        items={question}
        flipAnswer={flipAnswer}
        gameState={gameState}
      />
    );
  });

  return (
    <div className="container">
      <div className="top-circle">
        <div className="top-circle__circle"></div>
      </div>
      <div className="bottom-circle">
        <div className="bottom-circle__circle"></div>
      </div>
      {gameStart ? (
        <div className="questions">
          {questionElements}
          <div className="additional">
            {!gameState && (
              <p className="additional__result">{`You scored ${currectAnswerCount}/${totalQuestions} correct answers`}</p>
            )}{" "}
            <button
              className="additional__btn"
              onClick={() => checkAnswers(gameState)}
            >
              {gameState ? "check answers" : "play again"}
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <Loading loadFinish={loadFinish} setGameVariables={setGameVariables} />
      ) : (
        <Start startTheGame={startTheGame} />
      )}
    </div>
  );
}
