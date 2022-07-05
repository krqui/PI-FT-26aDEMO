import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { clearDetail, getGameDetail,meTraigoGeneros, clearGenre } from "../redux/actions";
import '../Styles/GameDescription.css'
export const GameDescription=()=>{
    const gameDetail=useSelector((state)=>state.GameDetails);
    const dispatch= useDispatch();
    let {id} = useParams();

    /*const Genres= useSelector((state=>state.allGenres));
    console.log(Genres);*/
    //console.log(meTraigoGeneros(dispatch));
    /*const Genres=useSelector((state=>state.allGenres))
    console.log(Genres);*/

    useEffect(()=>{
        
        
        //dispatch(clearDetail())
        dispatch(getGameDetail(id));
        //dispatch(meTraigoGeneros())
        dispatch(meTraigoGeneros())
        
        return ()=>{
            dispatch(clearDetail())
            dispatch(clearGenre())
        };
    },[dispatch,id]);

    const Genres=useSelector((state=>state.allGenres));
    console.log(Genres);
    console.log(gameDetail);

    
    //console.log(Genres[5]);
    return (
        <div>
            <div>
                <div>
                    <Link to='/home'>
                        <button>
                        Regresar a la seccion "Videojuegos"
                        </button>
                    </Link>
                </div>
            </div>

            <div className="container-description">
                <div>
                    <div className="imagen-container">
                        <img className='class-imagen2' src={gameDetail.image} alt='No img'></img>
                    </div>
                    <div className="h3-container-h3">
                    <h3>Name: {gameDetail.name}</h3>
                    
                    <h3>Genres: {gameDetail.genres}</h3>
                    <h3>Description: {gameDetail.description}</h3>
                    <h3>Rating: {gameDetail.rating}</h3>
                    <h3>Platforms: {gameDetail.platforms}</h3>
                    <h3>Lanzamiento: {gameDetail.lanzamiento}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
    /*const v=useSelector(state=>state)*/

}