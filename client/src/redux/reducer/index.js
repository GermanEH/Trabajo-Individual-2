import {
  GET_ALL_DOGS,
  GET_SOME_DOGS,
  GET_DOG,
  SUCCESS_POST,

  //Types
  GET_TEMPERAMENTS,
  ADD_SELECTED_FILTER,
  DELETE_SELECTED_FILTER,

  //Filters
  FILTER_DOGS,
  FILTER_SOME_DOGS,

  //Sorters
  SORT_DOGS_BY_NAME,
  SORT_DOGS_BY_WEIGHT,

  //Pokeball
  ADD_ADOPTED,
  REMOVE_ADOPTED,

  //Renderization
  SET_FILTERED,
  PAGINATION,
  RENDER,
  CLEAN_SOME_DOGS,
  CLEAN_DOG,
  CLEAN_MESSAGE,

  //Error Handling
  ERROR,
  CLEAN_ERROR,
} from '../types/index.js';

const initialState = {
  dogs: [],
  temperament: [],
  someDogs: [],
  dog: {},
  adopted: [],
  filtered: [],
  selectedFilters: [],
  error: null,
  currentPage: 0,
  message: '',
  render: true,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_SOME_DOGS:
      return {
        ...state,
        someDogs: action.payload,
        dog: {},
      };
    case GET_DOG:
      return {
        ...state,
        dog: action.payload,
        someDogs: [],
      };
    case SUCCESS_POST:
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
        message: 'Dog created successfully!',
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperament: action.payload,
      };
    case ADD_SELECTED_FILTER:
      return {
        ...state,
        selectedFilters: [...state.selectedFilters, action.payload],
      };
    case DELETE_SELECTED_FILTER:
      return {
        ...state,
        selectedFilters: state.selectedFilters.filter(
          (filter) =>
            Object.values(filter)[0] !== Object.values(action.payload)[0]
        ),
      };
    case FILTER_DOGS:
      return {
        ...state,
        filtered: state.dogs.filter((dog) =>
          state.selectedFilters.every((filter) =>
            dog[Object.keys(filter)[0]].includes(Object.values(filter)[0])
          )
        ),
      };
    case FILTER_SOME_DOGS:
      return {
        ...state,
        filtered: state.someDogs.filter((dog) =>
          state.selectedFilters.every((filter) =>
            dog[Object.keys(filter)[0]].includes(Object.values(filter)[0])
          )
        ),
      };
    case SORT_DOGS_BY_NAME:
      return {
        ...state,
        filtered: action.payload,
        render: true,
      };
    case SORT_DOGS_BY_WEIGHT:
      return {
        ...state,
        filtered: action.payload,
        render: true,
      };
    case SET_FILTERED:
      return {
        ...state,
        filtered: action.payload,
      };
    case PAGINATION:
      return {
        ...state,
        currentPage: action.payload,
        render: true,
      };
    case RENDER:
      return {
        ...state,
        render: false,
      };
    case CLEAN_SOME_DOGS:
      return {
        ...state,
        someDogs: [],
      };
    case CLEAN_DOG:
      return {
        ...state,
        dog: {},
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAN_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAN_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case ADD_ADOPTED:
      return {
        ...state,
        adopted: [...state.adopted, action.payload],
      };
    case REMOVE_ADOPTED:
      return {
        ...state,
        adopted: state.adopted.filter((d) => d.name !== action.payload),
      };
    default:
      return state;
  }
}
