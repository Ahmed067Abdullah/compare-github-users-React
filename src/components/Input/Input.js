import React from 'react';

import './Input.css';

const input = (props) => {
    return (
        <div className="input-group input">
            <div className="input-group-prepend">
                <span className="input-group-text">{props.label}</span>
            </div>
            <input type={props.type} id={props.id} onChange = {props.changed}  className="form-control" disabled = {props.disable}/>
      </div>
    )
}

export default input;