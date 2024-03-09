const axiosFunction = require('../helpers/axios.js');
const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db.js');
const api = require('../helpers/dog_api.js');


const checkForLocalDogs = async (name) => {

  try {
    let localDogs
    if(!name) {

      localDogs = await Dog.findAll()
      
      const dogs = localDogs.map(localDog => localDog.dataValues)

      return dogs
  
    } else if (name) {
  
      const dogs = await Dog.findAll({
        where: { name: { [Op.substring]: name } },
        include: {
          attributes: ['name'],
          as: ['temperament'],
          model: Temperament,
        },
      }).then((data) =>
        data.map((d) => {
          let temperament = d.temperaments.map((t) => t.name);
          return {
            id: d.ID,
            image: d.image,
            name: d.name,
            temperament: temperament,
            weight: d.weight,
            // origin: ['created'],
          };
        })
      ); 
  
      return Promise.all([...dogs])
  
    }
    
  } catch (error) {
    
    return {error: error.message}

  }
  
  
}

const getApiDogs = async () => {

  try {

  let apiDogs = [];

  await axiosFunction({
    url: `${api.BREEDS}?limit=25`,
    cbSuccess: (response) => {
      apiDogs = response.data.map(async (d) => {
        if (d.weight.metric === 'NaN')
          d.weight.metric = `${Math.floor(
            d.weight.imperial.split(' ', 1) / 2.25
          )} - ${Math.floor(d.weight.imperial.split(' ').pop() / 2.25)}`; // hay un perro que viene con weight.metric como NaN
        let temperament = d.temperament.split(', '); //es un string, no un arreglo (para poder hacer los filtros combinados necesito que cada temperamento sea un array independiente dentro del array padre)
        let response = await axios.get(
          `${api.IMAGES}/${d.reference_image_id}`
        );
        return {
          id: d.id,
          image: response.data.url,
          name: d.name,
          temperament: temperament,
          weight: d.weight.metric,
          height: d.height.metric,
          life_span: d.life_span
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

const saveToDataBase = async (data) => {
  
  const newLocalDogs = await Dog.bulkCreate(data)

  const dogs = newLocalDogs.map(newLocalDog => newLocalDog.dataValues)

  return dogs

}

async function getAllDogs(name) {

  try {

    let dogs = await checkForLocalDogs()

    if(dogs.length === 0) {

      const data = await getApiDogs(name)

      dogs = await saveToDataBase(data)

      return await checkForLocalDogs()

    }

    return dogs

  } catch (error) {

    return { error: error.message };

  }

}
module.exports = getAllDogs;