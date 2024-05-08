import { getTemperaments, createTemperaments } from '../dao/temperamentDao.js'

export const getTemperamentsService = async () => {

    try {

        let temperaments = await getTemperaments()

        if(!temperaments.length) {

            return await createTemperaments() 
                
        } 
        console.log(temperaments)
        return temperaments;

    } catch (error) {

        return ({error: error.message})

    } finally {

        console.log('done')
    }
} 

//PROBLEMA: que hago con el ID? se crea solo, tiene sentido crear uno aparte?
//PROBLEMA: la primera vez que levanto la app, esta función trae sólo el nombre. después ya trae id, nombre, y timestamps