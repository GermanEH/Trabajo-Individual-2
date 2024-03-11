import { Dog } from '../db.js'
import { postDog } from '../dao/dogDao.js'

export const postDogService = async (data) => { postDog(data) }