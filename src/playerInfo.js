import React from 'react'

const PlayerInfo = (props) => {
    const {winner, turn} = props;

    const element = winner ? <h1>Winner: {winner}</h1> : <h3>Turn: {turn}</h3>
    
  return element
}

export default PlayerInfo