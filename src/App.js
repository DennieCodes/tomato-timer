import React, { Component } from 'react';
import './App.css';
import Pomodoro from './Pomodoro';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }

    this.counter = this.counter.bind(this);
  }
  
  // Function counter : increments count by 1
  counter() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Pomodoro
          counter={this.counter} 
          count={this.state.count} 
          timerLength={1500} 
          breakLength={300}
        />
      </div>
    );  
  }
}

export default App;

// Color scheme
// https://paletton.com/#uid=53r0u0kllll6qTYdTuQsNbQHL2m