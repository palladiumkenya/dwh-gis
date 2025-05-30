import React, {useEffect, useRef, useState} from "react";
import {MapContainer,GeoJSON,  Marker, Popup, CircleMarker,TileLayer,LayersControl,LayerGroup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L, {LatLng, LatLngBoundsExpression} from 'leaflet';
import type { Map as LeafletMap } from "leaflet";
import {County, Facility, SubCounty} from "./api";
import * as turf from '@turf/turf'


interface FacilityListProps {
    facilities: Facility[];
    counties: County[];
    subCounties: SubCounty[];
}


const MapView:React.FC<FacilityListProps> =({facilities,counties,subCounties})=>{

    const [keData, setKeData] = useState(null);
    const [countyData, setCountyData] = useState<any>(null);
    const [subCountyData, setSubCountyData] = useState(null);
    const mapRef = useRef<LeafletMap | null>(null);

    function getColor(d:any) {
        return d > 60 ? '#800026' :
            d > 30 ? '#BD0026' :
                d > 25  ? '#E31A1C' :
                    d > 20  ? '#FC4E2A' :
                        d > 15  ? '#FD8D3C' :
                            d > 10   ? '#FEB24C' :
                                d > 5   ? '#FED976' :
                                    '#FFEDA0';
    }

    function countyRateStyle(feature:any) {
        const ct=counties.filter(x=>x.county.toLowerCase()===feature.properties.shapeName.toLowerCase())[0]?.county;
        const rate=counties.filter(x=>x.county.toLowerCase()===feature.properties.shapeName.toLowerCase())[0]?.rate;

            const shape = countyData?.features.find(
                 (feature:any) => feature.properties.shapeName === ct
             );


        if (shape) {
            const centerPoint = turf.center(shape);
            const centerCoords = centerPoint.geometry.coordinates;
            console.log('<<CT>>',centerCoords)
        }




        return {
            fillColor: getColor(rate),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function subCountyRateStyle(feature:any) {
        const rate=subCounties.filter(x=>x.subCounty.toLowerCase()===feature.properties.shapeName.toLowerCase())[0]?.rate;
        return {
            fillColor: getColor(rate),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    useEffect(() => {
        fetch("/geo/ke.geojson").then((res) => res.json()).then((data) => setKeData(data)).catch((err) => console.error("Country Error:", err));
        fetch("/geo/county.geojson").then((res) => res.json()).then(data => setCountyData(data)).catch((err) => console.error("County Error:", err));
        fetch("/geo/subcounty.geojson").then((res) => res.json()).then((data) => setSubCountyData(data)).catch((err) => console.error("Sub County Error:", err));
    }, [counties]);

    const baseStyle = {
        color:"purple",
        weight: 1,
        opacity: 1,
        fillOpacity: 0
    };

    const countyStyle = {
        color: "#0077b6",
        weight: 1,
        opacity: 1,
        fillOpacity: 0
    };

    const subcountyStyle = {
        color: "#ff8800",
        weight: 1,
        opacity: 1,
        fillOpacity: 0
    };

    const locations = [
        { name: "Nairobi", lat: -1.286389, lng: 36.817223, count: 1200 },
        { name: "Mombasa", lat: -4.0435, lng: 39.6682, count: 800 },
        { name: "Kisumu", lat: -0.0917, lng: 34.7680, count: 300 },
        { name: "Eldoret", lat: 0.5143, lng: 35.2698, count: 450 },
        { name: "Nakuru", lat: -0.3031, lng: 36.0800, count: 600 },
        { name: "Garissa", lat: -0.4569, lng: 39.6583, count: 150 },
        { name: "Meru", lat: 0.0471, lng: 37.6559, count: 250 }
    ];

    const facilityIcon = new L.Icon({
        iconUrl: "/facility-icon.png", // put this in /public folder
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        shadowSize: [41, 41]
    });

    const onEachFeature = (feature:any, layer:any) => {
        layer.on({
            click: () => {
                const bounds: LatLngBoundsExpression = layer.getBounds();
                if (mapRef.current) {
                    mapRef.current.fitBounds(bounds, { padding: [20, 20] });
                }
            }
        });
        const name = feature.properties.shapeName;
        layer.bindTooltip(`<strong>${name}</strong>`);
    };

    function getCentre(county: string) {

        const shape = countyData?.features.find(
            (feature: any) => feature.properties.shapeName.toLowerCase() === county.toLowerCase()
        );

        if(shape) {
            const centerPoint = turf.center(shape);
            const centerCoords = centerPoint.geometry.coordinates;
            const ll = new LatLng(centerCoords[1], centerCoords[0])
            console.log('XXXXXX', ll)
            return ll;
        }
        return new LatLng(0,0)
    }

    return <>
        <h1>The Map</h1>
        <MapContainer center={[-1.2921, 36.8219]} zoom={6} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">

                    {/* Default country boundary */}
                    {keData && <GeoJSON data={keData} style={baseStyle} />}
                </LayersControl.BaseLayer>

                <LayersControl.Overlay name="County Boundaries">
                    {countyData && <GeoJSON data={countyData} style={countyStyle} onEachFeature={onEachFeature} />}
                </LayersControl.Overlay>

                <LayersControl.Overlay name="County Rates">
                    {countyData && <GeoJSON data={countyData} style={countyRateStyle} onEachFeature={onEachFeature} />}
                </LayersControl.Overlay>

                <LayersControl.Overlay name="Subcounty Boundaries">
                    {subCountyData && <GeoJSON data={subCountyData} style={subcountyStyle} />}
                </LayersControl.Overlay>

                <LayersControl.Overlay name="Subcounty Rates">
                    {subCountyData && <GeoJSON data={subCountyData} style={subCountyRateStyle} onEachFeature={onEachFeature} />}
                </LayersControl.Overlay>

                <LayersControl.Overlay checked name="County Bubbles">
                    <LayerGroup>
                        {counties.map((loc, idx:number) => (
                            <CircleMarker
                                key={idx}
                                center={getCentre(loc.county)}
                                radius={Math.sqrt(loc.count) * 10}
                                pathOptions={{ color: "blue", fillColor: "skyblue", fillOpacity: 0.5 }}
                            >
                            </CircleMarker>
                        ))}
                    </LayerGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay checked name="Facilities">
                    <LayerGroup>
                        {facilities.map((loc, i) => (
                            <Marker key={i} position={[loc.lat, loc.long]} icon={facilityIcon}>
                                <Popup>
                                    <strong>{loc.facilityName}</strong>
                                </Popup>
                            </Marker>
                        ))}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    </>
}

export default MapView