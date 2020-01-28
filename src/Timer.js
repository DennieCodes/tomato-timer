import React, { Component } from 'react'

export default class Timer extends Component {
  render() {
    let minutes = Math.trunc(this.props.timer / 60);
    let seconds = this.props.timer % 60 === 0 ? "00" : this.props.timer % 60;
    

    return (
      <div>
        <span>{minutes}:{seconds}</span>
      </div>
    )
  }
}
