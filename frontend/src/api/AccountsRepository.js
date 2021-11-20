import axios from 'axios';
import { hostname } from './config';

export class AccountsRepository {

    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/users')
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }



}