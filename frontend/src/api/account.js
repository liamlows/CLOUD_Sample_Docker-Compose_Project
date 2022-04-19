import axios from "axios";
import apiURL from "./APIURL"

const apiEndpoint = apiURL + "accounts"


export const login = (userdata) => new Promise((resolve, reject)=>{
            axios.post(`${apiEndpoint}/login`, userdata)
            .then(res => {
                resolve(res);
                console.log("sucess")
            })
            
        })    
    

export const register = (userdata) => new Promise((resolve,reject) =>{
            axios.post(URL + "register", userdata).then(res => {
                console.log(res);
                resolve(res);
            }).catch(err => {
                if (err.response) {
                    console.log(err);
                    reject(err.response)
                } else if (err.request){
                    reject("Server didn't respond");
                } else {
                    reject("Request failed");
                }

            })
        })
    


