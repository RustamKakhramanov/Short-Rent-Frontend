import { iUser } from './user-interface';

export interface iParent {
    children: React.ReactNode
}

export interface iCompany {
    id: number,
    slug: string,
    name: string,
    logo: Image,
    info: any,
    places: [
        iPlace
    ],
    description: string,
    images?: [iImage],
    address?: string,
    members?: [iUser],
    owner: iUser
}
export interface Image {
    url: string,
    description: string,
}
export interface iCity {
    id: number, name: string
}

export interface iSchedule {
    id: number,
    company_id: number,
    schedule: Array<number>,
    date: string
}
export interface iResultRent {
    id: number,
    user_id: number,
    company_id: any,
    rentable_id: number,
    scheduled_at: string,
    scheduled_end_at: string,
    created_at: string,
    updated_at: string,
}

export interface iImage {
    url: string,
    preview_url: string|null,
    icon_url: string|null,
    description: string|null,
    title?: string,
    author?: string,
    featured?: boolean,
}

export interface iPlace {
    id: number,
    images: iImage[],
    rating: number,
    reviews_count: number,
    address: string,
    city: iCity
    coordinates: {
        latitude: string,
        longitude: string,
    },
    description: string,
    free_today_schedule?: [],
    info: any,
    name: string,
    slug: string,
    can_review: boolean,
    company_slug: string,
    price: iPrice,
    contacts: iContact[],
    reviews?: iReview[],
    abilities?: iAbility[],
    company?: iCompany
}

export interface iPrice {
    name: string,
    type: string,
    currency: string,
    value: number,
    start_date: Date,
    end_date: null | string
}
export interface ITimeShedule {
    time: any,
    active: boolean
}
export interface iShedule {
    schedule: ITimeShedule[],
    date: any,
    price: iPrice
}

export interface iSpeciality {
    id: number,
    name: string,
    info?: [[string]],
}
export interface iAbility {
    id: number,
    name: string,
    value: string,
}

export interface iReview {
    id: number,
    reviewer: iUser,
    advantages: string,
    disadvantages: string,
    comment: string,
    images?: [iImage]
    created_at: Date
}

export interface iRent {
    id: number,
    scheduled_at: Date,
    scheduled_end_at: Date,
    currency: string,
    amount: number,
    rentable:iPlace
}
export interface iContact {
    type: string,
    owner: string,
    value: string,
    description: string,
}