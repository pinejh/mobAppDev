import React, { Component } from 'react';
import './App.css';

class App extends Component {
  init() {
    setInterval(() => {
      var time = new Date();
      this.setState({
        hours: time.getHours() % 12,
        minutes: time.getMinutes(),
        seconds: time.getSeconds()
      });
    }, 500);
  }
  render() {
    var styles = { textAlign: 'center'};
    var time = new Date();
    this.state = {
      hours: time.getHours() % 12,
      minutes: time.getMinutes(),
      seconds: time.getSeconds()
    };
    return (
      <div className="doge" onLoad={this.init()}>
        <h1 style={styles}>{(this.state.hours === 0 ? 12 : this.state.hours)}:{(this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes)}:{(this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds)}<br/>|<br />|<br />|<br />|<br />|<br />O</h1>
      </div>
    );
  }
}

export default App;
