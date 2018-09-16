/*
 * Get the tickets for the user
*/
import api from './api-config';
import axios from 'axios';

export default async function() {
    let promise = new Promise((resolve, reject) => {
        if (sessionStorage.getItem('userId') === null && sessionStorage.getItem('userId').length === 0) {
            reject({});
        }

        let sessId = sessionStorage.getItem('userId');
        
        axios.get(api.API_URL + api.API_GENERATE + '/' + sessId)
        .then(function (response) {
            let data = response.data;
            console.log(data);
            resolve(data);
        })
        .catch(function (error) {
            reject({});
        })
    });

    let result = await promise;

    return result;
}