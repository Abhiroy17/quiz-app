import React from "react";
import { useState, useEffect, useRef } from "react";
import QUESTIONS from "../constants/constants.js";
import Option from "./Option.jsx";

const Quiz = () => {
  const [quizState, setQuizState] = useState({
    timer: 4,
    activeQuestionIndex: 0,
    quizOver: false,
  });

  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setQuizState((prevState) => {
        // if quiz is over
        if (prevState.quizOver) {
          clearInterval(timerRef.current);
          return prevState;
        }

        // if timer runs out
        if (prevState.timer === 0) {
          const nextIndex = prevState.activeQuestionIndex + 1;

          if (nextIndex === QUESTIONS.length) {
            return { ...prevState, quizOver: true };
          }

          return { ...prevState, timer: 4, activeQuestionIndex: nextIndex };
        }

        // else decrement the timer
        return { ...prevState, timer: prevState.timer - 1 };
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // this function is invoked on user interaction
  function moveToNextQuestion() {
    setTimeout(() => {
      setQuizState((prevState) => {
        const nextIndex = prevState.activeQuestionIndex + 1;

        if (nextIndex === QUESTIONS.length) {
          return { ...prevState, quizOver: true };
        }

        return {
          ...prevState,
          timer: 4,
          activeQuestionIndex: nextIndex,
        };
      });
    }, 1000);
  }

  return (
    <div>
      <div>Timer: {quizState.timer}s</div>
      <h2>Quiz {quizState.activeQuestionIndex + 1}</h2>

      <h3 className="question-overview">
        {QUESTIONS[quizState["activeQuestionIndex"]].text}
      </h3>
      <div className="options">
        {QUESTIONS[quizState["activeQuestionIndex"]].answers.map(
          (option, index) => {
            return (
              <Option
                key={QUESTIONS[quizState["activeQuestionIndex"]].id + index}
                option={option}
                answer={
                  QUESTIONS[quizState["activeQuestionIndex"]]["answers"][0]
                }
                index={index}
                moveToNextQuestion={moveToNextQuestion}
              ></Option>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Quiz;
