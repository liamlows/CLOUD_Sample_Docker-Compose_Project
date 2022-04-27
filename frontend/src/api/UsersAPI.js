import axios from 'axios';
import {baseEndpoint} from '../urls/API';

export const createAccount = (userName, Name, Email, Password) => new Promise((resolve, reject) => {
    axios.post(`${baseEndpoint}/account/new`, {username: userName, name: Name, email: Email, password: Password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getUsers = () => new Promise((resolve, reject) => {
    axios.get(`${baseEndpoint}/users/list`)
    .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);

        });
     });


export const getUserById = (id) => new Promise((resolve,reject)=>{
    axios.get(`${baseEndpoint}/user/${id}`)

        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);

        });
     });