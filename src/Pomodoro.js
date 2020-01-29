import React, { Component } from 'react';
import Timer from './Timer';
import './Pomodoro.css';

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      onBreak: false,
      isActive: false,
      timerId: 0,
      timer: 10,
      breakTimer: 300
    }

    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  // onClick Function that resets the timer value
  resetTimer() {
    if(this.state.timerId !== 0) {
      clearInterval(this.state.timerId);
    }

    this.setState({
      timer: 1500,
      breakTimer: 300,
      isActive: false,
      onBreak: false
    });
  }

  // onClick Function that starts the timer countdown
  startTimer() {
  
    if (this.state.timer > 0 && !this.state.isActive) {
      // && this.state.breakTimer > 0 - save this for when break activates
      this.setState({
        timerId: setInterval(this.countDown, 1000),
        isActive: true
      });
    }
  }

  // onClick Function that stops the timer countdown
  stopTimer() {
    clearInterval(this.state.timerId);    // clear the Interval timer calls to countdown()
    this.setState({
      isActive: false                     // set isActive to false
    });
  }

  // Function that handles the logic of the timer countdown
  countDown() {
    if (this.state.timer > 0) {           // check that there is still time on the timer
      this.setState({
        timer: this.state.timer - 1       // decrement the value of timer
      });
    } else {                              // execute if the timer has completed
      
      clearInterval(this.state.timerId);  // clear the interval calls to countdown()
      this.setState({
        onBreak: !this.state.onBreak,     // toggle break value to start break or indicate it's end
        isActive: false                   // set to inactive
      })
    }
  }

  // React Function that handles whenever the Component is updated
  componentDidUpdate() {
    if (this.state.timer === 0 && !this.state.isActive) {  // check that timer has ended
      const alarm = document.getElementById('alarm');
      alarm.play();
      // alarm.pause();
    }  
  }

  render() {
    let breakNotice = "";
    // Note this entire section is only needed when onBreak is true so possible reFactor
    if (this.state.onBreak) {
      let noticeMsg = "";
      if (this.state.timer === 0) {           // if timer === 0      
        noticeMsg = this.state.onBreak ? "The Timer has Ended" : "Time for a Break";
      } else {                                // timer > 0
        noticeMsg = "Break Time";
      }  

      breakNotice = <section className="section-notice">
        <h3 className="section-notice-msg">{noticeMsg}</h3> 
        <audio id="alarm">
          <source src="analog-watch-alarm.mp3" type="audio/mpeg"></source>
          <source src="analog-watch-alarm.wav" type="audio/wav"></source>
          Your browser does not support the audio element
        </audio>
      </section>;
    }

    return (
      <div className="pomodoro">
        <section className="section-timer" >
          <Timer timer={ this.state.timer }/>
        </section>
        
        {this.state.onBreak ? breakNotice : ""}
        
        <section className="section-controls">
          <button className="controls-button" onClick={this.startTimer}>Start</button>
          <button className="controls-button" onClick={this.stopTimer}>Stop</button>
          <button className="controls-button" onClick={this.resetTimer}>Reset</button>
        </section>
      </div>
    )
  }
}
