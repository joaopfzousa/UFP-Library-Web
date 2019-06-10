import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll
};

async function login(number, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, password: password }),
        mode: 'cors'
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

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`${config.apiUrl}/users`, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}