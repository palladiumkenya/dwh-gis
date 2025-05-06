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
    facilityName: string
    partnerName: string
    agency: string
    county: string
    subCounty: string
    lat: number
    long: number
    count: number
    rate: number
}


export interface Facility {
    facilityName: string
    partnerName: string
    agency: string
    county: string
    subCounty: string
    lat: number
    long: number
}

export  interface County {
    county: string
    indicator: string
    count: number
    rate: number
}
export  interface SubCounty {
    subCounty: string
    county: string
    indicator: string
    count: number
    rate: number
}

const apiUrl = process.env.REACT_APP_API_URL;

const fetchFacilities = async (indicator?: string): Promise<Facility[]> => {
    const response = await axios.get(`${apiUrl}/api/CsRealtime/Points/Facility?indicator=${indicator}`);
    return response.data;
};

const fetchCounties = async (indicator?: string): Promise<County[]> => {
    const response = await axios.get(`${apiUrl}/api/CsRealtime/Points/County?indicator=${indicator}`);
    return response.data;
};

const fetchSubCounties = async (indicator?: string): Promise<SubCounty[]> => {
    const response = await axios.get(`${apiUrl}/api/CsRealtime/Points/SubCounty?indicator=${indicator}`);
    return response.data;
};

const fetchIndicators = async (): Promise<string[]> => {
    const response = await axios.get(`${apiUrl}/api/CsRealtime/Indicator`);
    return response.data;
};

export { fetchFacilities,fetchCounties,fetchSubCounties,  fetchIndicators };
