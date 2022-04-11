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

export const logout = async () => {
    try {
        const res = await axios.get('http://localhost:8000/api/account/logout');
    } catch(e) {
        console.log(`Failed to logout.: ${e}`)
    }
}

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


//Still work in progress. Account editing is not fully implemented
export const updateAccountbyUsername = async (account) => {
    return axios.put(`http://localhost:8000/api/users/${account.username}`, account);
}

export const getProfiles = async () => {
    const res = await axios.get('http://localhost:8000/api/users');
    if(res.status !== 200){
        console.log("Couldn't find users");
        return null;
    }
    return res.data;
}

export const getStatusByUsername = async (username) => {
    const res = await axios.get(`http://localhost:8000/api/users/${username}`);
    if(res.status !== 200){
        console.log("Couldn't find user status");
        return null;
    }
    return res.data;
}

export const sendFriendRequest = async (id) => {
    const res = await axios.post(`http://loacalhost:8000/api/friends/requests`, id);
    return res.data;
}

// export const sendFriendRequests = async () => {
//     const res = await axios.post(`http://loacalhost:8000/api/friends/requests`);
//     return res.data;
// }

export const getFriends = async () => {
    const res = await axios.post(`http://loacalhost:8000/api/friends`);
    return res.data;
}

// export const 
export const getFriendRequests = async () => {
    const res = await axios.get(`http://loacalhost:8000/api/friends/requests`);
    return res.data;
}

export const acceptOrDenyFriendRequest = async (id, status) => {
    const res = await axios.put(`http://loacalhost:8000/api/friends/requests/${id}`, {status: status});
}