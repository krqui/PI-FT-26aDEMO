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

//console.log(games.allGames);
const [currentPage, setCurrentPage] = useState(1);
const [gamesPerPage, setGamesPerPage]= useState(10);

const pageValidator=(currentPage)=>{
    if(currentPage===1){
        setGamesPerPage(9);
        return;
    }
    setGamesPerPage(10)
}


useEffect(()=>{
    dispatch(getAllGam())
    //dispatch(getAllGamApi())
}, [dispatch])
// para que games.allGames.length jale los datos del reducer, debes escribir la
// funcion dispatch de arriba. De lo contrario, games.allGames.length se mantiene vacia.


const indexOfLastGame=currentPage*gamesPerPage;
const indexOfFirstGame= indexOfLastGame - gamesPerPage;
const currentGame=Array.isArray(games.searchGame)
        ? games.searchGame?.slice(indexOfFirstGame, indexOfLastGame)
        : games.allGames?.slice(indexOfFirstGame,indexOfLastGame);

console.log(currentGame);
const paginate=pageNumber=>{
    setCurrentPage(pageNumber)
};


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
                    <h1>No se encontro ningun pais...</h1>
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
            </div>
        </div>
    )
}
export default Home;