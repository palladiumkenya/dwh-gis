import axios from 'axios';
import {FilterBody} from "./filter.api";

export interface IndicatorData {
    countyPoints?: CountyPoint[]
    subCountyPoints?: SubCountyPoint[]
    facilityPoints?: FacilityPoint[]
}
export interface CountyPoint {
    county?: string
    count?: number
    rate?: number
}
export interface SubCountyPoint {
    subCounty?: string
    county?: string
    count?: number
    rate?: number
}
export interface FacilityPoint {
    facilityName?: string
    partnerName?: string
    agency?: string
    county?: string
    subCounty?: string
    lat?: number
    long?: number
    count?: number
    rate?: number
}

const fetchIndicatorData = async (filterBody: FilterBody): Promise<IndicatorData> => {
    const response = await axios.post(`https://localhost:7119/api/CsRealtimePoint/All`,filterBody);
    return response.data;
};


export { fetchIndicatorData };