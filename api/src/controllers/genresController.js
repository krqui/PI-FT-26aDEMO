const axios=require('axios');
const {Generos}= require('../db')
//let {contador} = require('../routes/gamesRoutes');
async function getAllGenres(){
    //if(contador===0){
    try{
        let generos= (await axios('https://api.rawg.io/api/genres?key=c914ea29483145d2962820e989c9538b')).data.results
        .map(e=>({name:e.name}));
        
        await Generos.bulkCreate(generos)
        console.log('Genres cargados a la database.');

    } catch (error) {
        console.log(error);
    }
//}
}

module.exports={
    getAllGenres
}