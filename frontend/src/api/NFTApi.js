import axios from 'axios';
import {baseEndpoint} from '../urls/API';


const basePoint="http://localhost:8000"

export const getNFTById = (id) =>new Promise((resolve,reject)=>{
    // axios.get(`${baseEndpoint}/nft/${id}`, apiConfig)
    axios.get(`${basePoint}/nft/${id}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
     });
});