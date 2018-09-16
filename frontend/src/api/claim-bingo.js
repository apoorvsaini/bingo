/*
 * Asks server to validate the Bingo claim by user
*/

import api from './api-config';
import axios from 'axios';

export default async function() {
    axios.get(api.API_URL + api.API_BINGO + '/' + sessionStorage.getItem('userId') + '/' + 0)
    .then(function (response) {
        console.log("CLAIMING");
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
}