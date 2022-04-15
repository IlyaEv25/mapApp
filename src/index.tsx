import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Layout } from 'antd';
import { Table, Tag, Space } from 'antd';

import { ResizableBox } from 'react-resizable';
import { store } from './store';

const { Header, Footer, Sider, Content } = Layout;

import Map from './components/map';
import App from './App';

import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css'
import './index.css';
import 'react-resizable/css/styles.css'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'


import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

var server: string = "http://localhost:3000/";



render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

