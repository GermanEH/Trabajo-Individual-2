import { Dog } from '../db.js';
import { Op } from 'sequelize';

export const getLocalDogs = async () => {

    const localDogs = await Dog.findAll()

    return localDogs.map(localDog => localDog.dataValues)

}

export const getLocalDogsByName = async (name) => {

  const localDogs = await Dog.findAll({
        where: { name: { [Op.substring]: name } }
      })
  
  const dogs = localDogs.map(localDogs => localDogs.dataValues)

  return Promise.all([...dogs])

}

export const getLocalDogById = async (id) => {

    const localDog = await Dog.findOne({where: {id: id}})

    return localDog?.dataValues

}

export const saveApiDogsToDatabase = async (data) => {
  
    const newLocalDogs = await Dog.bulkCreate(data)

    const dogs = newLocalDogs.map(newLocalDog => newLocalDog.dataValues)
  
    return dogs
  
}

export const postDog = async (data) => {

  try {
    const { name, height, weight, life_span, image, temperaments } = data

    const dog = await Dog.create({
        id,
        name,
        height,
        weight,
        life_span,
        image
    })

    await dog.setTemperaments(temperaments)

    return dog

} catch (error) {

    return ({error: error.message})

} finally {

    console.log('done')
}

}