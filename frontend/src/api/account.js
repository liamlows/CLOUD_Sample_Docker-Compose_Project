import axios from "axios";
const URL = "http://localhost:8000/api/account/"

export class account {
    login(user, password) {
        return new Promise((resolve,reject)=>{
            axios
            .post(URL + "login", {
                user, password
            }).then(res => {
                resolve(res);
            }).catch(err => {
                if (err.response) {
                    console.log(err);
                    reject(err.response);
                } else if (err.request){
                    reject("Server didn't respond");
                } else {
                    reject("Request failed");
                }
            })
        })    
    }

    register(rUser, email, rPassword) {
        return new Promise((resolve,reject) =>{
            axios.post(URL + "register", {
                rUser, email, rPassword
            }).then(res => {
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
    }

}

