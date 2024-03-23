import React from "react";
import { useState, useEffect } from "react";
//import QUESTIONS from "../constants/constants.js";
const Option = ({ option, index, moveToNextQuestion, answer}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSelected, setIsSelected] = useState();
  let optionTextClass = "option-text";
  if (isSelected) {
    if (isCorrect) optionTextClass += " bg-correct";
    else optionTextClass += " bg-wrong";
  }
//   useEffect(() => {
//     let setIntervalReference = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(setIntervalReference);
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//     return () => {
//       clearInterval(setIntervalReference);
//     };
//   }, []);
//   if (timer === 0) {
//     moveToNextQuestion(setIsSelected);
//   }

  function handleOptionSelect(option, index, answer) {
    setIsSelected(true);

    if (option === answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    moveToNextQuestion();
  }
  return (
    <span
      onClick={() => handleOptionSelect(option, index, answer)}
      className={optionTextClass}
    >
      {option}
    </span>
  );
};

export default Option;
