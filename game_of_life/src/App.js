import React, {useState} from 'react';
import './App.css';
import CellGrid from './cellGrid'
/**
 * Game of life 
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * 
 * 1. Render grid 
 * 2. Spawn life on click 
 * 3. make starta and stop buttons 
 * 4. Implement game logic 
 */




function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        Conway's Game of Life
      </header>
      <div className="top">
      <h1>About this Game</h1>
      <p>The Game of Life is not your typical computer game. It is a 'cellular automaton', and was invented by Cambridge mathematician John Conway.
         This game became widely known when it was mentioned in an article published by Scientific American in 1970. It consists of a collection of cells which, based on a few mathematical rules, can live, die or multiply. Depending on the initial conditions, the cells form various patterns throughout the course of the game.
      </p>
      </div>
      <h1>The Simulation</h1>
      <div className='Grid'>
       <CellGrid/>  
      </div>
      <footer className="footer">
        
      </footer>

      
    </div>
  );
}

export default App;
