import axios from 'axios';

axios.defaults.withCredentials = true;

const baseEndpoint='';
const apiConfig={

    // headers: {
    //     Authorization: 'ali'
    // }
};

export const getNFTById = (NFTId) =>new Promise((resolve,reject)=>{
    axios.get(`${baseEndpoint}/${NFTId}`, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});