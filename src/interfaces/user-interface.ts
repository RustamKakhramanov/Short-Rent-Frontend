import { iImage } from './index';


export interface iUser {
    phone: string,
    avatar?: iImage,
    auth?: iAuthData
}

export interface iAuthData {
    user?: iUser,
    token_type: string,
    expires_in: string,
    access_token: string,
    refresh_token?: string
}