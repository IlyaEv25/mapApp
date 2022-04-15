import React, { useEffect } from 'react';
import L from '../../node_modules/leaflet/dist/leaflet' 

async function read_route(options, coord0, coord1){
    var resp = await fetch(`http://router.project-osrm.org/route/v1/driving/${coord0[0]},${coord0[1]};${coord1[0]},${coord1[1]}?` + options);
    var str = await resp.text();
    return JSON.parse(str)
  }
  
async function get_coord(name)
{
    return fetch(`https://nominatim.openstreetmap.org/search?q=${name}&format=json`).then(res => res.json()).then(f => [f[0].lon,  f[0].lat])
}

const Map = ({start, finish}) => {
    useEffect(async () => {
      var map = L.map('map');
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
      }).addTo(map);
  
      var start_point = await get_coord(start);
      var finish_point = await get_coord(finish);
  
      
      var data = await read_route("overview=full&geometries=geojson", start_point, finish_point);
  
      var latlngs = data.routes[0].geometry.coordinates;
      latlngs = latlngs.map(coord => [coord[1], coord[0]]);
      var polyline = L.polyline(latlngs, {color: 'blue'}).addTo(map);
  
      map.fitBounds(polyline.getBounds());
  
    })
    return <div className='Map' id="map"></div>
  }

  export {Map as default}