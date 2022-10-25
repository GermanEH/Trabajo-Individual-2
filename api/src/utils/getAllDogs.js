const axiosFunction = require('../helpers/axios.js');
const axios = require('axios')
const { Op } = require("sequelize");
const { Dog, Temperament } = require('../db.js');
const api = require('../helpers/dog_api.js')

async function getAllDogs (name) {
    try {
        if(name) {
            let localDogs = await Dog.findAll({where:{name: {[Op.substring]:name}},
                            include: { attributes:['name'], as: ['temperament'],
                            model: Temperament}}).then(data => data.map(d => {
                                let temperament = d.temperaments.map(t => t.name)
                                return {
                                id: d.ID,
                                image: d.image,
                                name: d.name,
                                weight: d.weight.metric,
                                temperament: temperament,
                                origin: ["created"]
                                }
                            }))
            let someApiDogs = []
            await axiosFunction({url: `${api.SEARCH}${name}`, cbSuccess: (response) =>  {
                someApiDogs = response.data.map(async d => {
                    const dogs = await axios.get(`${api.BREEDS}`)
                    let image = ""
                    if (d.reference_image_id) {
                        const dog = await dogs.data.find(dg => dg.image.id === d.reference_image_id)
                        image = dog.image.url
                        if(d.weight.metric === 'NaN') d.weight.metric = (`${Math.floor(d.weight.imperial.split(' ', 1) / 2.25)} - ${Math.floor(d.weight.imperial.split(' ').pop() / 2.25)}`); // hay un perro que viene con weight.metric como NaN
                        if(d.temperament) { d.temperament = d.temperament.split(', ') } else { d.temperament = ['not temperament available '] }    //lo hago para emparejar el tratamiento que DogCard hace con los casos de getAllDogs SIN name (que son arreglo de arreglos para poder hacer filtros combinados)
                        return {
                            image: image,
                            name: d.name,
                            temperament: d.temperament,
                            weight: d.weight.metric,
                            origin: ["original"]
                        }
                    }
                        if(d.weight.metric === 'NaN') d.weight.metric = (`${Math.floor(d.weight.imperial.split(' ', 1) / 2.25)} - ${Math.floor(d.weight.imperial.split(' ').pop() / 2.25)}`); // hay un perro que viene con weight.metric como NaN
                        if(d.temperament) { d.temperament = d.temperament.split(', ') } else { d.temperament = ['not temperament available '] }    //lo hago para emparejar el tratamiento que DogCard hace con los casos de getAllDogs SIN name (que son arreglo de arreglos para poder hacer filtros combinados)
                        return {                    //algunos de estos perros no tienen imagen (no aparecen en breeds tampoco) //también podría haber puesto image - defaultValue: null en el modelo de Dog
                            image: 'not image available',
                            name: d.name,
                            temperament: d.temperament,
                            weight: d.weight.metric,
                            origin: ["original"]
                        }
                    })
            }, arr: someApiDogs})

            return Promise.all([...localDogs, ...someApiDogs])
        } 
        if(!name) {
            let localDogs = await Dog.findAll({
                            include: { attributes:['name'], as: ['temperament'],
                            model: Temperament}}).then(data => data.map(d => {
                                let temperament = d.temperaments.map(t => t.name)
                                return {
                                id: d.ID,
                                image: d.image,
                                name: d.name,
                                weight: d.weight.metric,
                                temperament: temperament,
                                origin: ["created"]
                                }
                            }))
            let apiDogs = []
            await axiosFunction({url: `${api.BREEDS}?limit=125`, cbSuccess: (response) => {
                apiDogs = response.data.map(d => {
                if(d.weight.metric === 'NaN') d.weight.metric = (`${Math.floor(d.weight.imperial.split(' ', 1) / 2.25)} - ${Math.floor(d.weight.imperial.split(' ').pop() / 2.25)}`); // hay un perro que viene con weight.metric como NaN
                let temperament = d.temperament.split(', ') //es un string, no un arreglo (para poder hacer los filtros combinados necesito que cada temperamento sea un array independiente dentro del array padre)
                return {
                    id: d.id,
                    image: d.image.url,
                    name: d.name,
                    temperament: temperament,
                    weight: d.weight.metric,
                    origin: ["original"]
                }})}, arr: apiDogs
            })
            return [...apiDogs, ...localDogs];
        }
    } catch (error) {
        return ({error: error.message})
    } finally {
        console.log('done')
    }
}

module.exports = getAllDogs;