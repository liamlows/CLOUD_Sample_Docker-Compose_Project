import axios from 'axios';
axios.defaults.withCredentials = true


const BACKEND_ENDPOINT = "http://localhost:8000";


export const registerAccount = async (credentials) =>  {
    console.log("Registering...");

    const res = await axios.post(`${BACKEND_ENDPOINT}/api/account/register`, credentials);
    if(res.status !== 200){
        console.log(`Couldn't register. ${res.status}`)
        return null;
    }
    return res.data;
};

export const logIntoAccount = async (credentials) => {
    console.log("Logging in...");
    const res = await axios.post(`${BACKEND_ENDPOINT}/api/account/login`, credentials);
    if(res.status !== 200){
        console.log(`Couldn't log in. ${res.status}`)
        return null;
    }
    return res.data;
};

export const logout = async () => {
    try {
        const res = await axios.get(`${BACKEND_ENDPOINT}/api/account/logout`);
    } catch(e) {
        console.log(`Failed to logout.: ${e}`)
    }
}

export const getAccountbyUsername = async (username) => {
    if(username === undefined || username === null){
        return null;
    }

    const res = await axios.get(`${BACKEND_ENDPOINT}/api/users/${username}`);
    if(res.status !== 200){
        console.log(`Couldn't find user: ${username}`)
        return null;
    }
    return res.data;
}


//Still work in progress. Account editing is not fully implemented
export const updateAccountbyUsername = async (account) => {
    return axios.put(`${BACKEND_ENDPOINT}/api/users/${account.username}`, account);
}

export const getProfiles = async () => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/api/users`);
    if(res.status !== 200){
        console.log("Couldn't find users");
        return null;
    }
    return res.data;
}

export const getStatusByUsername = async (username) => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/api/users/${username}/status`);
    if(res.status !== 200){
        console.log("Couldn't find user status");
        return null;
    }
    return res.data;
}

export const sendFriendRequest = async (targetId) => {
    console.log("Sending Friend Request")
    const res = await axios.post(`${BACKEND_ENDPOINT}/api/friends/requests`, { targetId: targetId });
    return res.data;
}

// export const sendFriendRequests = async () => {
//     const res = await axios.post(`http://loacalhost:8000/api/friends/requests`);
//     return res.data;
// }

export const getFriends = async () => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/api/friends`);
    return res.data;
}

// export const 
export const getFriendRequests = async () => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/api/friends/requests`);
    return res.data;
}

export const handleFriendRequest = async (id, status) => {
    const res = await axios.put(`${BACKEND_ENDPOINT}/api/friends/requests/${id}`, {status: status});
    return;
}

export const getAllCourses = async() => {
    //TODO: is this right???
    const res = await axios.get('http://localhost:8000/api/courses');
    if(res.status !== 200){
        console.log("Couldn't find courses");
        return null;
    }
    return res.data;
}

export const getCourse = async (courseID) => {
    //TODO: is this right???
    const res = await axios.get('http://localhost:8000/api/courses/${course}');
    if(res.status !== 200){
        console.log("Couldn't find courses");
        return null;
    }
    return res.data;
}

export const addCourse = async (course, account) =>  {
    console.log("Adding..");

    const res = await axios.post('http://localhost:8000/api/users/${username}`/courses/${course}', course, account);
    if(res.status !== 200){
       // console.log(`Couldn't register. ${res.status}`)
        return null;
    }
    return res.data;
};

export const removeCourse = async (course, account) =>  {
    console.log("Adding..");

    const res = await axios.delete('http://localhost:8000/api/users/${username}`/courses/${course}', course, account);
    if(res.status !== 200){
       // console.log(`Couldn't register. ${res.status}`)
        return null;
    }
    return res.data;
};