import axios from 'axios';

const apiEndpoint = 'https://api.johnlawrimore.com/store/products';
const apiConfig = {
    headers: {
        Authorization: 'cmiller'
    }
};

export const getAccountById = ([username, password]) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/${username}{password}, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});
