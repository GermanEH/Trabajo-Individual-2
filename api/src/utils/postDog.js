const { Dog } = require("../db");

async function postDog (name, height, weight, life_span, image, temperaments) {
        try {
        const dog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image
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