const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const axiosFunction = require('../helpers/axios.js');
const api = require('../helpers/dog_api')

async function getDog (id) {
    let localDog = [];
    let apiDog = [];
    let dogDetail = {};
    try {
        if (/\d/g.test(id) && /\D/g.test(id)) {       //LIMPIAR ESTO
            localDog.push(await Dog.findByPk(id, {include: {
                attributes:['name'],
                as: ['temperaments'],     //ver si el plural está bien
                model: Temperament}}))
        } else if(!isNaN(id)){
            let apiDogs = []
            await axiosFunction({url: `${api.BREEDS}`, cbSuccess: (apiDogs) => {
                apiDog = apiDogs.data.filter(d => d.id === parseInt(id))} , arr: apiDogs, id})
            // let apiDogs = await axios.get(`${api.BREEDS}`)
            // apiDog = apiDogs.data.filter(d => d.id === parseInt(id))
        }           //agrego un return en ambos finders?
        if(localDog){
            dogDetail = localDog.map(d => {
                //let temperament = d.temperament.split(', ')     //lo hago para emparejar el tratamiento que DogCard hace con los casos de getAllDogs (que son arreglo de arreglos para poder hacer filtros combinados)
                return {
                    image: d.image,
                    name: d.name,
                    temperament: d.temperament,
                    height: d.height.metric,
                    weight: d.weight.metric,
                    life_span: d.life_span,
                    origin: ["created"]
                }
            })
        }
        if(apiDog){
            dogDetail = apiDog.map(d => {
                if(d.temperament) { d.temperament = d.temperament.split(', ') } else { d.temperament = ['not temperament available '] }     //lo hago para emparejar el tratamiento que DogCard hace con los casos de getAllDogs (que son arreglo de arreglos para poder hacer filtros combinados)
                return {
                    image: d.image.url,
                    name: d.name,
                    temperament: d.temperament,
                    height: d.height.metric,
                    weight: d.weight.metric,
                    life_span: d.life_span,
                    origin: ["original"]
                }
            })
        }
        return dogDetail;
    } catch (error) {
        return ({error: error.message})
    } finally {
        console.log('done')
    }
}

module.exports = getDog;