const axios=require('axios');
const e = require('express');
const {Games,Generos} = require('../db');
module.exports={
    API:async function allGamesApi(){
    const {API_KEY} = require('../db');
    const catalogo1= axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
    const catalogo2= axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
    const catalogo3= axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
    const catalogo4= axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
    const catalogo5= axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
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
            attributes:['name'],
            through:{
                attributes:[],
            }
        }
    })
    /*let gsdg= await Generos.findAll({
        include:{
            model:Games
        }
    })*/
    //console.log(gsdg.map(e=>(e.name)));
    /*let jdsf= gsdg.map(e=>(e.id));
    console.log(jdsf);*/
    //let jdsf= gsdg.map(e=>(e.id));
    //console.log(allDB)
    let jsonAllDB=allDB.map((game)=>{
        //let gen= Generos.findByPk(jsdf)
        
        return{
            name:game.name,
            id:game.id,
            imagen:game.imagen,
            lanzamiento:game.lanzamiento,
            description:game.description,
            rating:game.rating,
            plataformas:game.plataformas||'missing plataform',
            //genre:game.Geneross.map(g=>(g.name)),
            //          genre:jdsf,
            //genres:gae.gameId
            // ↓ por mienmtras
            //genre:'Indie, Action'
            genre:game.generos.map((e)=>e.dataValues.name)
            //[0].dataValues.name
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
    
}