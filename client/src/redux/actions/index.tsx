import helpHTTP from '../../helpers/helpHTTP';
import axios from 'axios';

import {
  GET_ALL_DOGS,
  GET_SOME_DOGS,
  GET_DOG,
  SUCCESS_POST,

  //Types
  GET_TEMPERAMENTS,
  GET_GROUPS,
  GET_ORIGINS,
  DELETE_SELECTED_FILTER,
  ADD_SELECTED_FILTER,

  //Filters
  FILTER_DOGS,

  //Sorters
  SORT_DOGS,

  //Pokeball
  ADD_ADOPTED,
  REMOVE_ADOPTED,

  //Renderization
  SET_FILTERED,
  RENDER,
  PAGINATION,
  CLEAN_DOG,
  CLEAN_MESSAGE,

  //Error Handling
  ERROR,
  CLEAN_ERROR,
} from '../types/index.js';

const api = helpHTTP();

export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const response = await api.get('http://localhost:3001/dogs');
      if (!!response.err) {
        let error = `Error ${response.status}: ${response.statusText}`;
        dispatch({ type: ERROR, payload: error });
      } else if (!!response.data) {
        const data = response.data;
        dispatch({ type: GET_ALL_DOGS, payload: data });
        return data;
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const setFiltered = (dogs) => {
  return function (dispatch) {
    try {
      dispatch({ type: SET_FILTERED, payload: dogs });
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const response = await api.get('http://localhost:3001/temperaments');
      if (!!response.err) {
        console.log('entramos al error');
        let error = `Error ${response.status}: ${response.statusText}`;
        return dispatch({ type: ERROR, payload: error });
      } else if (!!response.data) {
        console.log('entramos al exito', response.data);
        const {temperaments, groups, origins} = response.data
        console.log
        const temperamentsSorted = temperaments.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        dispatch({ type: GET_TEMPERAMENTS, payload: temperamentsSorted });

        const groupsSorted = groups.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        dispatch({ type: GET_GROUPS, payload: groupsSorted });

        const originsSorted = origins.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        dispatch({ type: GET_ORIGINS, payload: originsSorted });
        return data;
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const getDogById = (dogId) => {

  return async function (dispatch) {

    try {

        const response = await api.get(`http://localhost:3001/dogs/${dogId}`);
        if (!!response.err) {
          let error = `Error ${response.status}: ${response.statusText}`;
          dispatch({ type: ERROR, payload: error });
        } else if (!!response.data) {
          let data = response.data;
          if (data.length === 0) {
            return dispatch({
              type: ERROR,
              payload: `Can't find dog with id: ${dog}`,
            });
          }
          dispatch({ type: GET_DOG, payload: data });
        }

    } catch (error) {

      return {error: error.message}

    }
  }
}

export const getDogByName = (dog, dogs) => {

  return async function(dispatch) {

    try {

    if (isNaN(dog)) {
      const response = await api.get(
        `http://localhost:3001/dogs/?name=${dog}`
      );
      
      console.log('entramos a dog name', response);
      
      if (!!response.err) {

        let error = `Error ${response.status}: ${response.statusText}`;
        dispatch({ type: ERROR, payload: error });

      } else if (!!response.data) {

        let data = response.data;

        if (data.length === dogs.length)

          dispatch({ type: ERROR, payload: 'Error 404: Not Found' }); //la url mal escrita del localhost me devuelve el total de dogs

        if (data.length === 0) {

          return dispatch({
            type: ERROR,
            payload: `Can't find dog with name: ${dog}`,
          });
        }

        dispatch({ type: GET_SOME_DOGS, payload: data });
      }
    }
    
  } catch (error) {

    dispatch({ type: ERROR, payload: error.message });

  } finally {

    console.log('done');
  }}
}

export const getDog = (dog, dogs) => {
  return async function (dispatch) {
    try {
      // if() {
      //     const response = await api.get(`http://localhost:3001/dogs/${dog}`)
      //     return dispatch({type: ERROR, payload: 'Please insert valid name or id'})
      // }
      if (dog.length === 0)
        return dispatch({
          type: ERROR,
          payload: 'Please insert valid name or id',
        });
      if (!isNaN(dog) || (/[a-zA-Z]/g.test(dog) && /[0-9._-]/g.test(dog))) {
        const response = await api.get(`http://localhost:3001/dogs/${dog}`);
        if (!!response.err) {
          let error = `Error ${response.status}: ${response.statusText}`;
          dispatch({ type: ERROR, payload: error });
        } else if (!!response.data) {
          let data = response.data;
          if (data.length === 0) {
            return dispatch({
              type: ERROR,
              payload: `Can't find dog with id: ${dog}`,
            });
          }
          dispatch({ type: GET_DOG, payload: data });
        }
      } else if (isNaN(dog)) {
        const response = await api.get(
          `http://localhost:3001/dogs/?name=${dog}`
        );
        console.log('entramos a dog name');
        if (!!response.err) {
          let error = `Error ${response.status}: ${response.statusText}`;
          dispatch({ type: ERROR, payload: error });
        } else if (!!response.data) {
          console.log('entramos a dog data');
          let data = response.data;
          if (data.length === dogs.length)
            dispatch({ type: ERROR, payload: 'Error 404: Not Found' }); //la url mal escrita del localhost me devuelve el total de dogs
          if (data.length === 0) {
            return dispatch({
              type: ERROR,
              payload: `Can't find dog with name: ${dog}`,
            });
          }
          dispatch({ type: GET_SOME_DOGS, payload: data });
        }
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      console.log('done');
    }
  };
};

export const createDog = (dog) => {
  return async function (dispatch) {
    try {
      let newDog = {
        image: dog.image,
        name: dog.name,
        minHeight: dog.minHeight,
        maxHeight: dog.maxHeight,
        minWeight: dog.minWeight,
        maxWeight: dog.maxWeight,
        minLifeSpan: dog.minLifeSpan,
        maxLifeSpan: dog.maxLifeSpan,
        temperament: dog.temperaments,
      };
      const response = await axios.post('http://localhost:3001/dogs', newDog);
      if (!!response.err) {
        let error = `Error ${response.status}: ${response.statusText}`;
        dispatch({ type: ERROR, payload: error });
      } else if (!!response.data) {
        return dispatch({ type: SUCCESS_POST, payload: response });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      console.log('done');
    }
  };
};

export const selectFilter = (selectedFilters, filter) => {
  return function (dispatch) {
    try {
      let included = [];
      for (const f of selectedFilters) {
        if (Object.values(f)[0] === Object.values(filter)[0]) included.push(f);
      }
      if (included.length) {
        return dispatch({ type: DELETE_SELECTED_FILTER, payload: filter });
      } else {
        return dispatch({ type: ADD_SELECTED_FILTER, payload: filter });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      console.log('done');
    }
  };
};

export const filter = (filters) => {
  return function (dispatch) {
    try {
      console.log('filter dogs', filters)
      dispatch({ type: FILTER_DOGS, payload: filters })
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      console.log('done');
    }
  };
};

export const sort = (sorters, filtered) => {
  return function (dispatch) {
    try {
      for(let key in sorters){
        if (key === 'name'){
          if (sorters[key] === 'asc') {
            filtered.sort(function (a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            });
          } else {
            filtered.sort(function (a, b) {
              if (b.name < a.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
          }
        } else {
          if (sorters[key] === 'asc') {
            filtered.sort(function (a, b) {
              a.weight.length < 3
                ? (a.firstItem = '00')
                : (a.firstItem = a.weight.split(' ').shift());
              b.weight.length < 3
                ? (b.firstItem = '00')
                : (b.firstItem = b.weight.split(' ').shift());
              a.lastItem = a.weight.split(' ').pop();
              if (a.lastItem < 10) a.lastItem = '0' + a.lastItem;
              b.lastItem = b.weight.split(' ').pop();
              if (b.lastItem < 10) b.lastItem = '0' + b.lastItem;
              if (a.lastItem < b.lastItem) return -1;
              if (a.lastItem > b.lastItem) return 1;
              if (a.firstItem < b.firstItem) return -1;
              if (a.firstItem > b.firstItem) return 1;
              return 0;
            });
          } else {
            filtered.sort(function (a, b) {
              a.weight.length < 3
                ? (a.firstItem = '00')
                : (a.firstItem = a.weight.split(' ').shift());
              b.weight.length < 3
                ? (b.firstItem = '00')
                : (b.firstItem = b.weight.split(' ').shift());
              a.lastItem = a.weight.split(' ').pop();
              if (a.lastItem < 10) a.lastItem = '0' + a.lastItem;
              b.lastItem = b.weight.split(' ').pop();
              if (b.lastItem < 10) b.lastItem = '0' + b.lastItem;
              if (b.lastItem < a.lastItem) return -1;
              if (b.lastItem > a.lastItem) return 1;
              if (b.firstItem < a.firstItem) return -1;
              if (b.firstItem > a.firstItem) return 1;
              return 0;
            });
          }
        }
      }
      dispatch({ type: SORT_DOGS, payload: filtered });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      console.log('done');
    }
  };
};

export const setRender = () => {
  return function (dispatch) {
    dispatch({ type: RENDER });
  };
};

export const pagination = (currentPage, filtered, pages) => {
  return function (dispatch) {
    try {
      if (pages === 'posteriores' && filtered.length > currentPage + 9) {
        let movePage = currentPage + 8;
        dispatch({ type: PAGINATION, payload: movePage });
      }
      if (!isNaN(pages)) {
        let movePage = 0 + 8 * (pages - 1);
        dispatch({ type: PAGINATION, payload: movePage });
      }
      if (pages === 'anteriores' && currentPage > 0) {
        let movePage = currentPage - 8;
        dispatch({ type: PAGINATION, payload: movePage });
      }
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      console.log('done');
    }
  };
};

export const cleanDog = () => {
  return {
    type: CLEAN_DOG,
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR,
  };
};

export const cleanMessage = () => {
  return {
    type: CLEAN_MESSAGE,
  };
};

export const adoption = (dog, adopted) => {
  return function (dispatch) {
    try {
      console.log(adopted);
      for (const d of adopted) {
        if (d.name === dog.name) {
          return dispatch({ type: REMOVE_ADOPTED, payload: dog.name });
        }
      }
      return dispatch({ type: ADD_ADOPTED, payload: dog });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    } finally {
      console.log('done');
    }
  };
};

//ver lo de return dispatch (algunos no tienen return)
