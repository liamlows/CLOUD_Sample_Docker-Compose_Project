import axios from 'axios';
import {baseEndpoint} from '../urls/API';


// const basePoint="http://localhost:8000"

export const getNFTById = (id) =>new Promise((resolve,reject)=>{
    // axios.get(`${baseEndpoint}/nft/${id}`, apiConfig)
    axios.get(`${baseEndpoint}/nft/${id}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
     });
});

export const getNFTs = () => new Promise((resolve, reject) => {
    axios.get(`${baseEndpoint}/nft`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getAllNFTsByPrice = () => new Promise((resolve, reject) => {
    axios.get(`${baseEndpoint}/nft/0/Infinity/true`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});


