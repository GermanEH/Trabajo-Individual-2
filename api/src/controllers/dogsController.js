import { Temperament } from '../db.js';
import { getAllDogsService } from '../services/getAllDogs.js';
import { getDogService } from '../services/getDog.js';
import { postDogService } from '../services/postDog.js';

export const getAllDogs = async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        //listado de las razas de perro que contengan la palabra ingresada
        const response = await getAllDogsService(name);
        return res.status(201).json(response);
      }
      const response = await getAllDogsService();
      return res.status(201).json(response);
    } catch (error) {
      return res.status(404).send({ error: error.message });
    } finally {
      console.log('done');
    }
  }

  export const getDogById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await getDogService(id);
      res.status(201).send(response);
    } catch (error) {
      res.status(404).send({ error: error.message });
    } finally {
      console.log('done');
    }
  }

  export const postDog = async (req, res) => {
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
      const dog = await postDogService(
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
  }