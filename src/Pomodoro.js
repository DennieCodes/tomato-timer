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
      timer: 1500,
      breakTimer: 300
    }

    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  // onClick Function that sets the timer value to 25 minutes, 00 seconds
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
    // 1. Start button is pressed
    // 2. Check that timer and breakTimer values are > 0, if not then do nothing otherwise
    if (this.state.timer > 0 && this.state.breakTimer > 0) {
      // 3. If so then set an Interval to call countdown and record interval Id.
      // 4. Set state of the timerId to interval Id, set isActive to true
      this.setState({
        timerId: setInterval(this.countDown, 1000),
        isActive: true
      });
    }
  }

  // onClick Function that stops the timer countdown
  stopTimer() {
    // 1. Clear the interval timer
    clearInterval(this.state.timerId);
    // 2. set isActive to false
    this.setState({
      isActive: false
    });
  }

  // Function that handles the logic of the timer countdown
  countDown() {
    // 1. countDown is called every second so every time it must
    // 2. check that timer > 0, if so then decrement and set new value of timer
    if (this.state.timer > 0) {
      this.setState({
        timer: this.state.timer - 1
      });
    } else {
      // 3. if timer === 0, then sound the alarm
      alert('Timer is done!');
      // 4. Clear the interval
      clearInterval(this.state.timerId);
      // 5. Set onBreak to true, isActive to false
      this.setState({
        onBreak: true,
        isActive: false
      })
    }
  }

  render() {
    // Start text should be conditional and change to resume when it has been paused

    return (
      <div className="pomodoro">
        <section className="section-timer" >
          <Timer timer={ this.state.timer }/>
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
