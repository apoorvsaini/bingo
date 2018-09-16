/*
 * Asks server to validate the Bingo claim by user
*/

import api from './api-config';
import axios from 'axios';

export default async function(ticketId) {
    let promise = new Promise((resolve, reject) => {
        axios.get(api.API_URL + api.API_BINGO + '/' + sessionStorage.getItem('userId') + '/' + ticketId)
        .then(function (response) {
            console.log("CLAIMING");
            console.log(response);
            if ('claim' in response.data)
                resolve(response.data.claim);
            else resolve(false);
        })
        .catch(function (error) {
            reject(null);
        })
    });

    let result = await promise;
    return result;
}