import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import { iUser, iAuthData } from '../../interfaces/user-interface';
import { fetcher } from '../../helpers';
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    setUser,
    setaAuth,
    login,
    hasUser,
    logout,
    getAll
};


function hasUser() {
    return userSubject.getValue() ? true : false;
}

function setUser(user: iUser) {
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
}



function setaAuth(data: iAuthData) {
    let user = data.user;

    if (typeof user != 'undefined') {
        user.auth = {
            token_type: data.token_type,
            expires_in: data.expires_in,
            access_token: data.access_token
        };

        return setUser(user);
    }
}



function login(username: string, password: string) {
    return fetcher.post(`${baseUrl}/authenticate`, { username, password })
        .then(user => {
            user.authdata = window.btoa(username + ':' + password);
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}


function getAll() {
    return fetcher.get(baseUrl);
}
