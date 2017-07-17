import React, { Component } from 'react';
import WorldWind from './WorldWindComponent';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App" >
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to WorldWind in React</h2>
        </div>
        <div className="WorldWindContainer">
          <WorldWind/>
        </div>
      </div>
      
    );
  }
}

export default App;
