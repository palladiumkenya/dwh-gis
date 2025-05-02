import { create } from 'zustand';
import {County, Facility, SubCounty} from "./api";

interface StoreState {
    facilities: Facility[];
    setFacilities: (facilities: Facility[]) => void;
    counties: County[];
    setCounties: (counties: County[]) => void;
    subCounties: SubCounty[];
    setSubCounties: (subCounties: SubCounty[]) => void;
    indicators: string[];
    setIndicators: (indicators: string[]) => void;
    selectedIndicator: string;
    setSelectedIndicator: (indicator: string) => void;
}

const useStore = create<StoreState>((set) => ({
    facilities: [],
    setFacilities: (facilities) => set({facilities}),
    counties: [],
    setCounties: (counties) => set({counties}),
    subCounties: [],
    setSubCounties: (subCounties) => set({subCounties}),
    indicators: [],
    setIndicators: (indicators) => set({indicators}),
    selectedIndicator: 'HIV POSITIVE NOT LINKED',
    setSelectedIndicator: (indicator) => set({selectedIndicator: indicator}),
}));

export default useStore;
