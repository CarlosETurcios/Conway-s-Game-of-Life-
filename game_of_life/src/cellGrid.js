import React from 'react';
import './game_of_life.css'



class CellGrid extends React.Component {

      static field = {
        columnsAmount: 25,
        rowsAmount: 25,
    };
    static cellState = {
        ALIVE: true,
        DEAD: false,
    };

    
    constructor(props) {
        super(props);
        
        this.state = {
            cells: this.initializeCells(),
            isGameOn: false,
            Generations: 0,
            size: this.field
            
        }
         this.speed = setInterval(()=> this.live(), 200)
    }

    

    initializeCells() {
        let cells = [];

        for (let columnIndex = 0; columnIndex < CellGrid.field.columnsAmount; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < CellGrid.field.rowsAmount; rowIndex++) {
                cells[columnIndex][rowIndex] = CellGrid.cellState.DEAD;
            }
        }

        return cells;
    }

    live() {
        if (!this.state.isGameOn){
            return;
        }
         
        const newCells = [];  

        for (let columnIndex = 0; columnIndex < CellGrid.field.columnsAmount; columnIndex++) {
            newCells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < CellGrid.field.rowsAmount; rowIndex++) {
                newCells[columnIndex][rowIndex] = this.programNewCellState(columnIndex, rowIndex)
            }
            
        }
        this.setState({cells: newCells,
            Generations: this.state.Generations + 1})
    }

    programNewCellState(columnIndex, rowIndex) {
        const liveNeighbour = this.programAliveNeighbourAmount(columnIndex,rowIndex)
        const currentCellState = this.state.cells[columnIndex][rowIndex];
        
        if (currentCellState === CellGrid.cellState.ALIVE) {
            if (liveNeighbour < 2) {
                return CellGrid.cellState.DEAD;
            } else if (liveNeighbour === 2 || liveNeighbour === 3) {
                return CellGrid.cellState.ALIVE;
            } else if (liveNeighbour > 3) {
                return CellGrid.cellState.DEAD;
            }
           
        } else {
            if (liveNeighbour === 3) {
                return CellGrid.cellState.ALIVE;
            }
            
        }
        return CellGrid.cellState.DEAD;
      

    }

    programAliveNeighbourAmount(columnIndex, rowIndex) {

        let liveNeighbour = 0;

        const neightbourOffset = [
            [-1, 0], // left
            [-1, 1], // top left
            [0, 1], // top
            [1, 1], // top right
            [1, 0], // right
            [1, -1], // bottom right
            [0, -1], // bottom
            [-1, -1], // bottom left
        ];

        for (const neighbourKey in neightbourOffset) {
            const [xOffset, yOffset] = neightbourOffset[neighbourKey];

            let newColumnOffset = columnIndex + xOffset;
            let newRowOffset = rowIndex + yOffset;

            if (newColumnOffset < 0 || newColumnOffset > CellGrid.field.columnsAmount - 1) {
                continue;
            }
            if (newRowOffset < 0 || newRowOffset > CellGrid.field.rowsAmount - 1) {
                continue;
            }
            const neighbourState = this.state.cells[newColumnOffset][newRowOffset];
            if (neighbourState === CellGrid.cellState.ALIVE) {
                 liveNeighbour++;
             }
        }
          
        return liveNeighbour;

    }

    toggleCell(columnIndex, rowIndex) {
        const newCellState = this.state.cells;

        newCellState[columnIndex][rowIndex] = !newCellState[columnIndex][rowIndex];

       this.setState( {state: newCellState})
    }

    togglegameOn() {
        this.setState({isGameOn: !this.state.isGameOn})
        
    }

   toggleClear() {
   this.setState({isGameOn: false, cells: this.initializeCells() , Generations: 0 })
   }

   toggleSlow() {
    console.log("this is from slow")
    clearInterval(this.speed)
    this.speed = setInterval(() => this.live(), 1000)
   
}
   toggleFast() {
      clearInterval(this.speed)
       
    this.speed = setInterval(() => this.live(), 50)

   }

   toggleDefault() {
       clearInterval(this.speed)
       this.speed = setInterval(() => this.live(), 200)
   }

   toggleTwintyFive() {
       console.log("hello for 25")
       CellGrid.field = {
           columnsAmount: 25,
           rowsAmount:25
       }
       this.setState({isGameOn: false,cells: this.initializeCells(), Generations: 0})
   }

   toggleFifty() {
       console.log("hello from 50")
      CellGrid.field = {
          columnsAmount:50,
          rowsAmount:50
      }
      this.setState({isGameOn: false ,cells: this.initializeCells(), Generations: 0})
       
     
     }
  
   seedRandom() {
     let gridCopy = this.initializeCells()  
     for (let rowIndex = 0; rowIndex < CellGrid.field.rowsAmount; rowIndex++) {
         for (let columnIndex = 0; columnIndex < CellGrid.field.columnsAmount; columnIndex++) {
             if (Math.floor(Math.random() * 4) === 1) {
                 gridCopy[rowIndex][columnIndex] = true
             }
         }
     }
     this.setState({
         cells: gridCopy
     })
   }

   renderCells(){
       return (
           <div className="cells">
               {this.state.cells.map((rows, columnIndex) => {
                   return this.renderColumn(rows, columnIndex)
               })}
           </div>
       )
   }
renderColumn(rows, columnIndex) {
    return (
        <div className="col" key={`column_${columnIndex}`}>
            {rows.map((cellState,rowIndex) => {
                const cellModifier = cellState === CellGrid.cellState.DEAD ? 'dead': 'alive'
                return <div className={`cell cell--${cellModifier}` }key={`cell_${columnIndex} ${rowIndex}`} onClick={() => this.toggleCell(columnIndex, rowIndex)}/>
            })}
        </div>
    )
}
renderStartButton() {
    const buttonLabel = this.state.isGameOn ? 'Stop': 'Start';
    return (
    <button className="start-button" onClick={()=> this.togglegameOn()}>{buttonLabel}</button>
    )
}
renderClearButton() {
return (
    <button className="clear-button" onClick={()=> this.toggleClear()}>Clear</button>
)
}
renderSlowButton() {
    return (
        <button className="slow-button" onClick={() => this.toggleSlow()} >Slow</button>
    )
}
renderDefaultSpeedButton() {
 return (
     <button className="default-button" onClick={() => this.toggleDefault()}>Default Speed</button>
 )
}
renderFastButton() {
    return (
        <button className="fast-button" onClick={() => this.toggleFast()}>Fast</button>

    )
}
renderRandomButton() {
    return(
        <button className="random-button" onClick={() => this.seedRandom()}>Random</button>
    )
}

render25button() {
    return(
   <button className="t25button" onClick={() => this.toggleTwintyFive()}>25X25</button>
    )
}

render50button() {
    return (
    <button className="t50button" onClick={() => this.toggleFifty()}>50X50</button>
    )
}
render() {
    return (
        <div className="grid-cells">
            <div>
                <h1>
                    Generations: {this.state.Generations}
                </h1>
            </div>
        <div className="grid-only">
         {this.renderCells()}
         </div>
        <div className="button-div">
            {this.renderStartButton()}
            {this.renderClearButton()}
            {this.renderSlowButton()}
            {this.renderFastButton()}
            {this.renderDefaultSpeedButton()}
            {this.renderRandomButton()}
            {this.render25button()}
            {this.render50button()}

        </div>
            
        </div>
    )
}

}

export default CellGrid;
