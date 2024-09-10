import { fetcher } from "../../helpers";
import { PlacePage } from "../../interfaces";


export const getPlaceByCompany = ({company_slug, place_slug}:PlacePage) => fetcher.get('/companies/' + company_slug + '/places/' + place_slug)