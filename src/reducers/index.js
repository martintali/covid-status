import { combineReducers } from 'redux';
import {
  FETCH_ALL,
  FETCH_WORLD,
  FETCH_COUNTRIES,
  FETCH_COUNTRY,
  FETCH_LOCATION,
  FILTER_COUNTRY,
  REFRESH_PAGE,
} from 'actions/types';

const INITAL_FETCH_VALUES = {
  global: {},
  countries: [],
  filteredCountries: [],
  country: null,
  historical: null,
};

const cases = (prevState = INITAL_FETCH_VALUES, action) => {
  switch (action.type) {
    case FETCH_WORLD:
      return { ...prevState, global: action.payload };
    case FETCH_COUNTRIES:
      return {
        ...prevState,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case FETCH_COUNTRY:
      return { ...prevState, country: action.payload };
    case FILTER_COUNTRY:
      return { ...prevState, filteredCountries: action.payload };
    case FETCH_ALL:
      return { ...prevState, historical: action.payload };
    default:
      return prevState;
  }
};

const refreshPage = (prevState = true, action) => {
  if (action.type === REFRESH_PAGE) {
    return action.payload;
  }
  return prevState;
};

const userLocation = (prevState = null, action) => {
  if (action.type === FETCH_LOCATION) {
    return action.payload;
  }
  return prevState;
};

export default combineReducers({
  cases: cases,
  isLoading: refreshPage,
  userLocation: userLocation,
});
