import axios from 'axios';

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

const fetchFacilities = async (indicator?: string): Promise<Facility[]> => {
    const response = await axios.get(`https://localhost:7119/api/CsRealtime/Points/Facility?indicator=${indicator}`);
    return response.data;
};

const fetchCounties = async (indicator?: string): Promise<County[]> => {
    const response = await axios.get(`https://localhost:7119/api/CsRealtime/Points/County?indicator=${indicator}`);
    return response.data;
};

const fetchSubCounties = async (indicator?: string): Promise<SubCounty[]> => {
    const response = await axios.get(`https://localhost:7119/api/CsRealtime/Points/SubCounty?indicator=${indicator}`);
    return response.data;
};

const fetchIndicators = async (): Promise<string[]> => {
    const response = await axios.get('https://localhost:7119/api/CsRealtime/Indicator');
    return response.data;
};

export { fetchFacilities,fetchCounties,fetchSubCounties,  fetchIndicators };
