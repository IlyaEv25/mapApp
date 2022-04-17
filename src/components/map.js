import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import L from '../../node_modules/leaflet/dist/leaflet' 
import { SET_MAP } from '../actions'

const Map = ({data, mapPointer, dispatch}) => {
    useEffect(() => {

        if (!mapPointer)
        {
            var map = L.map('map');	
            dispatch({type: SET_MAP, map})
        }
        else
            var map = mapPointer;

        if (!map.HasLayer)
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1
            }).addTo(map);

        //var popup = L.popup().setContent('<p>Hello world!<br />This is a nice popup.</p>').openOn(map);
        
        //var map = L.map('map');
        if (data.from)
        {
            console.log(map);
            var polyline = L.polyline(data.route.map(x => [x.y, x.x]), {color: 'blue'}).addTo(map);
            map.fitBounds(polyline.getBounds());
        }

        
    })
    console.log("DATA", data);

    // if (data)
    // {
    //     var map = L.map('map');
    //     console.log(map);
    //     var polyline = L.polyline(data.route.map(x => [x.x, x.y]), {color: 'blue'}).addTo(map);
    //     map.fitBounds(polyline.getBounds());
    // }


    return <div className='Map' id="map"></div>
  }

  export default connect((state) => ({data: state.SelectedReq, mapPointer: state.mapPointer}))(Map);