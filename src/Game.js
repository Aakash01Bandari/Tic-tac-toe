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
            currentStepNumber: history.length,
        });
    }

    render() {
        const { history } = this.state;
        const current = history[this.state.currentStepNumber];

        return (
            <div>
                <div>
                    Tic tac toe
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}

export default Game;
