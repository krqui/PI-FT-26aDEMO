const { Games, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Games.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Games.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Games.create({ name: 'Super Mario Bros' })
          .then(()=> done())
          .catch(()=>done(new Error('It requires a valid name 2')));
      });
    });
  });
});
