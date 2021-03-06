/*
 * Get the user id from the server and store in sessionStorage
 */

import api from './api-config';
import axios from 'axios';

export default async function() {
    let promise = new Promise((resolve, reject) => {
        if (sessionStorage.getItem('userId') !== null && sessionStorage.getItem('userId').length > 0) {
            resolve(sessionStorage.getItem('userId'));
        }
        else {
            axios.get(api.API_URL + api.API_AUTH)
            .then(function (response) {
                let userId = response.data.user_id;
                
                if ((userId !== null|| userId !== undefined) && userId.length > 0) {
                    sessionStorage.setItem('userId', userId);
                    resolve(userId);
                }
                else {
                    reject(null);
                }
            })
            .catch(function (error) {
                reject(null);
            })
        }
    });

    let result = await promise;
    return result;
}