import axios from 'axios';
import {baseEndpoint} from '../urls/API';


export const checkAccount = (email,password) =>{
    axios.post(baseEndpoint+'/session',{email:email, password:password})
            .then(function(response){
                if(response.status===201){
                    window.alert("Successfully log in!!");
                    localStorage.setItem('token',response.data);
                }
                else{
                    window.alert("Logged with error");
                }
            })
            .catch(function(error){
                window.alert(error);
        });
}
export const getUserInfo = () =>new Promise((resolve,reject)=>{
    // var myToken=localStorage.getItem('token');
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

export const updateUserById = (username,email,password) =>new Promise((resolve,reject)=>{
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
    axios.post(`${baseEndpoint}/users/update`, {username: username, email: email, password: password},config)
        .then(x => resolve(x.data),
        window.alert("Successfully changed!!"))
        .catch(x => {
            alert(x);
            reject(x);
    });
});

// export const getNFTByUser = (id) =>new Promise((resolve,reject)=>{
//     axios.post(`${baseEndpoint}/nft/cd/${id}`, {creator_id:id})
//         .then(x => resolve(x.data))
//         .catch(x => {
//             alert(x);
//             reject(x);
//     });
// });

export const postNFT = (name,price,image_url) =>new Promise((resolve,reject)=>{
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
    axios.post(`${baseEndpoint}/ub/nft`, {name: name, price: price,image_url:image_url},config)
        .then(x => resolve(x.data),
        window.alert("Successfully changed!!"))
        .catch(x => {
            alert(x);
            reject(x);
    });
});