const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const gamesRoutes= require('./gamesRoutes');
const createGame= require('./createGame');
const genresRoutes= require('./genresRoutes');

const router = Router();

// Configurar los routers
router.use('/games',gamesRoutes);
router.use('/createGame',createGame);
router.use('/genres',genresRoutes);
module.exports = router;
