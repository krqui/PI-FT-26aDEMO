const {Router} = require('express');
const axios = require('axios');
const {Games, Generos} = require('../db.js');
//const {getAllGames} = require('../controllers/gamesController.js');
const {getAllGenres} = require('../controllers/genresController.js');
//const {Op} = require('sequelize');
const functions= require('../controllers/gamesController.js')
let contador=0;
const router=Router();

router.get('/', async(req,res)=>{
    const {name}= req.query;

    //let options={};
    
    try {
        const videosAPI=await functions.ALL();
        if (contador==0){
        //await getAllGames()
        await getAllGenres()
        contador=contador+1;
        console.log(`El contador es ${contador}`)}
    if (name){
        let api= (await axios.get(`https://api.rawg.io/api/games?key=c914ea29483145d2962820e989c9538b&search=${name}`)).data.results;
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
        res.send(videosAPI)
    }

    /*if (name) {
            options= {
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    }
                }
            }
        }*/

        /*const nameSearch= await Games.findAll({...options,include: {
            model:Generos,
            attributes:['name','id'],
            through:{attributes:[]},
        }})


        if (!nameSearch.length) return res.status(404).send(`El videojuego '${name}' no arrojo ningun resultado.`)
        res.json(nameSearch)*/
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});

/*router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        if (contador==0){
            //await getAllGames()
            await getAllGenres()
            contador=contador+1;
            console.log(`El contador es ${contador}`)}
    const idSearch= await Games.findOne({
        where:{
            id:id.toUpperCase()
        },
        include: {
            model:Generos,
            attributes:['name','id'],
            through:{attributes:[]},
        }
    })

    if(!idSearch) return res.status(404).send(`El id ${id} no corresponde a un videojuego existente.`)
    res.json(idSearch)
    } catch (error){
        console.log(error);
    }
});*/


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