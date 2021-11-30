import axios from 'axios';
import { hostname } from './config';

export class DonationsRepository {

    getDonations() {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/foodDonations')
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
        });
    }


    addDonation(donation) {
        return new Promise((resolve, reject) => {
            axios.post(hostname + '/api/foodDonations', donation )
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getDonation(foodDonationID) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/foodDonations/' + foodDonationID )
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getRDHandSoupKitchenInfo(foodDonationID) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/RDHSoupKitchens/' + foodDonationID )
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getSoupKitchens() {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/soupKitchens')
            .then(x => resolve(x.data))
            .catch(x => {
                alert(x);
                reject(x);
            })
        });
    }

}