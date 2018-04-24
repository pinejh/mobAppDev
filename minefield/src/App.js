import React, { Component } from 'react';
import Minefield from './Minefield.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container bevel-in">
        <h1 className="gameTitle bevel-out">Minefield</h1>
        <Minefield rows={10} cols={10} numMines={15}/>
      </div>
    );
  }
}

export default App;
