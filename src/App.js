import React, { useState } from 'react'
import Grid from './grid'
import PlayerInfo from './playerInfo';

const App = () => {
    const [data, setData] = useState({
        winner: {
            name: undefined,
            indexes: []
        },
        turn: 'YCricle',
        positions: new Array(42).fill(null)
    })

    const checkForColumnOfFour = (index) => {
        for (let i = 0; i < 21; i++) {
            const columnOfFour = [i, i + 7, i + 7 * 2, i + 7 * 3]
            // console.log('g', columnOfFour);

            if (columnOfFour.every(square => data.positions[square] === data.positions[index])) {
                console.log('good');

                data.winner.name = data.positions[index]
                data.winner.indexes = columnOfFour
            }

            // console.log('index', data.positions[index]);
            // console.log('index002',data.positions[i]);

            // if (data.positions[columnOfFour] === data.positions[index]){
            //     console.log('good');
            // } else {
            //     console.log('nooo');
            // }
        }

        console.log('ind', index);

    }

    const checkForRowOfFour = (index) => {
        for (let i = 0; i < 41; i++) {
            const rowOfFour = [i, i+1, i+2, i+3]

            const notValid = [4,5,6, 11,12,13, 18,19,20, 25,26,27, 32,33,34, 39,40,41]

            if ( notValid.includes(i)) continue

            if (rowOfFour.every(square => data.positions[square] === data.positions[index])){
                console.log('good');

                data.winner.name = data.positions[index]
                data.winner.indexes = rowOfFour
            }
        }
    }

    const onChange = (index) => {
        setData(prevData => {
            if (!prevData.positions[index] && !prevData.winner.name) {
                const data = { ...prevData }
                data.positions[index] = data.turn

                console.log(data.positions[index]);
                checkForColumnOfFour(index);
                checkForRowOfFour(index);
                const lines = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
                ]
                lines.forEach(line => {
                    const [a, b, c] = line
                    if (data.positions[a] &&
                        data.positions[a] === data.positions[b] &&
                        data.positions[a] === data.positions[c]) {
                        data.winner.name = data.turn
                        data.winner.indexes = line
                    }
                })
                data.turn = (data.turn === 'YCricle') ? 'RCricle' : 'YCricle'
                return data
            } else {
                return prevData
            }

        })
    }

    console.log(data);

    return (
        <>
            <Grid
                winningIndexes={data.winner.indexes}
                positions={data.positions}
                // setPositions={index => {
                //     setData(prevData => {
                //         if (!prevData.positions[index] && !prevData.winner.name) {
                //             const data = { ...prevData }
                //             data.positions[index] = data.turn
                //             const lines = [
                //                 [0, 1, 2],
                //                 [3, 4, 5],
                //                 [6, 7, 8],
                //                 [0, 3, 6],
                //                 [1, 4, 7],
                //                 [2, 5, 8],
                //                 [0, 4, 8],
                //                 [2, 4, 6],
                //             ]
                //             lines.forEach(line => {
                //                 const [a, b, c] = line
                //                 if (data.positions[a] &&
                //                     data.positions[a] === data.positions[b] &&
                //                     data.positions[a] === data.positions[c]) {
                //                     data.winner.name = data.turn
                //                     data.winner.indexes = line
                //                 }
                //             })
                //             data.turn = (data.turn === 'YCricle') ? 'RCricle' : 'YCricle'
                //             return data
                //         } else {
                //             return prevData
                //         }

                //     })
                // }}
                onChange={onChange}
            />
            <PlayerInfo turn={data.turn} winner={data.winner.name} />
        </>
    )

}

export default App