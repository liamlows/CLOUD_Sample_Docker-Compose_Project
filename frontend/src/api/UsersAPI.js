import axios from 'axios';

const apiConfig = {
    baseURL: '',
    headers: {
        Authorization: ''
    }
};

export const createAccount = (userName, Name, Email, Password) => new Promise((resolve, reject) => {
    axios.post('http://localhost:8000' + '/account/new', {username: userName, name: Name, email: Email, password: Password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const login = (Email, Password) => new Promise((resolve, reject) => {

    axios.get('http://localhost:8000' + '/session', {email: Email, password: Password})
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});