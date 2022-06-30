import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { clearDetail, getGameDetail } from "../redux/actions";
import '../Styles/GameDescription.css'
export const GameDescription=()=>{
    const gameDetail=useSelector((state)=>state.GameDetails);
    const dispatch= useDispatch();
    let {id} = useParams();

    useEffect(()=>{
        dispatch(getGameDetail(id));
        return ()=>{
            dispatch(clearDetail())
        };
    },[dispatch,id]);
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

            <div>
                <div>
                    <div>
                        <img className='hola'src={gameDetail.image} alt='No img'></img>
                    </div>
                    <h3>Name:{gameDetail.name}</h3>
                    <h3>Genres:{gameDetail.genres}</h3>
                    <h3>Description:{gameDetail.description}</h3>
                    <h3>Rating:{gameDetail.rating}</h3>
                    <h3>Platforms:{gameDetail.platforms}</h3>
                    <h3>Lanzamiento:{gameDetail.lanzamiento}</h3>
                </div>
            </div>
        </div>
    )
    /*const v=useSelector(state=>state)*/

}