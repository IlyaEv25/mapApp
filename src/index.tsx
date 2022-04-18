import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store';

import App from './App';

import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css'
import './index.css';
import 'react-resizable/css/styles.css'



render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

