import dayjs from "dayjs"
import { iPrice } from "../interfaces";

export function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export function chosseTimeParse(dates: Date[]) {
    if (dates.length == 2) {
        dayjs.locale('ru')
        const [start, end] = dates;
        if (typeof start.getFullYear !== "undefined" && !isNaN(start.getFullYear())) {
            return `${padTo2Digits(start.getHours())
                }:${padTo2Digits(start.getMinutes())
                }-${padTo2Digits(end.getHours())
                }:${padTo2Digits(end.getMinutes())},
            ${padTo2Digits(start.getDate())}.${padTo2Digits(start.getMonth())}.${start.getFullYear()} г.`
        }

        return 'Выберите дату и время';
    }

    return 'Выберите дату и время';
}

export const formatDate = (date: Date, withOptions = false, withDate = false) => {
    let options = withOptions ? { year: 'numeric', month: 'long', day: 'numeric' } : {}
    let dateString = getFormatDate(date, options);

    if(withDate) {
        dateString += ' В ' + getTimeDate(date, '')
    }

    return dateString
}

export const getFormatDate = (date:Date,options = {}) =>{
    let DateObject = (new Date(date));

    return DateObject.toLocaleDateString("ru-RU", options);
}


export const getTimeDate = (date:Date, dateString = '') =>{
    let DateObject =(new Date(date));

    return  dateString +  padTo2Digits(DateObject.getHours()) +':'+padTo2Digits(DateObject.getMinutes())
}

export const isOneDay =(date1: Date, date2: Date) =>{
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

export const formatPhone =(n:string)=> n.replace(/\D+/g, '').replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');


export const parseCurrency = (currency: 'kzt') => {
    let currencies = {
        kzt: '₸'
    }

    return currencies[currency] ? currencies[currency] : currency
}

export const calculateCost = (dates: Date[], price: iPrice) => {
    let diff = (dates[1].getTime() - dates[0].getTime()) / 1000

    switch (price.type) {
        case 'per_hour':
            return diff / 3600 * (+price.value)
        default:
            return diff / 3600
    }
}

export const searchFromArray = (nameKey: string, arr: any[], key:string = 'name') => {
    if(arr){
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][key] === nameKey) {
                return arr[i];
            }
        }
    }
    return null
}

export const  getRandomArbitrary = (min:number, max:number) => {
    return Math.random() * (max - min) + min;
  }