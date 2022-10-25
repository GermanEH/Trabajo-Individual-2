const { Dog } = require("../db");

async function postDog (name, height, weight, life_span, temperaments) {
        try {
            //no puedo modificar constantes (elementos destructurados como const y pasados por argumentos)
        const dog = await Dog.create({
            name,
            height,
            weight,
            life_span
        })
        await dog.setTemperaments(temperaments)
        return dog
    } catch (error) {
        return ({error: error.message})
    } finally {
        console.log('done')
    }
}

module.exports = postDog;