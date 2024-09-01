import getConfig from 'next/config';
import { iUser } from '../interfaces/user-interface';
import { userService } from '../lib/user';
import axiosInstance from 'axios';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();

export const fetcher = {
    get,
    post,
    put,
    getAuthHeader,
    delete: _delete
};

async function get(url: string, body: any = {}) {
    url = prepareUrl(url);

    if (body) {
        url += '?' + (new URLSearchParams(body).toString())
    }

    const response = await axiosInstance.get(url, {
        headers: { Authorization: getAuthHeader() }
    }).catch((e) => handleError(e.response));

    return response?.data;
};


async function post(url: string, body: any = {}) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        // credentials: "include",
        body: JSON.stringify(body)
    };
    return await fetch(prepareUrl(url), requestOptions).then(handleResponse).catch(handleError);
}

async function put(url: string, body: any) {
    const requestOptions = {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body)
    };
    return await fetch(prepareUrl(url), requestOptions).then(handleResponse).catch(handleError);
}

async function _delete(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: getHeaders()
    };
    return await fetch(prepareUrl(url), requestOptions).then(handleResponse).catch(handleError);
}

// helper functions

function prepareUrl(url: string) {
    if (!url.startsWith('/api')) {
        url = '/api' + url
    }

    return url.replace("/api", publicRuntimeConfig.apiUrl);
}

function getHeaders() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', getAuthHeader());

    return headers;
}


function getAuthHeader(): string {
    if (typeof userService == 'undefined') {
        return '';
    }

    const user: iUser = userService.userValue ? userService.userValue : null;
    return user && user.auth ? `Bearer ${user.auth!.access_token}` : '';
}


function handleError(e:any){
    if(e?.status === 401){
        userService.logout()

        return  window.location.href = '/auth/login'
    }

    return Promise.reject(e); 
}

function handleResponse(response: any) {
    if(!response.ok){
        return handleError(response)
    }

    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });


}