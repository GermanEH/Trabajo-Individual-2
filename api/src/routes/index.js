import { Router } from 'express';
import { getAllDogs, getDogById, postDog } from '../controllers/dogsController.js';
import { getTemperaments } from '../controllers/temperamentsController.js';

export const router = Router();


router.get('/dogs/:id', getDogById);

router.post('/dogs', postDog);

router.get('/temperaments', getTemperaments);

router.get('/dogs', getAllDogs);