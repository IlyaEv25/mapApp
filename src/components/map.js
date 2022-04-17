import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import L from '../../node_modules/leaflet/dist/leaflet' 
import { SET_MAP } from '../actions'

const Map = ({data, mapData, dispatch}) => {
    useEffect(() => {

        if (!mapData.mapPointer)
        {
            var map = L.map('map');
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1
            }).addTo(map);	
            dispatch({type: SET_MAP, map})
        }
        else
            var map = mapData.mapPointer;

        console.log("PRED", data);
        if (data.from)
        {
            map.eachLayer(layer => {
              if (layer.id == -1)
                map.removeLayer(layer);
            })

            if (data.route)
            {
              var polyline = L.polyline(data.route.map(x => [x.y, x.x]), {color: 'blue'}).addTo(map);
              var polylineLayer = L.layerGroup([polyline]);
              
              polylineLayer.id = -1;
              polylineLayer.addTo(map);

              map.fitBounds(polyline.getBounds());
            }
        }

        
    })


    return <div className='Map' id="map"></div>
  }

  export default connect((state) => ({data: state.SelectedReq, mapData: state.mapData}))(Map);