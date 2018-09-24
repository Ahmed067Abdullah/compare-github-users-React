import React from 'react';

import './User.css';

const user = (props) => {
    return (
        <div className="User">
            <img src= {props.src} alt={props.userName}/>
            <p>Username: <strong>{props.userName}</strong></p>
            <p>Followers: <strong>{props.followers}</strong></p>
            <p>Following: <strong>{props.following}</strong></p>
            <p>public_gists: <strong>{props.gists}</strong></p>
            <p>public_repos: <strong>{props.repos}</strong></p>
            <p>Total: <strong>{props.total}</strong></p>
      </div>
    )
}

export default user;