import axios from 'axios';
axios.defaults.withCredentials = true


export const registerAccount = async (credentials) =>  {
    console.log("Registering...");

    const res = await axios.post('http://localhost:8000/api/account/register', credentials);
    if(res.status !== 200){
        console.log(`Couldn't register. ${res.status}`)
        return null;
    }
    return res.data;
};

export const logIntoAccount = async (credentials) => {
    console.log("Logging in...");
    const res = await axios.post('http://localhost:8000/api/account/login', credentials);
    if(res.status !== 200){
        console.log(`Couldn't log in. ${res.status}`)
        return null;
    }
    return res.data;
};

export const getAccountbyUsername = async (username) => {
    if(username === undefined || username === null){
        return null;
    }

    const res = await axios.get(`http://localhost:8000/api/users/${username}`);
    if(res.status !== 200){
        console.log(`Couldn't find user: ${username}`)
        return null;
    }
    return res.data;
}

export const updateAccountbyId = (account) => {
    return axios.put(`http://localhost:8000/api/account/${account.id}`, account);
}

// export const 