const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    xdescribe('name', () => {
      it('should throw an error if name is null', () => {
        Dog.create({name: null})
          .then(() => {throw new Error('It requires a valid name')})
          .catch(() => (error.message).toBeDefined());
      });
      it('should throw an error if name already exists', () => {
        Dog.create({ name: 'Pug' })
        .then(() => {throw new Error('The name already exists')})
        .catch(() => (error.message).toBeDefined());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Lolo', height: '4, 6', weight: '5, 6', temperament: []})   //completar con temp
        .then((response) => {expect(response).toBe('Dog created successfully')})          //era response o response.message?
      });
      it('should throw an error if its not a valid Height', () => {
        Dog.create({ name: 'Lola', height: '-1, a', weight: '5, 6', temperament: []})   //completar con temp})
          .then(() => {throw new Error('It requires a valid Height')})
          .catch(() => (error.message).toBeDefined());
      });
      it('should work when its a valid Height', () => {
        Dog.create({ name: 'Terchak', height: '4, 6', weight: '5, 6', temperament: []})   //completar con temp
        .then((response) => {expect(response).toBe('Dog created successfully')})
      });
      it('should throw an error if its not a valid Weight', () => {
        Dog.create({ name: 'Trufa', height: '4, 6', weight: 'asf, 1500'}) 
          .then(() => {throw new Error('It requires a valid Weight')})
          .catch(() => (error.message).toBeDefined());
      });
      it('should work when its a valid Weight', () => {
        Dog.create({ name: 'Elencio', height: '4, 6', weight: '5, 6', temperament: []})   //completar con temp
        .then((response) => {expect(response).toBe('Dog created successfully')})
      });
      it('should throw an error if its not a valid Life_Span', () => {
        Dog.create({ name: 'Koda', height: '4, 6', weight: '5, 6', life_span: 'asdf' })
          .then(() => {throw new Error('It requires a valid Life_Span')})
          .catch(() => (error.message).toBeDefined());
      });
      it('should work when its a valid Life_Span', () => {
        Dog.create({ name: 'Trufa', height: '4, 6', weight: '5, 6', life_span: '4, 5', temperament: []})   //completar con temp
        .then((response) => {expect(response).toBe('Dog created successfully')})
      });
      it('should throw an error if its not a valid Image', () => {
        Dog.create({ name: 'Terchak', height: '4, 6', weight: '5, 6', image: "1231" })
          .then(() => { throw new Error('It requires a valid Image')})
          .catch(() => (error.message).toBeDefined());
      });
      it('should work when its a valid Image', () => {
        Dog.create({ name: 'Terchak', height: '4, 6', weight: '5, 6', image: "" });       //completar con una imagen válida   temperament: []})   //completar con temp
      });
      it('should throw an error if temperament is empty', () => {
        Dog.create({ name: 'Koda', height: '4, 6', weight: '5, 6', temperament: [] })
          .then(() => { throw new Error('It requires a valid temperament') })
          .catch(() => (error.message).toBeDefined());
      });
      it('should work when its a valid temperament', () => {
        Dog.create({ name: 'Trufa', height: '4, 6', weight: '5, 6', temperament: []})   //completar con temp
      });
    });
  });
});
