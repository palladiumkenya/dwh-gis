import React, {useEffect, useRef, useState} from "react";
import {MapContainer,GeoJSON,  Marker, Popup, CircleMarker,TileLayer,LayersControl,LayerGroup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L, {LatLngBoundsExpression} from 'leaflet';
import type { Map as LeafletMap } from "leaflet";
const MapView=()=>{

    const [keData, setKeData] = useState(null);
    const [countyData, setCountyData] = useState(null);
    const [subCountyData, setSubCountyData] = useState(null);
    const mapRef = useRef<LeafletMap | null>(null);


    const densityData = {
        "Nairobi": 6340,
        "Mombasa": 5287,
        "Kiambu": 1002,
        "Turkana": 13
    };

    function getColor(d:any) {
        return d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
                d > 200  ? '#E31A1C' :
                    d > 100  ? '#FC4E2A' :
                        d > 50   ? '#FD8D3C' :
                            d > 20   ? '#FEB24C' :
                                d > 10   ? '#FED976' :
                                    '#FFEDA0';
    }

    function style(feature:any) {
        return {
            fillColor: getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    useEffect(() => {
        fetch("/geo/ke.geojson").then((res) => res.json()).then((data) => setKeData(data)).catch((err) => console.error("Country Error:", err));
        fetch("/geo/county.geojson")
            .then((res) => res.json())
            .then(data => {
                // Add density to each feature
                data.features.forEach((f:any) => {
                    const name = f.properties.shapeName
                    // @ts-ignore
                    f.properties.density = densityData[name] || 0;
                });
                setCountyData(data)
            })
            .catch((err) => console.error("County Error:", err));
        fetch("/geo/subcounty.geojson").then((res) => res.json()).then((data) => setSubCountyData(data)).catch((err) => console.error("Sub County Error:", err));
    }, []);

    const baseStyle = {
        fillColor: "#444",
        weight: 1,
        opacity: 1,
        color: "white",
        fillOpacity: 0.5
    };

    const countyStyle = {
        color: "#0077b6",
        weight: 1.5,
        fillOpacity: 0.3
    };

    const subcountyStyle = {
        color: "#ff8800",
        weight: 1,
        fillOpacity: 0.2
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

    const facilities = [
        { name: "Nairobi Hospital", lat: -1.2921, lng: 36.8219 },
        { name: "Moi University Hospital", lat: 0.2833, lng: 35.3000 },
        { name: "Kenyatta University Hospital", lat: -1.1800, lng: 36.9311 },
        { name: "Jomo Kenyatta Airport Port Health", lat: -1.3192, lng: 36.9278 }
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

    return <>
        <h1>The Map</h1>
        <MapContainer center={[-1.2921, 36.8219]} zoom={6} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>

            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {/* Default country boundary */}
                    {keData && <GeoJSON data={keData} style={baseStyle} />}
                </LayersControl.BaseLayer>

                <LayersControl.Overlay name="County Boundaries">
                    {countyData && <GeoJSON data={countyData} style={style} onEachFeature={onEachFeature} />}
                </LayersControl.Overlay>

                <LayersControl.Overlay name="Subcounty Boundaries">
                    {subCountyData && <GeoJSON data={subCountyData} style={subcountyStyle} />}
                </LayersControl.Overlay>

                <LayersControl.Overlay checked name="Population Bubbles">
                    <LayerGroup>
                        {locations.map((loc, idx) => (
                            <CircleMarker
                                key={idx}
                                center={[loc.lat, loc.lng]}
                                radius={Math.sqrt(loc.count) * 0.4}
                                pathOptions={{ color: "blue", fillColor: "skyblue", fillOpacity: 0.5 }}
                            >
                                <Popup>
                                    <strong>{loc.name}</strong><br />
                                    Count: {loc.count}
                                </Popup>
                            </CircleMarker>
                        ))}
                    </LayerGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay checked name="Facilities">
                    <LayerGroup>
                        {facilities.map((loc, i) => (
                            <Marker key={i} position={[loc.lat, loc.lng]} icon={facilityIcon}>
                                <Popup>
                                    <strong>{loc.name}</strong>
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