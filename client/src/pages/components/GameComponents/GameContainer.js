import React, { Component } from "react";
// import Questions from "../MadeUp/madeUpQuestions";
import API from "../../../utils/questionAPI.js";
import Button from "../GameComponents/GameAnswerButtons"


class GameContainer extends Component {
state = {
    Questions: [], 
    answers: [],
    number: 0, 
    correctAnswer: ""
}

 startGame = () => {
     API.getQuestions()
             .then(res => {console.log(res.data)
                let number = Math.floor(Math.random() * Math.floor(res.data.length));
                console.log(number)
                let newQuestion = res.data[number]
                console.log(newQuestion)
                let newArr = newQuestion.randomAnswers.split(",")
                this.setState({
                    Questions: res.data,
                    answers: newArr,
                    randNumber: number,
                    correctAnswer: res.data[number].correctAnswer
                })
            
                console.log(this.state.newArr)
            }
             )
             .catch(err => console.log(err));
             
     }
     compareAnswer = (answer) => {
            let number = this.state.randNumber;
            if (answer === this.state.Questions[number].correctAnswer) {
                console.log("You found the answer!")
            } else {
                console.log("You lost!!!")
            }
        }

render() {
    return (
        <div>
            <h1> You are in the container</h1>
            <button onClick={this.startGame}>START</button>
            {this.state.answers.map(answer => {
                return (
                    <Button
                        answer={answer}
                        compareAnswer={this.compareAnswer}
                    />
                )
            }
            )}
        </div>
    )
}
}
export default GameContainer;