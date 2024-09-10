import { PlacePage } from "../../interfaces";

const linkKey = 'redirect_link';

export const saveRedirectLink = (link: string) => {
    localStorage.setItem(linkKey, link);
}

export function getRedirectLink(link: string = '/', remove: boolean = false) {
    let redirectLink = localStorage.getItem(linkKey)

    if (remove) {
        localStorage.removeItem(linkKey)
    }

    return redirectLink ? redirectLink : link
}

export function getRedirectLinkAndRemove(link: string = '/') {
    return getRedirectLink(link, true)
}

export const saveCurrentLink = () => {
    let link = window.location.pathname;

    return saveRedirectLink(link)
}



const globalPageKey = 'global_page'

export const saveGlobalPage = (data: PlacePage) => {
    localStorage.setItem(globalPageKey, JSON.stringify(data));
}

export const getGlobalPage = () => {
    let data = localStorage.getItem(globalPageKey)

    if(data){
        return JSON.parse(data)
    }

    return null
}