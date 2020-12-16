import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './components/questionBox';
import clap from './Sound/clapping.mp3';
// import bubble from './bubble/PYZK.gif';


let audio = new Audio(clap);
const start = () => {
  audio.play()
}

class Quiz extends Component {
  state = {
    questionBank: [],
    responses: 0,
    score: 0
  };
  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };
  computeAnswer = (answer, correctAnswer,getVideo,playVideo) => {
    if (answer === correctAnswer) {
      getVideo = elem => {
        this.video = elem
      }
      playVideo = () => {
        this.video.play()
      };
      this.setState({ score: this.state.score + 1 });
      start();

    }
    this.setState({ responses: this.state.responses < 5 ? this.state.responses + 1 : 5 });
  }
  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <div className="container">
        <div className="title">Quiz (Click on refresh to change question and if your answer is correct you will hear clapping sound)</div>
        <div>
          <video className="video"
            ref={this.getVideo}
            src="https://static.videezy.com/system/resources/previews/000/038/591/original/alb_bub101_1080p.mp4"
            type="video/mp4" />
        </div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(({ question, answers, correct, questionId }) =>
            <QuestionBox
              question={question}
              options={answers}
              key={questionId}
              selected={answer => this.computeAnswer(answer, correct)}
            />
          )}
        {this.state.responses === 5 ? (<h2>You Scored-- {this.state.score}/5</h2>) : <h2>PlayAgain</h2>}
        <div id="app">
        </div>
      </div>

    );
  }
}

ReactDOM.render(<React.StrictMode><Quiz /></React.StrictMode>, document.getElementById('root'));


