import { Temperament, Group, Origin } from '../db.js';
import { axiosFunction } from '../helpers/axios.js';
import { BREEDS } from '../helpers/dog_api.js';

export const getTemperaments = async () => {

     let temperaments = await Temperament.findAll()

     return temperaments.map(localDog => localDog.dataValues)

}

export const getGroups = async () => {

     let groups = await Group.findAll()

     return groups.map(localDog => localDog.dataValues)

}

export const getOrigins = async () => {

     let origins = await Origin.findAll()

     return origins.map(localDog => localDog.dataValues)

}

export const createTemperaments = async () => {

    console.log('entramos a createTemperaments')
    let temperaments = new Set ()
    let groups = new Set()
    // let bred_for = new Set()
    let origins = new Set()
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
            }
            groups.add(dog.breed_group )
            // bred_for.add(dog.bred_for)
            // if(dog.origins.length>0) {
            //     let origin = dog.origin.split(', ')
            //     for (const element of origin) {
            //         origins.add(element)
            //     }
            // }
            origins.add(dog.origin)
        }
        },
        arr: temperaments})
    console.log('cerramos AxiosFunction')

    let tempArr = []
    temperaments.forEach(t => {
        t = new Object({name: t})
        tempArr.push(t)
    })

    temperaments = await Temperament.bulkCreate(tempArr)
    console.log('ESTOS tempArr SON LOS CREADOS', tempArr)

    console.log('buscamos los groupArr')
    let groupArr = []
    groups.forEach(t => {
        if(t) {
            t = new Object({name: t})
            return groupArr.push(t)
        } else return
    })
    console.log('estos son los groupArr', groupArr)
    groups = await Group.bulkCreate(groupArr)
    console.log('LOS groupArr GRUPOS CREADOS', groupArr)

    // bred_for = await
    console.log('buscamos los originArr')

    let originArr = []
    origins.forEach(t => {
        if(t) {
            t = new Object({name: t})
            return originArr.push(t)
        } else return
    })
    console.log('estos son los originArr', originArr)

    origins = await Origin.bulkCreate(originArr)
    console.log('LOS originArr ORIGIN CREADOS', originArr)

    return {
        temperaments: temperaments.map(localDog => localDog.dataValues),
        groups: groups.map(localDog => localDog.dataValues),
        origins: origins.map(localDog => localDog.dataValues)
    }

}
