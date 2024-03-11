import { getLocalDogById } from '../dao/dogDao.js'

export const getDogService = async (id) => {

    try {
        console.log('getDogService')
        let dogDetail = {};

        if ((/[a-zA-Z]/g.test(id) && /[0-9._-]/g.test(id))) {

            dogDetail = getLocalDogById(id)

        } else if (!isNaN(id)) {

            dogDetail =  getApiDogById(id)
            dogDetail = dogDetail.map(d => {
                if(d.temperament) { d.temperament = d.temperament.split(', ') } else { d.temperament = ['not temperament available '] }     
                //lo hago para emparejar el tratamiento que DogCard hace con los casos de getAllDogs (que son arreglo de arreglos para poder hacer filtros combinados)
                return {
                    id: d.id,
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