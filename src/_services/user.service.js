import config from 'config';
import { handleResponse } from './handleResponse';

export const userService = {
    login,
    logout
};

async function login(number, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, password: password })
    };

    const response = await fetch(`${config.apiUrl}/login`, requestOptions);
    const user = await handleResponse(response);
    
    // login successful if there's a user in the response
    if (user) {
        // store user details and basic auth credentials in local storage 
        // to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}