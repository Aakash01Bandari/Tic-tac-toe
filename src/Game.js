import React from 'react';
import Board from './Board';

const getPoints = (move) => {
    const points = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
    };

    return points[move];
};
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winnerRow: lines[i],
            };
        }
    }

    return {
        winner: null,
        winnerRow: null,
    };
};


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
        this.handleClick=this.handleClick.bind(this);
        this.resetMoves=this.resetMoves.bind(this);
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

    render() {
        const { history } = this.state;
        const current = history[this.state.currentStepNumber];
        const { winner, winnerRow } = calculateWinner(current.squares);

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
