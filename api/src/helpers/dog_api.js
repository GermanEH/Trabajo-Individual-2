import { axiosFunction } from './axios.js';
import axios from 'axios';

const NAME = 'thedogapi',
  DOMAIN = `https://api.${NAME}.com`,
  API = `${DOMAIN}/v1`,
  BREEDS = `${API}/breeds`,
  IMAGES = `${API}/images`,
  SEARCH = `${BREEDS}/search?q=`,
  SEARCHIMAGE = `${IMAGES}/search?id=`

export {
  NAME,
  DOMAIN,
  API,
  BREEDS,
  IMAGES,
  SEARCH,
  SEARCHIMAGE,
};

export const getApiDogs = async () => {

  try {

  let apiDogs = [];
  
  await axiosFunction({
    url: `${BREEDS}?limit=25`,
    cbSuccess: (response) => {
      apiDogs = response.data.map(async (d) => {
        if (d.weight.metric === 'NaN')
          d.weight.metric = `${Math.floor(
            d.weight.imperial.split(' ', 1) / 2.25
          )} - ${Math.floor(d.weight.imperial.split(' ').pop() / 2.25)}`; // hay un perro que viene con weight.metric como NaN
        let temperament = d.temperament.split(', '); //es un string, no un arreglo (para poder hacer los filtros combinados necesito que cada temperamento sea un array independiente dentro del array padre)
        let response = await axios.get(
          `${IMAGES}/${d.reference_image_id}`
        );
        return {
          name: d.name,
          temperament: temperament,
          weight: d.weight.metric,
          height: d.height.metric,
          life_span: d.life_span,
          image: response.data.url,
          apiId: d.id,
          group: d.breed_group,
          bred_for: d.bred_for,
          origin: d.origin
        };
      });
    },
    arr: apiDogs,
  });

  return Promise.all([...apiDogs])

  } catch (error) {
    
    return { error: error.message };

  }
  
}

export const getApiDogById = async (id) => {

  await axiosFunction({
    url: `${API.BREEDS}`, 
    cbSuccess: (apiDogs) => {
    return apiDogs.data.filter(d => d.id === parseInt(id))
    }, 
    arr: apiDog, id
  })

}