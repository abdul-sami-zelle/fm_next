import React from 'react'
import 'leaflet/dist/leaflet.css';
import axios from 'axios';


axios.interceptors.request.use(config => {
  if (config.url?.includes("undefined")) {
    console.error("🚨 Bad API URL found:", config.url);
    console.trace();
  }
  return config;
});

const App = ({ Component, pageProps }) => {

  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
  
}

export default App