import axios from 'axios';
axios.defaults.withCredentials = true


export const addAccount = (account) => new Promise((resolve, reject) => {
    console.log(account)
    axios.post('http://localhost:8000/account/register', account)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});
export const logIntoAccount = (account) => new Promise((resolve, reject) => {
    console.log(account)
    axios.post('http://localhost:8000/account/login', account)
        .then(x => resolve(x.data))
        .catch(x => {
            // alert(x);
            reject(x);
        });
});