import config from 'config';
import { handleResponse } from './handleResponse';

export const reservationService = {
    getAll,
    returnBook
};

async function getAll(userNumber) {
    const requestOptions = {
        method: 'GET'
    };

    const response = await fetch(`${config.apiUrl}/users/${userNumber}/active-reservations`, requestOptions);
    
    return handleResponse(response);
}

async function returnBook(reservationId) {
    let userDetails = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: userDetails.token })
    };

    const response = await fetch(`${config.apiUrl}/reservations/${reservationId}`, requestOptions);
    
    return handleResponse(response);
}

