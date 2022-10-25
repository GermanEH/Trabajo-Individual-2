const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const axiosFunction = require('../helpers/axios.js');
const api = require('../helpers/dog_api')

async function getDog (id) {
    let localDog = [];
    let apiDog = [];
    let dogDetail = {};
    try {
        if ((/[a-zA-Z]/g.test(id) && /[0-9._-]/g.test(id))) {
            localDog.push(await Dog.findOne({where: {ID: id},
                include: {
                attributes:['name'],
                as: ['temperaments'],     
                model: Temperament}}))
        } else if(!isNaN(id)){
            let apiDogs = []
            await axiosFunction({url: `${api.BREEDS}`, cbSuccess: (apiDogs) => {
                apiDog = apiDogs.data.filter(d => d.id === parseInt(id))} , arr: apiDogs, id})
        }      
        if(localDog.length > 0){
            dogDetail = localDog.map(d => {
                let temperament = d.temperaments.map(t => t.temperament)
                //los temperamentos de dogs locales vienen como arreglos con el includes, no como strings en el caso de API
                return {
                    image: d.image,
                    name: d.name,
                    temperament: temperament,
                    height: d.height.metric,
                    weight: d.weight.metric,
                    life_span: d.life_span,
                    origin: ["created"]
                }
            })
        }
        if(apiDog.length > 0){
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