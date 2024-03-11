import { getApiDogs } from '../helpers/dog_api.js';
import { getLocalDogs, getLocalDogsByName, saveApiDogsToDatabase } from '../dao/dogDao.js'

const checkForLocalDogs = async (name) => {

  try {

    if(!name) {

      return getLocalDogs()
  
    } else if (name) {
  
      return getLocalDogsByName(name)

    }
    
  } catch (error) {
    
    return {error: error.message}

  }
  
}

export const getAllDogsService = async (name) => {

  try {
    
    let dogs = await checkForLocalDogs(name)

    if(dogs.length === 0) {

      const data = await getApiDogs()

      dogs = await saveApiDogsToDatabase(data)

      return await checkForLocalDogs(name)

    }

    return dogs

  } catch (error) {

    return { error: error.message };

  }

}