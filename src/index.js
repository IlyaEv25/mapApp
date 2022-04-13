import React, { useEffect } from 'react';
import { render } from 'react-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import L from '../node_modules/leaflet/dist/leaflet' 
import '../node_modules/leaflet/dist/leaflet.css'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const position = [51.505, -0.09]

async function read_route(options, coord0, coord1){
  var resp = await fetch('http://router.project-osrm.org/route/v1/driving/{coord0},52.517037;13.397634,52.529407;13.428555,52.523219?" + options);
  var str = await resp.text();
  return JSON.parse(str)
}

async function get_coord(name)
{
  return fetch("https://nominatim.openstreetmap.org/search?q=${name}&format=json").then(res => res.json()).then(f => [f[0].lat,  f[0].lon])
}

const Map = () => {
  useEffect(async () => {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    // var latlngs = [
    //   [45.51, -122.68],
    //   [37.77, -122.43],
    //   [34.04, -118.2]
    // ];

    var berlin = await get_coord("berlin");

    
    read_route("overview=full&geometries=geojson").then(data => {

      var latlngs = data.routes[0].geometry.coordinates;
      latlngs = latlngs.map(coord => [coord[1], coord[0]]);
      var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

      map.fitBounds(polyline.getBounds());

    })
    
    // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

    // map.fitBounds(polyline.getBounds());
  })
  return <div className='Map' id="map"></div>
}
//const root = ReactDOM.createRoot(document.getElementById('root'));
render(
  <Map/>,
  document.getElementById('root')
);

