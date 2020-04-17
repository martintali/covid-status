import axios from 'axios';
import { FETCH_WORLD, FETCH_COUNTRIES, REFRESH_PAGE } from 'actions/types';
import { FILTER_COUNTRY } from './types';

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

export const fetchCountries = () => async (dispatch) => {
  const response = await axios.get('https://corona.lmao.ninja/v2/countries');

  dispatch({
    type: FETCH_COUNTRIES,
    payload: response.data.sort((a, b) => b.cases - a.cases),
  });
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
