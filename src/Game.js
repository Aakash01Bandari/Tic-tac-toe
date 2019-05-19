import React from 'react';
import Board from './Board';
import getPoints from './Points'
import calculateWinner from './Winner'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9)
                        .fill(null),
                },
            ],
            currentStepNumber: 0,
            xIsNext: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.resetMoves = this.resetMoves.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares,
                    currentLocation: getPoints(i),
                    stepNumber: history.length,
                },
            ]),
            xIsNext: !this.state.xIsNext,
            currentStepNumber: history.length,
        });
    }

    resetMoves() {
        this.setState({
            history: [
                {
                    squares: [],
                },
            ],
            currentStepNumber: 0,
        });
    }
    jumpTo(step) {
        this.setState({
            currentStepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }
    render() {
        const {history} = this.state;
        const current = history[this.state.currentStepNumber];
        const {winner, winnerRow} = calculateWinner(current.squares);
        const moves = history.map((step,move)=>{
            const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
            const desc = step.stepNumber ? `Go to move ${step.stepNumber}` : 'Go to game start';
            const classButton = move === this.state.currentStepNumber ? 'button--green' : '';
            return(
                <li key={step.stepNumber}>
                    <button className={`${classButton} button`} onClick={() => this.jumpTo(move)}>
                        {`${desc} ${currentLocation}`}
                    </button>
                </li>
            )
        })
        let status;
        if (winner) {
            status = `Winner ${winner}`;
        } else if (history.length === 10) {
            status = 'Game Draw';
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerSquares={winnerRow}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <div className="reset">
                    <button className="button" onClick={() => this.resetMoves()}>
                        Reset Game
                    </button>
                </div>
            </div>
        );
    }
}

export default Game;
