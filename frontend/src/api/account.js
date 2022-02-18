import axios from "axios";
const URL = "http://localhost:8000/api/account/"

export class account{
    login(user,password){
        return axios
        .post(URL +"login",{
            user,password
        }).then(res =>{
            console.log(res);
            return res;
        }).catch(err=>{
            if(err.response){
                console.log(err);
            return err.response.data;
            }
                
        })
    }

    register(rUser,email,rPassword){
        return axios
        .post(URL +"register",{
            rUser,email,rPassword
        }).then(res =>{
            console.log(res);
            return res;
        }).catch(err=>{
            if(err.response){
                console.log(err);
            return Promise.reject(err.response.data);
            }
                
        })
    }
    
}

