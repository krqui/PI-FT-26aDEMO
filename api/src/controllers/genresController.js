const axios=require('axios');
const {Generos,API_KEY}= require('../db')

async function getAllGenres(){
    try{
        let generos= (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
        .map(e=>({name:e.name}));
        
        await Generos.bulkCreate(generos)
        console.log('Genres cargados a la database.');

    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAllGenres
}