const {Router} = require('express');
const axios = require('axios');
const {API_KEY} = require('../db.js');
const {getAllGenres} = require('../controllers/genresController.js');
//const {Op} = require('sequelize');
const functions= require('../controllers/gamesController.js')
let contador=0;
const router=Router();

router.get('/', async(req,res)=>{
    const {name}= req.query;

    try {
        const videosAPI=await functions.ALL();
        if (contador==0){
        //await getAllGames()
        await getAllGenres()
        contador=contador+1;
        console.log(`El contador es ${contador}`)}
    if (name){
        let api= (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)).data.results;
        let result= api.map(game=>{
            return {
                id:game.id,
                name:game.name,
                imagen:game.background_image,
                genre:game.genres.map(gen=>gen.name),
                rating:game.rating
            }
        })
        let db=await functions.DB()
        let result2= db.filter(game=>game.name.toLowerCase().includes(name.toLowerCase()))
        let result3= result2.concat(result)

        if(result3.length>15){
            let newResult=result3.slice(0,15)
            return res.send(newResult)
        }
        if(result3.length>0){
            res.send(result3)
        } else {
            res.status(400).send('no hubo resultados')
        }
    } else {
        res.status(200).send(videosAPI)
    }

    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});


// ACA VENDRIA LA RUTA DELETE
/*router.delete('/:id',async function (req,res){
    let {id}=req.params
    try{
        await Games.destroy({where:{id:id.toString()}})
        res.send('deleted');
    } catch(e){
        console.log(e);
    }
})*/

module.exports= router;