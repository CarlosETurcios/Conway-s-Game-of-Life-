import React, {useState} from 'react';
import './App.css';

/**
 * Game of life 
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * 
 * 1. Render grid 
 * 2. Spawn life on click 
 * 3. make starta and stop buttons 
 * 4. Implement game logic 
 */

const numRows = 25;
const numCols = 25;


function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols)), () => 0);
    }
    
    
    
    return rows
  });
console.log(grid)
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
      {grid.map((rows, i) => 
      rows.map((col, k) => (
      <div
      key = {`${i}-${k}`}
      style={{
        width:20,
        height:20,
        background:grid[i][k] ? 'aqua' : undefined,
        border: 'solid 1px black'
        }}
        />
        ))
        )}
      </div>


    </div>
  );
}

export default App;
