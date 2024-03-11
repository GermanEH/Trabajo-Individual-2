import { Temperament } from '../db.js';
import { axiosFunction } from '../helpers/axios.js';
import { BREEDS } from '../helpers/dog_api.js';

export const getTemperaments = async () => {
    
     let temperaments = await Temperament.findAll()
     
     return temperaments.map(localDog => localDog.dataValues)

}

export const createTemperaments = async () => {

    let temperaments = new Set ()
    
    await axiosFunction({
        url: `${BREEDS}`, 
        cbSuccess: (response) => {
        response.data.forEach(a => getDogTemperaments(a))
        function getDogTemperaments(dog) {
        if(dog.temperament.length>0) {
            let temperament = dog.temperament.split(', ')
            for (const element of temperament) {
                temperaments.add(element)
            }
        }}
        }, 
        arr: temperaments})

    let tempArr = []
    temperaments.forEach(t => {
        t = new Object({name: t})
        tempArr.push(t)
    })

    temperaments = await Temperament.bulkCreate(tempArr)

    return temperaments.map(localDog => localDog.dataValues)

}
