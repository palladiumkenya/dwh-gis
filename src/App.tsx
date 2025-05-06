import React from 'react';
import './App.css';
import Filter from "./Filter";
import MapDataView from "./MapDataView";

const App:React.FC = () => {

    return (
        <div className="App">
            <h5>GIS</h5>
            <Filter/>
            <MapDataView/>
        </div>
    );
};

export default App;
