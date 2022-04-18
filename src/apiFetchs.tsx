import {put, call} from 'redux-saga/effects'
import { GeoPoint, ReqData, ReqEntry } from './state';
import { ADD_TO_TABLE, EDIT_LIST, GET_SEARCH_LIST, PUT_DATA_MAP, SELECT } from './actions';

type listJSONEntry = {
   lat:number,
   lon:number,
   display_name: string
}

type RouteData = {
   routes: Array<{geometry: {coordinates: Array<Array<number>>}}>
}

async function read_route(options: string, coord0: Array<number>, coord1: Array<number>): Promise<RouteData>{
    try
    {
     var resp = await fetch(`http://router.project-osrm.org/route/v1/driving/${coord0[0]},${coord0[1]};${coord1[0]},${coord1[1]}?` + options);
     var str = await resp.text();
    }
    catch(e) {
        var str = "{}";
        console.log(e);
    }
    return JSON.parse(str)
  }
  
 async function get_coord(name: string): Promise<Array<number>>
 {
    return fetch(`https://nominatim.openstreetmap.org/search?q=${name}&format=json`).then(res =>res.json()).then(f => f[0]?[f[0].lon,  f[0].lat]:[])
 }
 
 async function get_list(name : string): Promise<Array<listJSONEntry>>
 {
    return fetch(`https://nominatim.openstreetmap.org/search?q=${name}&format=json`).then(res =>res.json());
 }
 
 
 const toGeoPoint = (coord : Array<number>, name: string  = "") => ({name : name, x: coord[0], y: coord[1]});
 
 export function* fetchSelect(action: {type: "SELECT_SAGA", key : number, from: string, to: string, route: ReqData | null})
 {
    console.log(action, !action.route);
    var reqData;
    if (!action.route)
    {
     var from: number[] = yield call(get_coord, action.from);
     var to : number[]= yield call(get_coord, action.to);
 
     var route_res: RouteData = yield call(read_route, "overview=full&geometries=geojson", from, to);
     var route = route_res.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord)) as GeoPoint[];
     //console.log(from, to, route.routes[0].geometry.coordinates);
     reqData = {
         from: toGeoPoint(from, action.from),
         to: toGeoPoint(to, action.to),
         route: route
       }
    }
    else
    {
     var route = action.route.route as GeoPoint[];
     reqData = {
         from: action.route.from,
         to: action.route.to,
         route: route
       }
    }
 
 
 
    yield put({type: PUT_DATA_MAP, data: reqData});
    yield put({type: SELECT, key: action.key});
 
 
 }
 
 
 export function* fetchGet(action: {type: "PUT_SAGA", data: ReqEntry})
 {
    console.log("!");
    var from: number[] = yield call(get_coord, action.data.from);
    var to: number[] = yield call(get_coord, action.data.to);
 
    var route: RouteData = yield call(read_route, "overview=full&geometries=geojson", from, to);
    //console.log(from, to, route.routes[0].geometry.coordinates);
 
    var reqData = {
       from: toGeoPoint(from, action.data.from),
       to: toGeoPoint(to, action.data.to),
       route: route.routes? route.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord)) : null
     }
 
 
    yield put({type: PUT_DATA_MAP, data: reqData});
    yield put({type: ADD_TO_TABLE, data: reqData})
 
 
 }
 
 export function* fetchEdit(action: {type: "EDIT_SAGA", key: number, from: string, to: string})
 {
    console.log("EDIT", action);
    var from: number[] = yield call(get_coord, action.from);
    var to: number[] = yield call(get_coord, action.to);
 
    var route: RouteData = yield call(read_route, "overview=full&geometries=geojson", from, to);
    //console.log(from, to, route.routes[0].geometry.coordinates);
 
    var reqData = {
       from: toGeoPoint(from, action.from),
       to: toGeoPoint(to, action.to),
       route: route.routes? route.routes[0].geometry.coordinates.map(coord => toGeoPoint(coord)) : null
     }
 
 
    yield put({type: PUT_DATA_MAP, data: reqData});
    yield put({type: EDIT_LIST, data: reqData, key: action.key})
 
 
 }
 
 export function* fetchSearchList(action: {type: "SEARCH_LIST_SAGA", str: string})
 {
    var name_list: listJSONEntry[] = yield call(get_list, action.str);
    console.log(name_list.map(entry => toGeoPoint([entry.lat, entry.lon], entry.display_name)));
    yield put({type: GET_SEARCH_LIST, list: name_list.map(entry => toGeoPoint([entry.lat, entry.lon], entry.display_name))});
 }