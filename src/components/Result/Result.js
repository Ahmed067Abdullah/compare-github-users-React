import React from 'react';

import './Result.css';

const result = (props) => {
    return(
        <div className = "result">
            <h2>Result:</h2>
            <p><strong> {props.winner}</strong> is more active on Github than <strong> {props.loser} </strong></p>
        </div>);
}

export default result;