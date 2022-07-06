const axios=require('axios');
const {Generos,API_KEY}= require('../db')
let contadorBulk=0;
async function getAllGenres(){
    if (contadorBulk==0){
    try{
        let generos= (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
        .map(e=>({name:e.name}));
        
        await Generos.bulkCreate(generos)
        contadorBulk+1;
        console.log('Genres cargados a la database.');

    } catch (error) {
        console.log(error);
    }
}
}

module.exports={
    getAllGenres
}