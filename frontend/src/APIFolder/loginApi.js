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

export const getAccountbyUsername = async (username) => {
    if (username === undefined || username === null) {
        return null;
    }
    const res = await axios.get(`http://localhost:8000/api/users/${username}`);
    if (res.status === 404) {
        console.log("Conldn't Find User");
        return null;
    }
    return res;
};


export const updateAccountbyId = (account) => {
    return axios.put(`http://localhost:8000/api/account/${account.id}`, account);
}

// export const 