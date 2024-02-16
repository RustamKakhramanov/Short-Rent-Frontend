import { fetcher } from '../../helpers/fetcher';
import { iPlace } from '../../interfaces/index';

const data = {

}

interface iReviewData {
    rating:number,
    advantages:string,
    disadvantages:string,
    comment:string,
}

function palceReview(url: string, data: iReviewData) {
    return fetcher.post(url, data);
}

function list(){
    return fetcher.get(`/api/reviews`);
}

function show(id:any){
    return fetcher.get(`/api/reviews/${id}`);
}

function _delete(id:any){
    return fetcher.delete(`/api/reviews/${id}`);
}

export const reviewService = {
    data,
    palceReview,
    list,
    show,
    _delete,
};




