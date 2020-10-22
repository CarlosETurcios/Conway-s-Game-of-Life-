import React from 'react';
import './game_of_life.css'



const cellSize = 20;
const cWidth = 800;
const cHeight = 600

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{        left: `${cellSize * x + 1}px`,        top: `${cellSize * y + 1}px`,        width: `${cellSize - 1}px`,        height: `${cellSize - 1}px`,      }}/>
            );

    }}




 class CellGrid extends React.Component {
     constructor() {
         super();
         this.rows = cHeight / cellSize;
         this.cols = cWidth / cellSize;
         this.board = this.makeEmptyBoard();
        
     }
     state = { cells: [], }
    
     makeEmptyBoard() {
         let board = [];
         for (let y = 0; y < this.rows; y++) {
             board[y] = [];
             for (let x = 0; x < this.cols; x++) {
                 board[y][x] = false;
             }
         }
         return board;

     }
     makeCells() {
         let cells = [];
         for (let y = 0; y < this.rows; y++) {
             for (let x = 0; x < this.cols; x++) {
                 if (this.board[y][x]) {
                     cells.push({x,y})
                 }
             }
             return cells
         }
     }
     getElementOffset() {    
         const rect = this.boardRef.getBoundingClientRect();    
        const doc = document.documentElement;
         return { x: (rect.left + window.pageXOffset) - doc.clientLeft,
        y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
        }
     
     handleClick = (event) => {    
        const elemOffset = this.getElementOffset();    
        const offsetX = event.clientX - elemOffset.x;    
        const offsetY = event.clientY - elemOffset.y;        
        const x = Math.floor(offsetX / cellSize);    
        const y = Math.floor(offsetY / cellSize);
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) 
        {      this.board[y][x] = !this.board[y][x];    }
         this.setState({cells: this.makeCells()});
        }
    

    
     render() {
         const { cells } = this.state;
     return (
         <div>
           <div className="grid-cells" style={{width:cWidth, height:cHeight, backgroundSize:`${cellSize}px ${cellSize}px`}} onClick={this.handleClick} ref={(n) => {this.boardRef = n;}}>
               {cells.map(cell => ( <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>))}
           </div>
         </div>
     );
     }
}

 

 export default CellGrid 



