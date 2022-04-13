import React from 'react';
import { render } from 'react-dom'

import Map from './components/map';

import '../node_modules/leaflet/dist/leaflet.css'
import './index.css';

render(
  <Map start = "Петергоф" finish = "Исаакиевский собор"/>,
  document.getElementById('root')
);

