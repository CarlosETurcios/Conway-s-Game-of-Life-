import React from 'react';
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
      <p>
       The Game of Life is a zero player game devised by mathematician John Horton Conway in 1970. The game is determined by the initail state, requiring no further input.
      </p>
      <p>The universe of game of life is an infinite two-dimensional orthogonal grid of square cells,
there are two possible states live or dead 
every cell interacts with its neigbours, which are the cells that are directly, horizontally, or diagnolly adjacent. At each step in time the following transitions occur.


<li> any live cell with fewer than two live neighbours dies(referred to as underpopulation or exposure)</li>
<li> any live cell with more than three live neighbours dies .</li>
<li> any live cell with two or three live neighbours lives, unchanged to the nect generation.</li>
<li>any dead cell with exactly three live neighbours will come to life </li>
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
