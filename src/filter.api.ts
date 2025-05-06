import axios from 'axios';

export interface Indicator {
    name: string
}
export interface Region {
    county: string
    subCounty: string
    facilityName: string
}
export interface Agency {
    agency: string
    partnerName: string
}
export interface Sex {
    sex: string
}
export interface Age {
    ageGroup: string
}

export interface FilterBody {
    indicator?: string
    startPeriod?: string
    endPeriod?: string
    county?: string[]
    subCounty?: string[]
    facilityName?: string[]
    sex?: string[]
    ageGroup?: string[]
    agency?: string[]
    partnerName?: string[]
}

const apiUrl = process.env.REACT_APP_API_URL;

const fetchIndicatorFilters = async (): Promise<Indicator[]> => {
    const response = await axios.get(`${apiUrl}/api/CsFilter/Indicator`);
    return response.data;
};
const fetchRegionFilters = async (): Promise<Region[]> => {
    const response = await axios.get(`${apiUrl}/api/CsFilter/Region`);
    return response.data;
};
const fetchAgencyFilters= async (): Promise<Agency[]> => {
    const response = await axios.get(`${apiUrl}/api/CsFilter/Agency`);
    return response.data;
};
const fetchSexFilters = async (): Promise<Sex[]> => {
    const response = await axios.get(`${apiUrl}/api/CsFilter/Sex`);
    return response.data;
};
const fetchAgeFilters = async (): Promise<Age[]> => {
    const response = await axios.get(`${apiUrl}/api/CsFilter/Age`);
    return response.data;
};

export {fetchIndicatorFilters, fetchRegionFilters ,fetchAgencyFilters,fetchSexFilters,fetchAgeFilters};
