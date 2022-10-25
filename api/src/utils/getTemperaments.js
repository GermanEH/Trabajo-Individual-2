const axios = require('axios');
const { Temperament } = require('../db.js');
const axiosFunction = require('../helpers/axios.js');
const api = require('../helpers/dog_api')

async function getTemperaments () {
    try {
        let temperaments = await Temperament.findAll()
        if(!temperaments.length) {
            temperaments = new Set ()
            await axiosFunction({url: `${api.BREEDS}`, cbSuccess: (request) => {
                request.data.forEach(a => getDogTemperaments(a))
            function getDogTemperaments(dog) {
                if(dog.temperament) {
                    let temperament = dog.temperament.split(", ");
                    for (const element of temperament) {
                        temperaments.add(element)
                    }
                }
            }
            } , arr: temperaments})
            // const request = await axios.get(`${api.BREEDS}`)
            // request.data.forEach(a => getDogTemperaments(a))
            // function getDogTemperaments(dog) {
            //     if(dog.temperament) {
            //         let temperament = dog.temperament.split(", ");
            //         for (const element of temperament) {
            //             temperaments.add(element)
            //     }
            //     }
            // }
            const tempArr = []
            for (const temperament of temperaments) {
                t = new Object({name: temperament})
                tempArr.push(t)
            }
            await Temperament.bulkCreate(tempArr)     
            return tempArr;
        } return temperaments;
    } catch (error) {
        return ({error: error.message})
    } finally {
        console.log('done')
    }
} 

//PROBLEMA: que hago con el ID? se crea solo, tiene sentido crear uno aparte?
//PROBLEMA: la primera vez que levanto la app, esta función trae sólo el nombre. después ya trae id, nombre, y timestamps

module.exports = getTemperaments;