import axios from '../axios';

export const getUserData = (username) => {
    return new Promise((resolve,reject) =>{
        axios.get('/'+username)
            .then(user => resolve(user))
            .catch(error => reject(error));
    })
}