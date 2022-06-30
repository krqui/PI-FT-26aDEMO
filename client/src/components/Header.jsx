import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {clearDetail, orderNameAsc, orderNameDes, getGameName,
        orderRatingAsc, orderRatingDes, platformFilter,
        genreFilter} from '../redux/actions';
import {Link} from 'react-router-dom';

export function Header(){
    const dispatch= useDispatch();
    const genres= useSelector((state)=>state.allGenres);

    const [orderN, setOrderN] = useState({
        type:'De la A a la Z'
    })

    const [orderP, setOrderP] = useState({
        type:'De menor a mayor'
    })
    
    const [name, setName] = useState('');

    const orderName=()=>{
        if(orderN.type==='De la A a la Z'){
            dispatch(orderNameAsc())
            setOrderN({type:'De la Z a la A'});
        }
        if(orderN.type==='De la Z a la A'){
            dispatch(orderNameDes())
            setOrderN({type:'De la A a la Z'})
        }
    }

    const orderRating=()=>{
        if(orderP.type==='De menor a mayor'){
            dispatch(orderRatingAsc())
            setOrderP({type:'De mayor a menor'});
        }
        if(orderP.type==='De mayor a menor'){
            dispatch(orderRatingDes())
            setOrderP({type:'De menor a mayor'});
        }
    };
    
    const handleChange=(e)=>{
        setName(e.target.value);
        // a traves de setName le pase a name el nombre del videojuego escrito.
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(getGameName(name))// buscas con el name que previamente modificaste en setName.
        setName('');
    }

    const filter=(e)=>{
        if(e.target.value==='') return dispatch(clearDetail())
        dispatch(platformFilter(e.target.value));
    }

    const filterGen=(e)=>{
        if(e.target.value==='') return dispatch(clearDetail());
        dispatch(genreFilter(e.target.value))
    }

    return (
        <header>
            <div>
                <Link to='/'>
                    <button onClick={()=>dispatch(clearDetail())}>
                        {/*Esto hace que se ejecute dispatch({type:CLEAR:DETAIL}) */}
                        <h2>Henry Videogames</h2>
                        <h3>Resetear la App. Regresar al menu principal.</h3>
                    </button>
                </Link>
            </div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder="Escribir el videojuego aqui..." 
                        value={name} onChange={handleChange}></input>
            </form>
            <div>
                <select onChange={filter}>
                    <option value=''>Seleccionar plataforma</option>
                    <option value='Android'>Android</option>
                    <option value='iOS'>iOS</option>
                    <option value='Linux'>Linux</option>
                    <option value='macOS'>macOS</option>
                    <option value='Nintendo Switch'>Nintendo Switch</option>
                    <option value='PC'>PC</option>
                    <option value='PlayStation 3'>PlayStation 3</option>
                    <option value='PlayStation 4'>PlayStation 4</option>
                    <option value='PlayStation 5'>PlayStation 5</option>
                    <option value='PS Vita'>PS Vita</option>
                    <option value='Web'>Web</option>
                    <option value='Xbox'>Xbox</option>
                    <option value='Xbox 360'>Xbox 360</option>
                    <option value='Xbox One'>Xbox One</option>
                    <option value='Xbox Series S/X'>Xbox Series S/X</option>
                </select>

                <select onChange={filterGen}>
                    <option value=''>Seleccionar genero</option>
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Board Games'>Board Games</option>
                    <option value='Card'>Card</option>
                    <option value='Casual'>Casual</option>
                    <option value='Educational'>Educational</option>
                    <option value='Family'>Family</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Indie'>Indie</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Racing'>Racing</option>
                    <option value='RPG'>RPG</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Sports'>Sports</option>
                    <option value='Strategy'>Strategy</option>
                </select>




                <button onClick={orderName}>
                    <h3>Ordenar alfabeticamente</h3>
                    <h3>{orderN.type}</h3>
                </button>

                <button onClick={orderRating}>
                    <h3>Ordenar segun Rating</h3>
                    <h3>{orderP.type}</h3>
                </button>
            </div>

        </header>
    )

}