import { fetcher } from '../../helpers/fetcher';
import { iPlace } from '../../interfaces/index';

const data = {

}

interface iRentData {
    scheduled_at: Date ,
    scheduled_end_at: Date,
    currency: string,
    amount: number,
}

function rent(place: iPlace, data: iRentData) {
    data.scheduled_at.setTime(data.scheduled_at.getTime() + (5*60*60*1000));
    data.scheduled_end_at.setTime(data.scheduled_end_at.getTime() + (5*60*60*1000));
    let company = place?.company?.slug || 'synergy';
    
    return fetcher.post(`/api/companies/${company}/places/${place.slug}/rents`, data);
}

function list(){
    return fetcher.get(`/api/profile/rents`);
}

function show(id:any){
    return fetcher.get(`/api/profile/rents/${id}`);
}
function _delete(id:any){
    return fetcher.post(`/api/profile/rents/${id}`, { _method: 'DELETE' });
}

export const rentService = {
    data,
    rent,
    list,
    show,
    _delete,
};




