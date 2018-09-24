import React from 'react';

import User from './User/User';
import './Users.css';

const users = (props) => {

    const usersData = props.users.map((user) =>{
        return <User 
            key = {user.userName}
            src= {user.avatar_url} 
            userName = {user.userName} 
            following = {user.following} 
            followers = {user.followers}
            gists = {user.public_gists}
            repos = {user.public_repos}
            total = {user.total}/>
    });
    
    return(
        <div className = "Users">
            {usersData}
        </div>
    )
}
export default users;