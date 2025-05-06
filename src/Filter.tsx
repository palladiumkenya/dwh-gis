import React, {useEffect} from 'react';
import './App.css';
import useStore from "./store";
import {useQuery} from "@tanstack/react-query";
import {
    fetchAgeFilters,
    fetchAgencyFilters,
    fetchIndicatorFilters,
    fetchRegionFilters,
    fetchSexFilters
} from "./filter.api";
import {DatePicker, Select} from "antd";
const Filter:React.FC = () => {
    const {
        indicators, setIndicators, selectedIndicator, setSelectedIndicator,
        setRegions,setAgencies,

        startPeriod, setStartPeriod,endPeriod,setEndPeriod,

        countys,  selectedCounty, setSelectedCounty,
        subCountys,  selectedSubCounty, setSelectedSubCounty,
        facilityNames, selectedFacilityName, setSelectedFacilityName,

        agencys, selectedAgency, setSelectedAgency,
        partnerNames, selectedPartnerName, setSelectedPartnerName,

        sexs, setSexs, selectedSex, setSelectedSex,
        ages, setAges, selectedAge, setSelectedAge
    } = useStore();

    const { data: indicatorsData, error: indicatorsError, isLoading: indicatorsLoading } = useQuery({
        queryKey:['IndicatorFilters'],
        queryFn:()=> fetchIndicatorFilters()
    });

    const { data: regionsData, error: regionsError, isLoading: regionsLoading } = useQuery({
        queryKey:['RegionFilters'],
        queryFn:()=> fetchRegionFilters()
    });

    const { data: agenciesData, error: agenciesError, isLoading: agenciesLoading } = useQuery({
        queryKey:['AgencyFilters'],
        queryFn:()=> fetchAgencyFilters()
    });

    const { data: sexsData, error: sexsError, isLoading: sexsLoading } = useQuery({
        queryKey:['SexFilters'],
        queryFn:()=> fetchSexFilters()
    });

    const { data: agesData, error: agesError, isLoading: agesLoading } = useQuery({
        queryKey:['AgeFilters'],
        queryFn:()=> fetchAgeFilters()
    });

    useEffect(() => {
        if (indicatorsData) {
            setIndicators(indicatorsData);
        }
    }, [indicatorsData, setIndicators]);

    useEffect(() => {
        if (regionsData) {
            setRegions(regionsData);
        }
    }, [regionsData, setRegions]);

    useEffect(() => {
        if (agenciesData) {
            setAgencies(agenciesData);
        }
    }, [agenciesData, setAgencies]);

    useEffect(() => {
        if (sexsData) {
            setSexs(sexsData);
        }
    }, [sexsData, setSexs]);

    useEffect(() => {
        if (agesData) {
            setAges(agesData);
        }
    }, [agesData, setAges]);

    if (indicatorsLoading) return <div>Loading Indicator Filters...</div>;
    if (sexsLoading) return <div>Loading Sex Filters...</div>;
    if (agesLoading) return <div>Loading Age Filters...</div>;
    if (regionsLoading) return <div>Loading Region Filters...</div>;
    if (agenciesLoading) return <div>Loading Agency Filters...</div>;
    if (indicatorsError) return <div>Error loading Indicator Filters: {indicatorsError.message}</div>;
    if (sexsError) return <div>Error loading Sex Filters: {sexsError.message}</div>;
    if (regionsError) return <div>Error loading Regions Filters: {regionsError.message}</div>;
    if (agenciesError) return <div>Error loading Agency Filters: {agenciesError.message}</div>;
    if (agesError) return <div>Error loading Ages Filters: {agesError.message}</div>;


    const handleIndicatorChange = (name:string) => {
        setSelectedIndicator(name);
    };

    const handleSexChange = (options:any) => {
        setSelectedSex(options);
    };
    const handleAgeChange = (options:any) => {
        setSelectedAge(options);
    };
    const handleCountyChange = (options:any) => {
        setSelectedCounty(options);
    };

    const handleSubCountyChange = (options:any) => {
        setSelectedSubCounty(options);
    };

    const handleFacChange = (options:any) => {
        setSelectedFacilityName(options);
    };

    const handleAgencyChange = (options:any) => {
        setSelectedAgency(options);
    };

    const handlePartnerChange = (options:any) => {
        setSelectedPartnerName(options);
    };

    const handleRangeChange = (dates: any) => {
        if (dates) {
            const [start, end] = dates;
            setStartPeriod(start)
            setEndPeriod(end)
        }
    };

    const { Option } = Select;
    const { RangePicker } = DatePicker;

    return (
        <div>
            Indicator:
            <Select value={selectedIndicator} style={{width: '100%'}} placeholder="Select Indicator"
                    onChange={handleIndicatorChange}>
                {indicators.map((indicator, i) => (
                    <Option key={i} value={indicator.name}>{indicator.name}</Option>
                ))}
            </Select>
            <br/>
            Period:
            <RangePicker onChange={handleRangeChange}/>
            <br/>
            County:
            <Select value={selectedCounty} mode="multiple" allowClear style={{width: '100%'}} placeholder="Select County"
                    onChange={handleCountyChange}>
                {countys.map((county, i) => (<Option key={i} value={county}>{county}</Option>))}
            </Select>

            <br/>
            Sub County:
            <Select mode="multiple" allowClear style={{width: '100%'}} placeholder="Select Sub County" value={selectedSubCounty}
                    onChange={handleSubCountyChange}>
                {subCountys.map((subCounty, i) => (<Option key={i} value={subCounty}>{subCounty}</Option>))}
            </Select>
            <br/>
            Select Faciltiy:
            <Select value={selectedFacilityName} onChange={handleFacChange} mode="multiple" allowClear
                    style={{width: '100%'}} placeholder="Select County">
                {facilityNames.map((fac, i) => (
                    <Option key={i} value={fac}>{fac}</Option>
                ))}
            </Select>
            <br/>
            Select Sex:
            <Select value={selectedSex} onChange={handleSexChange} mode="multiple" allowClear style={{width: '100%'}}
                    placeholder="Select County">
                {sexs.map((sex, i) => (
                    <Option key={i} value={sex.sex}>{sex.sex}</Option>
                ))}
            </Select>
            <br/>
            Age:
            <Select value={selectedAge} onChange={handleAgeChange} mode="multiple" allowClear style={{width: '100%'}}
                    placeholder="Select Age">
                {ages.map((age, i) => (
                    <Option key={i} value={age.ageGroup}>{age.ageGroup}</Option>
                ))}
            </Select>
            <br/>
            Agency:
            <Select value={selectedAgency} onChange={handleAgencyChange} mode="multiple" allowClear
                    style={{width: '100%'}} placeholder="Select Agency">
                {agencys.map((agency, i) => (
                    <Option key={i} value={agency}>{agency}</Option>
                ))}
            </Select>

            <br/>
            Partner:
            <Select value={selectedPartnerName} onChange={handlePartnerChange} mode="multiple" allowClear
                    style={{width: '100%'}} placeholder="Select Partner">
                {partnerNames.map((fac, i) => (
                    <Option key={i} value={fac}>{fac}</Option>
                ))}
            </Select>
        </div>
    );
};

export default Filter;
