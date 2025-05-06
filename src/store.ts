import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {Age, Agency, FilterBody, Indicator, Region, Sex} from "./filter.api";
import {IndicatorData} from "./data.api";

interface StoreState {
    indicators: Indicator[];
    setIndicators: (indicators: Indicator[]) => void;
    selectedIndicator: Indicator;
    setSelectedIndicator: (indicator: Indicator) => void;


    startPeriod: string;
    setStartPeriod: (startPeriod: string) => void;
    endPeriod: string
    setEndPeriod: (endPeriod: string) => void;

    regions: Region[];
    setRegions: (regions: Region[]) => void;

    countys: string[];
    setCountys: (countys: string[]) => void;
    selectedCounty: string[];
    setSelectedCounty: (county: string[]) => void;

    subCountys: string[];
    setSubCountys: (subCountys: string[]) => void;
    selectedSubCounty: string[];
    setSelectedSubCounty: (subCounty: string[]) => void;

    facilityNames: string[];
    setFacilityNames: (facilityNames: string[]) => void;
    selectedFacilityName: string[];
    setSelectedFacilityName: (facilityName: string[]) => void;

    agencies: Agency[];
    setAgencies: (agencies: Agency[]) => void;

    agencys: string[];
    setAgencys: (agencys: string[]) => void;
    selectedAgency: string[];
    setSelectedAgency: (agency: string[]) => void;

    partnerNames: string[];
    setPartnerNames: (partnerNames: string[]) => void;
    selectedPartnerName: string[];
    setSelectedPartnerName: (partnerName: string[]) => void;

    sexs: Sex[];
    setSexs: (sexs: Sex[]) => void;
    selectedSex: string[];
    setSelectedSex: (sex: string[]) => void;

    ages: Age[];
    setAges: (ages: Age[]) => void;
    selectedAge: string[];
    setSelectedAge: (age: string[]) => void;

    filter: FilterBody;
    setFilter: (filter: FilterBody) => void;

    csData: IndicatorData;
    setCsData: (data: IndicatorData) => void;
}

const useStore = create<StoreState>()(
    devtools(
        (set, get) => ({
            indicators: [],
            setIndicators: (indicators) => set({indicators}),
            selectedIndicator: ({name: 'HIV POSITIVE NOT LINKED'}),
            setSelectedIndicator: (indicator) => {
                set({selectedIndicator: indicator});
                set({filter: {...get().filter, indicator: indicator.name}});
            },

            startPeriod: '',
            setStartPeriod: (startPeriod) => {
                set({startPeriod});
                set({filter: {...get().filter, startPeriod: startPeriod}});
            },

            endPeriod: '',
            setEndPeriod: (endPeriod) => {
                set({endPeriod});
                set({filter: {...get().filter, endPeriod: endPeriod}});
            },


            sexs: [],
            setSexs: (sexs) => set({sexs}),
            selectedSex: [],
            setSelectedSex: (sex) => {
                set({selectedSex: sex});
                set({filter: {...get().filter, sex: sex}});
            },

            regions: [],
            setRegions: (regions) => {
                set({regions});
                const cs = Array.from(new Set(regions.map(item => item.county)));
                set({countys: cs});
            },

            countys: [],
            setCountys: (countys) => set({countys}),
            selectedCounty: [],
            setSelectedCounty: (county) => {
                set({selectedCounty: county});
                set({filter: {...get().filter, county: county}});
                const sbs = Array.from(new Set(get().regions.filter(x => county.includes(x.county)).map(item => item.subCounty)));
                set({subCountys: sbs});
            },

            subCountys: [],
            setSubCountys: (subCountys) => set({subCountys}),
            selectedSubCounty: [],
            setSelectedSubCounty: (subCounty) => {
                set({selectedSubCounty: subCounty});
                set({filter: {...get().filter, subCounty: subCounty}});
                const facs = Array.from(new Set(get().regions.filter(x => subCounty.includes(x.subCounty)).map(item => item.facilityName)));
                set({facilityNames: facs});
            },

            facilityNames: [],
            setFacilityNames: (facilityNames) => set({facilityNames}),
            selectedFacilityName: [],
            setSelectedFacilityName: (facilityName) => {
                set({selectedFacilityName: facilityName});
                set({filter: {...get().filter, facilityName: facilityName}});
            },

            agencies: [],
            setAgencies: (agencies) => {
                set({agencies});
                const ags = Array.from(new Set(agencies.map(item => item.agency)));
                set({agencys: ags});
            },

            agencys: [],
            setAgencys: (agencys) => set({agencys}),
            selectedAgency: [],
            setSelectedAgency: (agency) => {
                set({selectedAgency: agency});
                set({filter: {...get().filter, agency: agency}});
                const ps = Array.from(new Set(get().agencies.filter(x => agency.includes(x.agency)).map(item => item.partnerName)));
                set({partnerNames: ps});
            },

            partnerNames: [],
            setPartnerNames: (partnerNames) => set({partnerNames}),
            selectedPartnerName: [],
            setSelectedPartnerName: (partnerName) => {
                set({selectedPartnerName: partnerName});
                set({filter: {...get().filter, partnerName: partnerName}});
            },

            ages: [],
            setAges: (ages) => set({ages}),
            selectedAge: [],
            setSelectedAge: (age) => {
                set({selectedAge: age});
                set({filter: {...get().filter, ageGroup: age}});
            },

            filter: ({indicator: 'HIV POSITIVE NOT LINKED'}),
            setFilter: (filter) => set({filter}),

            csData: {},
            setCsData: (data) => set({csData: data}),
        }),
        {name: 'CounterStore'} // this name will appear in the Redux DevTools
    )
);

export default useStore;