const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const router = Router();

const getAllDogs = require('../utils/getAllDogs');
const getDog = require('../utils/getDog');
const getTemperaments = require('../utils/getTemperaments');
const postDog = require('../utils/postDog');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      //listado de las razas de perro que contengan la palabra ingresada
      const response = await getAllDogs(name);
      return res.status(201).json(response);
    }
    const response = await getAllDogs();
    return res.status(201).json(response);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  } finally {
    console.log('done');
  }
});

router.get('/dogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getDog(id);
    res.status(201).send(response);
  } catch (error) {
    res.status(404).send({ error: error.message });
  } finally {
    console.log('done');
  }
});
router.post('/dogs', async (req, res) => {
  const {
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    minLifeSpan,
    maxLifeSpan,
    image,
    temperament,
  } = req.body;
  if (!name || !temperament) {
    throw new Error('Missing dog name or Temperament');
  }

  let height = `${[minHeight, maxHeight]}`;
  let weight = `${[minWeight, maxWeight]}`;
  let life_span = `${[minLifeSpan, maxLifeSpan]}`;

  let temperaments = [];
  for (const t of temperament) {
    const selectedTemperament = await Temperament.findOne({
      where: { name: t },
    });
    temperaments.push(selectedTemperament.id);
  }
  try {
    const dog = await postDog(
      name,
      height,
      weight,
      life_span,
      image,
      temperaments
    );
    res.status(201).send(dog);
  } catch (error) {
    res.status(404).send({ error: error.message });
  } finally {
    console.log('done');
  }
});
router.get('/temperaments', async (req, res) => {
  try {
    console.log('entramos a temperaments');
    const response = await getTemperaments();
    res.status(201).send(response);
  } catch (error) {
    res.status(404).send({ error: error.message });
  } finally {
    console.log('done');
  }
});

module.exports = router;
