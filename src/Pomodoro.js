import React, { Component } from 'react';
import Timer from './Timer';
import './Pomodoro.css';

export default class Pomodoro extends Component {
  // Note that only changing data needs to be stateful, if it doesn't change then it should be props
  // 1. count can come from the parent
  // 2. timerLength and breakLength are passed by the parent so don't need to be state
  constructor(props) {
    super(props);
    this.state = {
      onBreak: false,
      isActive: false,
      timerId: 0,
      timer: this.props.timerLength || 1500,
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
      timer: this.props.timerLength || 1500,
      isActive: false,
      onBreak: false
    });
  }

  // onClick Function that starts the timer countdown
  startTimer() {
  
    if (this.state.timer > 0 && !this.state.isActive) {
      // 1. check if the alarm is active
      this.toggleAlarm(false);
      this.setState({
        timerId: setInterval(this.countDown, 1000),
        isActive: true
      });
    }
  }

  // onClick Function that stops the timer countdown
  stopTimer() {
    this.toggleAlarm(false);              // turns off the alarm if its active

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
        isActive: false                   // set to inactive
      })
    }
  }

  // React Function that handles whenever the Component is updated
  componentDidUpdate() {
    if (this.state.timer === 0 && !this.state.isActive) {     // check that timer has ended
      this.toggleAlarm(true);

      if (this.state.onBreak === false) {                     // if onBreak === false (end of normal timer)
        this.setState({
          onBreak: true,                                      // toggle onBreak value
          timer: this.props.breakLength || 30                 // set Timer
        });
      } 
      else {                                                // if onBreak === true (end of break timer)       

        this.setState({                                       // condition continues to be 
          // count: this.state.count + 1,
          isActive: true
        });
        this.props.counter();                                 // call parent counter function        
      }
    }  
  }

  // toggles the Alarm depending on several factors in state
  toggleAlarm(play) {
    const alarm = document.getElementById('alarm');
    if (alarm)
      play ? alarm.play() : alarm.pause();                                           // sound the alarm
  }

  render() {
    let noticeMsg = "";
    // let alarm = "";

    if (this.state.onBreak) {
      if (this.state.timer > 0) {
        noticeMsg = "Break Time";
      } else {
        noticeMsg = "The Timer has Ended";
      }
    } else {
      noticeMsg = `Counter: ${this.props.count}`;
    }

    let alarm = this.state.timer === 0 || this.state.onBreak ?
      <audio id="alarm">
        <source src="analog-watch-alarm.mp3" type="audio/mpeg"></source>
        <source src="analog-watch-alarm.wav" type="audio/wav"></source>
        Your browser does not support the audio element
      </audio> : "";

    return (
      <div className="pomodoro">
        <section className="section-timer" >
          <Timer timer={ this.state.timer }/>
        </section>

        <section className="section-notice">
          <h3 className="section-notice-msg">{noticeMsg}</h3>
          {alarm} 
        </section>
        
        <section className="section-controls">
          <button className="controls-button" onClick={this.startTimer}>Start</button>
          <button className="controls-button" onClick={this.stopTimer}>Stop</button>
          <button className="controls-button" onClick={this.resetTimer}>Reset</button>
        </section>
      </div>
    )
  }
}
