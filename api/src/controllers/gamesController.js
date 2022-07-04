const axios=require('axios');
const e = require('express');
const {Games,Generos ,API_KEY} = require('../db');
//let aver=API_KEY.slice(1,0);
module.exports={
    API:async function allGamesApi(){
    
    const catalogo1= axios.get(`https://api.rawg.io/api/games?key=c914ea29483145d2962820e989c9538b&page=1`);
    const catalogo2= axios.get(`https://api.rawg.io/api/games?key=c914ea29483145d2962820e989c9538b&page=2`);
    const catalogo3= axios.get(`https://api.rawg.io/api/games?key=c914ea29483145d2962820e989c9538b&page=3`);
    const catalogo4= axios.get(`https://api.rawg.io/api/games?key=c914ea29483145d2962820e989c9538b&page=4`);
    const catalogo5= axios.get(`https://api.rawg.io/api/games?key=c914ea29483145d2962820e989c9538b&page=5`);
    let catalogoTotal= await Promise.all([catalogo1,catalogo2,catalogo3,catalogo4,catalogo5]);
    catalogoTotal=catalogoTotal.map(a=>a.data.results)
    catalogoTotal=[...catalogoTotal[0],...catalogoTotal[1],...catalogoTotal[2],...catalogoTotal[3],...catalogoTotal[4]]
    let jeyson=catalogoTotal.map(e=>({name:e.name,id:e.id, imagen:e.background_image,lanzamiento: e.released,rating:e.rating,
        plataformas:e.platforms.map(f=>(f.platform.name)),genre:e.genres.map(g=>(g.name))}));
console.log(jeyson);
        return jeyson;
    },
    DB: async function allGamesDB(){
    let allDB= await Games.findAll({
        include:{
            model: Generos,
            attributes:['id','name'],
            through:{
                attributes:[],
            }
        }
    })
    let gsdg= await Generos.findAll({
        include:{
            model:Games
        }
    })
    //console.log(gsdg.map(e=>(e.name)));
    let jdsf= gsdg.map(e=>(e.name));
    //let jdsf= gsdg.map(e=>(e.id));
    let jsonAllDB=allDB.map((game)=>{
        return{
            name:game.name,
            id:game.id,
            imagen:game.imagen,
            lanzamiento:game.lanzamiento,
            description:game.description,
            //lanzamiento:game.released,
            rating:game.rating,
            //plataformas:game.platforms||'missing plataform',
            plataformas:game.plataformas,
            //genre:game.Geneross.map(g=>(g.name)),
            genres:jdsf,
            //genres:game.gameId
        }
    })
    //console.log(jsonAllDB);
        return jsonAllDB
    },
    ALL:async function(){
        let apii=await this.API()
        let dbb=await this.DB()
        let total= apii.concat(dbb)
        return total
    }
    //await Games.bulkCreate(jeyson);
    //console.log('videojuegos cargados en la base de datos');
    /*
    try{
        let gamesLink= (await axios(`https://api.rawg.io/api/games?key=c914ea29483145d2962820e989c9538b`)).data.results//hasta aca va bien
        let jeyson=gamesLink.map(e=>({name:e.name, imagen:e.background_image,lanzamiento: e.released,rating:e.rating,
                                    plataformas:e.platforms.map(f=>(f.platform.name))}));
        let aidis=gamesLink.map(e=>({aidi:e.id}));
        let numeros=aidis.map(e=>e.aidi)

        console.log(jeyson);
        //console.log(aidis);
        console.log(numeros);


    await Games.bulkCreate(jeyson);

    console.log('Countries cargados en DB correctamente');
    } catch (error) {
        console.log(error);
    }*/
}
//getAllGames();
/*module.exports={
    getAllGames,
}*/