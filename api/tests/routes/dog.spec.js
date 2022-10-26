/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);

const dog = {
  name: 'Lolo',
  height: '2, 4',
  weight: '4, 5',
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

    xdescribe('GET /dogs', () => {
      it('should get 201', () => {
        const response = agent.get('/dogs')
        // console.log(response)
        .then((response) => {expect(response.status).to.equal(201)})
      });
      it('should get all dogs', () => {
        const response = agent.get('/dogs')
        .then((response) => {expect(response.data.length).to.equal(125)})
      });
      it('should get an external API dog by the name given by query', () => {
        const response = agent.get('/dogs/?name=Affenpinscher')
        .then((response) => {expect(response.name).to.equal('Affenpinscher')})
      });
      it('should get a locally created dog by name given by query', async () => {     //ESPERAR A CREAR UNO
        const response = await agent.get('/dogs/?name=Lolo')
        expect(response.name).to.equal('Lolo')
      });
      it('should get an external API dog by id given by params', () => {
        const response = agent.get('/dogs/2')
        .then((response) => {expect(response.name).to.equal('Afghan Hound')})
      });
      it('should get a locally created dog by id given by params', () => {            //ESPERAR A CREAR UNO
        const response = agent.get('/dogs/951') //COMPLETAR ID
        .then((response) => {expect(response.name).to.equal('')}) //COMPLETAR NOMBRE
      });
      it('if dog name does not exists returns an error message', () => {
        const response = agent.get('/dogs/?name=sart')
        .then((response) => {expect(response.error.message).to.equal('Not found')})
      });
      it('if dog id does not exists returns an error message', () => {
        const response = agent.get('/dogs/980')
        .then((response) => {expect(response.error.message).to.equal('Dog not found')})
      });
    });
    xdescribe('POST /dogs', () => {
      it('should add a new dog', () => {                  //CORREJIR ESTOS DOS TEST PARA QUE ESTÉN COMPLETOS
        const response = agent.post('/dog/create')
        .then((response) => {expect(response.status).toBe(200)})
        .then((response) => {expect(response.data).to.equal('Dog created successfully')})
      })
      it('should give an error message: "Falta el parámetro `name`"', () => {
        const response = agent.post('/dog/create')
        .then((response) => {expect(response.data.error).to.equal('Falta el parámetro `name`')})
      })
    })
    xdescribe('GET /temperaments', () => {
      it('should get temperaments list', () => {
        const response = agent.get('/temperaments')
        .then((response) => {expect(response.status).to.equal(201)})
          .then((response) => {expect(response.data.length).to.equal()}) //COMPLETAR DATA.LENGTH
      })
    })

});
