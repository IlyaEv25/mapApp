import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet' 
import { SET_MAP } from './actions'
import { ReqData, State } from './state';
import { Dispatch } from 'redux';

L.Icon.Default.imagePath='images/';

type MapProps = {
    data: ReqData,
    mapData: L.Map | null,
    dispatch: Dispatch
}

type idedLayer = L.Layer & {id? : number};

const Map = ({data, mapData, dispatch}: MapProps) => {
    useEffect(() => {

        if (!mapData)
        {
            var map = L.map('map', {
                center: L.latLng(51.505, -0.09),
                zoom: 13
              });
              
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
            var map = mapData;

        map.invalidateSize();

        console.log("PRED", data);
        if (data.from && data.to)
        {
            map.eachLayer(layer_p => {
              const layer = layer_p as idedLayer;   
              if (layer.id == -1)
                map.removeLayer(layer);
            })

            if (data.route)
            {
              var polyline = L.polyline(data.route.map(x => [x.y, x.x]), {color: 'blue'}).addTo(map);
              var marker_from = L.marker([data.from.y, data.from.x]).addTo(map);
              var marker_to = L.marker([data.to.y, data.to.x]).addTo(map);

              var t_polyline = polyline as idedLayer;
              var t_m_from = marker_from as idedLayer;
              var t_m_to = marker_to as idedLayer;

              var polylineLayer = L.layerGroup([t_polyline, t_m_from, t_m_to]);
              
              //polylineLayer.id = -1;
              t_polyline.id = -1;
              t_m_from.id = -1;
              t_m_to.id = -1;

              polylineLayer.addTo(map);

              map.fitBounds(polyline.getBounds());
            }
        }

        
    })


    return <div className='Map' id="map"></div>
  }

  export default connect((state: State) => ({data: state.SelectedReq, mapData: state.mapPointer}))(Map);