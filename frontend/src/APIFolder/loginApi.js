import axios from 'axios';
axios.defaults.withCredentials = true


export const addAccount = (account) => new Promise((resolve, reject) => {
    console.log(account)
    axios.post('http://localhost:8000/api/account/register', account)
        .then(x => resolve(x.data))
        .catch(x => {
            // alert(x);
            reject(x);
        });
});
export const logIntoAccount = (account) => new Promise((resolve, reject) => {
    console.log(account)
    axios.post('http://localhost:8000/api/account/login', account)
        .then(x => resolve(x.data))
        .catch(x => {
            // alert(x);
            reject(x);
        });
});

export const getAccountbyUsername = (account) => new Promise((resolve, reject) => {
    return axios.get(`http://localhost:8000/api/users/${account.username}`, account).then(x => resolve(x.data)).catch(x => {reject(x)})
});

export const updateAccountbyId = (account) => {
    return axios.put(`http://localhost:8000/api/account/${account.id}`, account);
}

// export const 