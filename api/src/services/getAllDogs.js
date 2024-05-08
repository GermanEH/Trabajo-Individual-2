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

      //We don't save api dogs to database because it's a requirement of the assignment not to do it.

      // dogs = await saveApiDogsToDatabase(data)

      return data

    }

    return dogs

  } catch (error) {

    return { error: error.message };

  }

}