import React, { Component } from 'react';
import './Timer.css';

export default class Timer extends Component {
  render() {
    let minutes = Math.trunc(this.props.timer / 60);
    let seconds = this.props.timer % 60 === 0 ? "00" : this.props.timer % 60;

    return (
      <div className="timer">
        {minutes}:{seconds}
      </div>
    )
  }
}
