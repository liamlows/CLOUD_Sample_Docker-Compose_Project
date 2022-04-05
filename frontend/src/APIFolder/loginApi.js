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

export const getAccountbyUsername = (account) => {
    return axios.get(`http://localhost:8000/users/${account.username}`, account);
}

export const getFirstNamebyUsername = (account) => {
    return axios.get(`http://localhost:8000/users/${account.username}`, account).firstName;
}

export const getLastNamebyUsername = (account) => {
    return axios.get(`http://localhost:8000/users/${account.username}`, account).lastName;
}

export const getEmailbyUsername = (account) => {
    return axios.get(`http://localhost:8000/users/${account.username}`, account).email;
}

export const updateAccount = (account) => {
    axios.post(`http://localhost:8000/users/${account.username}`, account);
}