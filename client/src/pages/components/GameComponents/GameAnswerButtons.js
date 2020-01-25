import React from "react";

function GameAnswerButtons(props) {
    let userGuess = props.answer
  return (
    <div className="container">
        <button onClick = { () => {props.compareAnswer(userGuess)}}>
        {userGuess}
        </button>
    </div>
  );
}

export default GameAnswerButtons;