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

export const updateUserById = (id,username,email,password) =>new Promise((resolve,reject)=>{
    // var myToken=localStorage.getItem('token');
    //window.alert(localStorage.token);
    // let config;
    //     if( localStorage.token!=null){
    //     // console.log(localStorage.token)
    //     config={
    //         headers:{
    //             Authorization: 'Bearer '+ localStorage.getItem('token')
    //         }
    //     }
    // }
    // axios.get(`${baseEndpoint}/nft/${id}`, apiConfig)
    axios.post(`${baseEndpoint}/account/${id}`, {username: username, email: email, password: password})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
    });
});
