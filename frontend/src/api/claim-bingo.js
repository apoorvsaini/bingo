/*
 * Asks server to validate the Bingo claim by user
 */

import api from './api-config';
import axios from 'axios';

export default async function(ticketId) {
    let promise = new Promise((resolve, reject) => {
        axios.get(api.API_URL + api.API_BINGO + '/' + sessionStorage.getItem('userId') + '/' + ticketId)
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