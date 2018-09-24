import React, {Component} from 'react';

import {getUserData} from '../../config/helper';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Users from '../../components/Users/Users';
import Spinner from '../../components/Spinner/Spinner';
import Result from '../../components/Result/Result';
import './Layout.css';

class Layout extends Component{

    state = {
        user1 : '',
        user2 : '',
        user1Data : {},
        user2Data : {},
        isLoading : false,
        isAvailable : false
    }

    resetHandler = () => {
        this.setState({
            user1Data : {},
            user2Data : {},
            isAvailable : false
        });
    }

    inputChangeHandler = (event) => {
        this.setState({ [event.target.id] : event.target.value })
    }

    fetchDataHandler = () => {
        if(this.state.user1 === ''){
            alert("User 1 can't be empty!")
            return;
        }
        if(this.state.user2 === ''){
            alert("User 2 can't be empty!")
            return;
        }
        if(this.state.user1 === this.state.user2){
            alert("Two unique usernames are required")
            return;
        }
        this.setState({isLoading : true});
        getUserData(this.state.user1)
            .then(res1 => {   
                getUserData(this.state.user2)
                    .then(res2 => {
                        let userData = (({avatar_url,following,followers,public_gists,public_repos,id }) => ({ avatar_url,following,followers,public_gists,public_repos,id }))(res1.data);
                        let total = userData.followers + userData.following + userData.public_gists + userData.public_repos;
                        this.setState({user1Data : {...userData, total : total} });        
                    
                        userData = (({avatar_url,following,followers,public_gists,public_repos,id }) => ({ avatar_url,following,followers,public_gists,public_repos,id }))(res2.data);
                        total = userData.followers + userData.following + userData.public_gists + userData.public_repos; 
                        this.setState({user2Data : {...userData, total : total}, isLoading: false, isAvailable : true});        
                    })
                    .catch(err => {
                        this.setState({isLoading : false});
                        alert("Something went wrong with user 2");
                    });
            })
            .catch(err => {
                this.setState({isLoading : false});
                alert("Something went wrong with user 1");
            });
    }

    render(){
        let usersComponent = null;
        let result = ''; 
        let button = '';      
        let disableInput = false;

        if(this.state.isAvailable){
            const users = [];
            users.push({...this.state.user1Data, userName :this.state.user1});
            users.push({...this.state.user2Data, userName :this.state.user2});
        
            usersComponent = <Users users = {users}/>

            if(this.state.user1Data.total === this.state.user2Data.total){
               result = <div className = "result"><h1>Both users are equally active</h1></div>;
            }
            else{
                let winner = this.state.user1;
                let loser = this.state.user2;
                if(this.state.user1Data.total < this.state.user2Data.total){
                    winner = this.state.user2;
                    loser = this.state.user1;
                }
            
                result = <Result winner={winner} loser={loser} /> 
            }
            
            button = <Button className = "btn btn-danger" clicked = {this.resetHandler}>Reset</Button>;

            disableInput = true;
        } 
        else{
            button = <Button className = "btn btn-success" clicked = {this.fetchDataHandler}>Go!</Button>
            usersComponent =  <small class="text-muted suggestions">Example: mtahir08, MOHAMMADArsalan</small>        }
        return(
            <div className = "layout">
                <h1 className="display-5 heading">Github Activities Comparator</h1>
                <Input type = "text" label = "User 1" id = "user1" changed = {this.inputChangeHandler} disable = {disableInput}/>
                <Input type = "text" label = "User 2" id = "user2" changed = {this.inputChangeHandler} disable = {disableInput}/>
                {usersComponent}
                {result}
                {button}
                {this.state.isLoading ?  <Spinner/> : null}
        </div>
        )
    }
}

export default Layout;