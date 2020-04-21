import axios from 'axios';
import {
  FILTER_COUNTRY,
  FETCH_WORLD,
  FETCH_COUNTRIES,
  REFRESH_PAGE,
  FETCH_COUNTRY,
} from 'actions/types';
import ipgeolocation, { GEOLOCATION_DEFAULT_PARAMS } from 'apis/ipgeolocation';
import { FETCH_LOCATION } from './types';

export const fetchAll = () => async (dispatch) => {
  dispatch(refreshPage(true));

  await dispatch(fetchWorld());
  await dispatch(fetchCountries());

  dispatch(refreshPage(false));
};

export const fetchWorld = () => async (dispatch) => {
  const response = await axios.get(
    'https://corona.lmao.ninja/v2/all?yesterday=false'
  );

  dispatch({
    type: FETCH_WORLD,
    payload: response.data,
  });
};

export const fetchCountries = (alone = false) => async (dispatch) => {
  const response = await axios.get('https://corona.lmao.ninja/v2/countries');

  dispatch({
    type: FETCH_COUNTRIES,
    payload: response.data.sort((a, b) => b.cases - a.cases),
  });

  if (alone) dispatch(refreshPage(false));
};

export const filterCountry = (searchTerm) => (dispatch, getState) => {
  const countries = getState().cases.countries;

  let filtered = getState().cases.countries;
  if (searchTerm) {
    filtered = countries.filter((country) =>
      country.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  dispatch({
    type: FILTER_COUNTRY,
    payload: filtered,
  });
};

export const refreshPage = (isRefreshing = true) => {
  return {
    type: REFRESH_PAGE,
    payload: isRefreshing,
  };
};

export const fetchLocation = () => async (dispatch, getState) => {
  let userLocation =
    getState().userLocation ||
    JSON.parse(localStorage.getItem('user_location'));

  if (!userLocation) {
    const response = await ipgeolocation.get(`/ipgeo`, {
      params: {
        apiKey: GEOLOCATION_DEFAULT_PARAMS.key,
        fields: 'geo',
      },
    });

    userLocation = response.data;
    localStorage.setItem('user_location', JSON.stringify(userLocation));
  }

  dispatch({
    type: FETCH_LOCATION,
    payload: userLocation,
  });
};

export const fetchCountry = (countryName) => async (dispatch) => {
  if (countryName) {
    const response = await axios.get(
      `https://corona.lmao.ninja/v2/historical/${countryName}?lastday=30`
    );

    dispatch({
      type: FETCH_COUNTRY,
      payload: response.data,
    });

    dispatch(refreshPage(false));
  } else {
    dispatch({
      type: FETCH_COUNTRY,
      payload: null,
    });
  }
};
