import { getTemperamentsService } from '../services/getTemperaments.js'

export const getTemperaments = async (req, res) => {
    try {
      const response = await getTemperamentsService();
      res.status(201).send(response);
    } catch (error) {
      res.status(404).send({ error: error.message });
    } finally {
      console.log('done');
    }
  }