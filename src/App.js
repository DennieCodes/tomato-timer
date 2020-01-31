import React, { Component } from 'react';
import './App.css';
import Pomodoro from './Pomodoro';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Pomodoro timerLength={1500} breakLength={300}/>
      </div>
    );  
  }
}

export default App;
