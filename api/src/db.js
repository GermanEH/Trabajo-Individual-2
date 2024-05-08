import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
import * as url from 'url';

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners

let files = await fs.promises.readdir(path.join(__dirname, '/dao/models'))

const modelDefiners = await Promise.all(files
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== __filename && file.slice(-3) === '.js'
  )
  .map(async(file) => {
    const model = await import(path.join((new URL('.', import.meta.url).toString()), '/dao/models', file))
    return model
  }))

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model.default(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dog, Temperament, Group, Origin } = sequelize.models;

Dog.belongsToMany(Temperament, { through: 'dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });
Dog.belongsToMany(Group, { through: 'dog_group' });
Dog.belongsToMany(Origin, { through: 'dog_origin' });
Group.belongsToMany(Dog, { through: 'dog_group' });
Origin.belongsToMany(Dog, { through: 'dog_origin' });

export { Dog, Temperament, Group, Origin, sequelize as conn }; // Exportamos los modelos y sequelize por separado
