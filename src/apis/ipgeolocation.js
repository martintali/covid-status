import axios from 'axios';

export const GEOLOCATION_DEFAULT_PARAMS = {
  key: process.env.REACT_APP_GEOLOCATION_API_KEY,
};

export default axios.create({
  baseURL: 'https://api.ipgeolocation.io',
});
