/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Games, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  id:900000,
  description:'aa',
  lanzamiento:'01-02-1997',
  rating:5.0,
  plataformas: ['PlayStation','Nintendo'],
  imagen:'www.abcd.com/dga.jpeg' 
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Games.sync({ force: true })
    .then(() => Games.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/createGame').expect(200)
    );
  });
});
