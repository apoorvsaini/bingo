/*
 * Asks server to validate the Bingo claim by user
 */

import api from './api-config';
import axios from 'axios';

export default async function() {
    let promise = new Promise((resolve, reject) => {
        axios.get(api.API_URL + api.API_DRAW + '/' + sessionStorage.getItem('userId'))
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            reject(null);
        })
    });

    let result = await promise;
    return result;
}