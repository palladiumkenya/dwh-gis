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


    const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedSex(options);
    };
    const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedAge(options);
    };
    const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedCounty(options);
    };

    const handleSubCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedSubCounty(options);
    };

    const handleFacChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedFacilityName(options);
    };

    const handleAgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedAgency(options);
    };

    const handlePartnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedPartnerName(options);
    };



    return (
        <div>
            <h5>Filters</h5>
            <br/>
            <label>
                Select Indicator:
                <select value={selectedIndicator.name} onChange={(e) => setSelectedIndicator({name: e.target.value})}>
                    {indicators.map((indicator, i) => (
                        <option key={i} value={indicator.name}>{indicator.name}</option>
                    ))}
                </select>
            </label>
            <br/>

            <h2>Select Date Range :</h2>
            <label>Start Date:</label>
            <input type="date" id="start-date" value={startPeriod} name="start-date" onChange={(e)=>setStartPeriod(e.target.value)}/>

            <label>End Date:</label>
            <input type="date" id="end-date" name="end-date" value={endPeriod} onChange={(e)=>setEndPeriod(e.target.value)}/>
            <br/>
            <label>
                Select County:
                <select value={selectedCounty} onChange={handleCountyChange} multiple>
                    {countys.map((county, i) => (
                        <option key={i} value={county}>{county}</option>
                    ))}
                </select>
            </label>
            <label>
                Select Sub County:
                <select value={selectedSubCounty} onChange={handleSubCountyChange} multiple>
                    {subCountys.map((subCounty, i) => (
                        <option key={i} value={subCounty}>{subCounty}</option>
                    ))}
                </select>
            </label>
            <label>
                Select Faciltiy:
                <select value={selectedFacilityName} onChange={handleFacChange} multiple>
                    {facilityNames.map((fac, i) => (
                        <option key={i} value={fac}>{fac}</option>
                    ))}
                </select>
            </label>
            <br/>
            <label>
                Select Sex:
                <select value={selectedSex} onChange={handleSexChange} multiple>
                    {sexs.map((sex, i) => (
                        <option key={i} value={sex.sex}>{sex.sex}</option>
                    ))}
                </select>
            </label>
            <br/>
            <label>
                Select Age:
                <select value={selectedAge} onChange={handleAgeChange} multiple>
                    {ages.map((age, i) => (
                        <option key={i} value={age.ageGroup}>{age.ageGroup}</option>
                    ))}
                </select>
            </label>
            <br/>
            <label>
                Select Agency:
                <select value={selectedAgency} onChange={handleAgencyChange} multiple>
                    {agencys.map((agency, i) => (
                        <option key={i} value={agency}>{agency}</option>
                    ))}
                </select>
            </label>
            <label>
                Select Partner:
                <select value={selectedPartnerName} onChange={handlePartnerChange} multiple>
                    {partnerNames.map((fac, i) => (
                        <option key={i} value={fac}>{fac}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Filter;
