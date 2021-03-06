//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {getAllGames} = require('./src/controllers/gamesController')
const {getAllGenres} = require('./src/controllers/genresController');
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  //server.listen(3001, async() => {//CREO QUE HAY QUE PONERLE ASYNC
  server.listen(process.env.PORT, async() => {//CREO QUE HAY QUE PONERLE ASYNC
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    //await getAllGames();
    //await getAllGenres();
  }); 
});
// PARA QUE FUNCIONE EN EL LOCALHOST, DEBO ASIGNAR PORT=3001 EN .env