const {Router} = require('express');
const {Generos} = require('../db.js');
const router = Router();

router.get('/',(req,res)=>{
    Generos.findAll()
        .then((result)=>res.json(result))
        .catch((error)=>res.status(404).json('Error con la base de datos de Generos.'))
});
module.exports= router;