import axios from 'axios';
import {baseEndpoint} from '../urls/API';


export const getUserInfo = () =>new Promise((resolve,reject)=>{
    // var myToken=localStorage.getItem('token');
    // window.alert(localStorage.token);
    let config;
        if( localStorage.token!=null){
        // console.log(localStorage.token)
        config={
            headers:{
                Authorization: 'Bearer '+ localStorage.getItem('token')
            }
        }
    }
    // axios.get(`${baseEndpoint}/nft/${id}`, apiConfig)
    axios.get(`${baseEndpoint}/users/current`, config)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
    });
});
