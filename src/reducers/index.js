import { combineReducers } from 'redux';
import {
  FETCH_WORLD,
  FETCH_COUNTRIES,
  FILTER_COUNTRY,
  REFRESH_PAGE,
} from 'actions/types';

const INITAL_FETCH_VALUES = {
  global: {},
  countries: [],
  filteredCountries: [],
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
    case FILTER_COUNTRY:
      return { ...prevState, filteredCountries: action.payload };
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

export default combineReducers({
  cases: cases,
  isLoading: refreshPage,
});
