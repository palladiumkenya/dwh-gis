import React, {useEffect} from 'react';
import './App.css';
import MapView from "./MapView";
import useStore from "./store";
import {fetchCounties, fetchFacilities, fetchIndicators, fetchSubCounties} from "./api";
import {useQuery} from "@tanstack/react-query";

const App:React.FC = () => {
    const {
        facilities, setFacilities,
        counties,setCounties,
        subCounties,setSubCounties,
        indicators, setIndicators,
        selectedIndicator, setSelectedIndicator } = useStore();
    const { data: indicatorData, error: indicatorError, isLoading: indicatorLoading } = useQuery({
        queryKey:['indicators'],
        queryFn:()=> fetchIndicators()
    });

    const { data: facilityData, error: facilityError, isLoading: facilityLoading } = useQuery({
        queryKey: ['facilities', selectedIndicator],
        queryFn:() => fetchFacilities(selectedIndicator),
        enabled:!!selectedIndicator
    });

    const { data: countyData, error: countyError, isLoading: countyLoading } = useQuery({
        queryKey: ['counties', selectedIndicator],
        queryFn:() => fetchCounties(selectedIndicator),
        enabled:!!selectedIndicator
    });

    const { data: subCountyData, error: subCountyError, isLoading: subCountyLoading } = useQuery({
        queryKey: ['subCounties', selectedIndicator],
        queryFn:() => fetchSubCounties(selectedIndicator),
        enabled:!!selectedIndicator
    });

    useEffect(() => {
        if (indicatorData) {
            setIndicators(indicatorData);
        }
    }, [indicatorData, setIndicators]);

    useEffect(() => {
        if (facilityData) {
            setFacilities(facilityData);
        }
    }, [facilityData, setFacilities]);

    useEffect(() => {
        if (countyData) {
            setCounties(countyData);
        }
    }, [countyData, setCounties]);

    useEffect(() => {
        if (subCountyData) {
            setSubCounties(subCountyData);
        }
    }, [subCountyData, setSubCounties]);

    if (indicatorLoading || facilityLoading || subCountyLoading || countyLoading) return <div>Loading...</div>;
    if (indicatorError) return <div>Error loading regions: {indicatorError.message}</div>;
    if (facilityError) return <div>Error loading facilities: {facilityError.message}</div>;
    if (countyError) return <div>Error loading counties: {countyError.message}</div>;
    if (subCountyError) return <div>Error loading subCounties: {subCountyError.message}</div>;

    return (


        <div className="App">

                <h1>Facilities</h1>
                <label>
                    Select Indicator:
                    <select value={selectedIndicator} onChange={(e) => setSelectedIndicator(e.target.value)}>
                        {indicators.map((indicator,i) => (
                            <option key={i} value={indicator}>{indicator}</option>
                        ))}
                    </select>
                </label>

            <MapView facilities={facilities} counties={counties} subCounties={subCounties}></MapView>
        </div>
    );
};

export default App;
