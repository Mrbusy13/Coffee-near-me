import React, { useRef, useEffect, useState } from 'react';
import './App.css'
import Header from "../Header/Header"
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoibXJidXN5MTMiLCJhIjoiY2xiZmV6d3pmMDVuYTNubXA4YTlta2dzeiJ9.X-BIAh2XqChgtMPJBtwFhw'

function App() {

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-1.4700);
const [lat, setLat] = useState(53.3794);
const [zoom, setZoom] = useState(14.2);

useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [lng, lat],
  zoom: zoom
  });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });

  return (
    <div className="App">
      <Header/>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
