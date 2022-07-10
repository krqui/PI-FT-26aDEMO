import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllGam} from '../redux/actions';
//import {getAllGamApi} from '../redux/actions';
import { Game } from '../components/Game';
import {Pagination} from '../components/Pagination';
import '../Styles/Home.css'
function Home(){
const dispatch= useDispatch();
const games=useSelector(state=>state);
if (games.reseteoPage==true){
    console.log('aplique el filtro de generos.')
}
//let cuentaPag=0;
//console.log(games.allGames);
const [currentPage, setCurrentPage] = useState(1);
const [gamesPerPage, setGamesPerPage]= useState(10);

const pageValidator=(currentPage)=>{
    if(currentPage===1){
        //console.log('estoy en la pagina 1');
        setGamesPerPage(9);
        return;
    }
    setGamesPerPage(10)
}
// page validator sirve para que te bote o 9 o 10 elementos, nada mas.

useEffect(()=>{
    dispatch(getAllGam())
}, [dispatch])
// para que games.allGames.length jale los datos del reducer, debes escribir la
// funcion dispatch de arriba. De lo contrario, games.allGames.length se mantiene vacia.


const indexOfLastGame=currentPage*gamesPerPage;
const indexOfFirstGame= indexOfLastGame - gamesPerPage;
/*const currentGame=Array.isArray(games.searchGame)
        ? games.searchGame?.slice(indexOfFirstGame, indexOfLastGame)
        : games.allGames?.slice(indexOfFirstGame,indexOfLastGame);*/
let currentGame;
if(Array.isArray(games.searchGame)){
    console.log(games.searchGame);
    currentGame=games.searchGame?.slice(indexOfFirstGame,indexOfLastGame);
    //cuentaPag=cuentaPag+1;
} else {
    currentGame=games.allGames?.slice(indexOfFirstGame,indexOfLastGame)
}

console.log(currentGame);
function paginate(pageNumber){
    setCurrentPage(pageNumber)
    console.log(`Ahora estoy en la pagina ${pageNumber}`);
};
// TENGO QUE LOGRAR QUE CUANDO HAGA UN FILTRO OCURRA setCurrentPage(1)

const renderContext = {
    allGames:
        games.allGames.length===0
        ? <div className="loading">
            <div><h2 className="loading_games">Cargando juegos...</h2></div>
            <iframe src="https://giphy.com/embed/motnLx3NDhfoSfuWXF" width="480" height="480" frameBorder="0" className="giphy-a" alt='Loading countries...' allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cyberpunk-windows-1984-motnLx3NDhfoSfuWXF">via GIPHY</a></p>
        </div>
        : currentGame?.map(game=>(
            <Game key={game.id}
                id={game.id}
                name={game.name}
                launched={game.lanzamiento}
                rating={game.rating}
                platforms={game.plataformas}
                cover={game.imagen}
                genres={game.genre}
            ></Game>)),

    searchGame:
            !Array.isArray(games.searchGame)
                ?   <>
                    <h1>No se encontro ningun videojuego...</h1>
                    </>
                : currentGame?.map(game=>(
                    <Game key={game.id}
                        id={game.id}
                        name={game.name}
                        launched={game.lanzamiento}
                        rating={game.rating}
                        platforms={game.plataformas}
                        cover={game.imagen}
                        genres={game.genre}
                    ></Game>)),
    }

useEffect(()=>{
    pageValidator(currentPage)
},[currentPage])

    return(
        <div className="superContenedor">
            <div className="style-containerGrid">
                {!games.searchGame? renderContext.allGames: renderContext.searchGame}
            </div>
            <div>
                <Pagination
                    gamesPerPage={gamesPerPage}
                    totalGames={games.searchGame? games.searchGame.length: games.allGames.length}
                    paginate={paginate}>
                </Pagination>
                <h4 className="creditos">Created by Diego Carcausto & Soy Henry Coding Bootcamp</h4>
            </div>
        </div>
    )
}
export default Home;