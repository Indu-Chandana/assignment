import React from 'react'

// import YCricle from './svgs/yCricle';
// import RCricle from './svgs/rcricle';

import styles from './grid.module.css'
import RCricle from './svgs/rcricle';
import YCricle from './svgs/ycricle';

const {container, winner} = styles;

const renderSVG = svg => {
    if (svg === 'YCricle') {
        return <YCricle size={40}/>
    } else if (svg === 'RCricle') {
        return <RCricle size={40}/>
    } else {
        return null
    }
}

const Grid = (props) => {
    const {positions, onChange, winningIndexes} = props;

    const divisions = positions.map((value, index) => {
        const isWinningIndex = winningIndexes.includes(index)
        return (
            <div
            className={isWinningIndex ? winner : null}
             key={index} 
            //  onClick={() => {setPositions(index)}}
            onClick={() => {onChange(index)}}
             >
                {renderSVG(value)}
            </div>
        )
    })
  return (
    <div className={container}>
        {divisions}
    </div>
  )
}

export default Grid