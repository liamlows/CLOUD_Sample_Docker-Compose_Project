import axios from 'axios';
import { hostname } from './config';

export class DonationsRepository {

    addDonation(donation) {
        return new Promise((resolve, reject) => {
            axios.post(hostname + '/api/foodDonation', donation )
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

}