const {Router} = require('express');
const axios= require('axios');
const {Games, Generos} = require('../db');
//const {Op}= require('sequelize');

const router=Router();
const functions= require('../controllers/gamesController.js');
// FALTA ESTO
let id=800002;
router.post('/',async function(req,res){
    const {name,description,released,rating,platforms,image,genres}=req.body;
    console.log(`El id del genero es: ${Number(genres[0])}`);
    if(!name||!description||!released||!platforms.length||!genres.length){
        return res.status(400).send('Campo faltante')
    }

    /*let post= await Games.create({
        id:id,
        name:name,
        description:description,
        lanzamiento:released,
        rating:rating,
        plataformas:platforms||['missing platforms'],
        imagen:image
    });
    ++id
    let GendersDisp=await Generos.findAll({
        where:{name:genres}
    })
    post.addGeneros(GendersDisp)
    res.send(`${name} ha sido agregado con exito`)*/
    /*TODO ESTO DE ABAJO ES DE PRUEBA*/
    let idgenero=Number(genres[0]);
    try{
        const videoGameValidator=await Games.findOne({//aca buscas si ya creaste el videojuego
            where:{
                name:name,
            },
            include:[{
                model:Generos,
                where:{id:idgenero}
                //where:{id:genres[0]}// pongo asi porque desde el front creo que manda un arreglo
            }]
        });

        if(videoGameValidator===null){
            const [createGame,created]=await Games.findOrCreate({
                where: {
                    id:id,
                    name:name,
                    description:description,
                    lanzamiento:released,
                    rating:rating,
                    plataformas:platforms||['missing platforms'],
                    imagen:image
                },
            });
            ++id
            console.log(`El id es ahora ${id}`);
            const findGames=await Generos.findAll({
                where:{
                    id:idgenero
                },
            });
            await createGame.addGeneros(findGames);
            return res.send('Videojuego creado');
        } else {
            return res.send('Ya existe el videojuego')
        }
    }catch(error){
        console.log(error);
    }
});


router.get('/',(req,res)=>{
    
    Generos.findAll()
        .then((result)=>res.json(result))
        .catch((error)=>res.status(404).json('Error con la base de datos de Generos.'))
})


router.get('/:id',async(req,res)=>{
    let {id}=req.params

    if(id<800000){
        let gameApi=(await axios.get(`https://api.rawg.io/api/games/${id}?key=c914ea29483145d2962820e989c9538b`)).data
        //console.log(gameApi);

        let game2={
            "name":gameApi.name,
            "image":gameApi.background_image,
            "genres":gameApi.genres.map(gen=>gen.name),
            "description":gameApi.description_raw,
            "rating":gameApi.rating,
            "platforms":gameApi.platforms.map(plat=>plat.platform.name),
            "lanzamiento":gameApi.released
        }
        //console.log(game2);
        res.send(game2)
    } else if (id>=800000){
        let gameDB= await functions.DB()
        //console.log(gameDB);
        let gameDB2=gameDB.filter(game=>game.id==id)
        let gameDB3=gameDB2.map(game=>{
            return {
                name:game.name,
                image:game.imagen,
                // ↓UN GATO LO HIZO
                //genres:game.genres,
                description:game.description,
                rating:game.rating,
                platforms:game.plataformas,
                lanzamiento:game.lanzamiento
                
            }
        })
        let gameDB4=gameDB3[0]
        res.send(gameDB4)
    } else {
        res.send(null)
    }
})
module.exports=router;