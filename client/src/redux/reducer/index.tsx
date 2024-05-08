import {
  GET_ALL_DOGS,
  GET_DOG,
  SUCCESS_POST,

  //Types
  GET_TEMPERAMENTS,
  GET_GROUPS,
  GET_ORIGINS,

  //Filters
  FILTER_DOGS,

  //Sorters
  SORT_DOGS,

  //Pokeball
  ADD_ADOPTED,
  REMOVE_ADOPTED,

  //Renderization
  PAGINATION,
  RENDER,
  CLEAN_DOG,
  CLEAN_MESSAGE,

  //Error Handling
  ERROR,
  CLEAN_ERROR,
} from '../types/index.js';

const initialState = {
  dogs: [],
  temperament: [],
  group: [],
  origin: [],
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
        filtered: action.payload
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
    case GET_GROUPS:
      return {
        ...state,
        group: action.payload,
      };
    case GET_ORIGINS:
      return {
        ...state,
        origin: action.payload,
      };
    case FILTER_DOGS:
      return {
        ...state,
        filtered: action.payload.length > 0 ? state.dogs.filter((dog) => {
            return action.payload.every((filter) => {
              return dog[Object.keys(filter)[0]].includes(Object.values(filter)[0])
            })
        }) : state.dogs,
        error: (action.payload.length > 0 && state.filtered.filter((dog) => {
          return action.payload.every((filter) => {
            return dog[Object.keys(filter)[0]].includes(Object.values(filter)[0])
          })
      }).length === 0) ? 'No dogs matching ' : false
      };
    case SORT_DOGS:
      return {
        ...state,
        filtered:action.payload
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
