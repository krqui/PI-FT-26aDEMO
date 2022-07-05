import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {clearDetail, orderNameAsc, orderNameDes, getGameName,
        orderRatingAsc, orderRatingDes, platformFilter,
        genreFilter} from '../redux/actions';
import {Link} from 'react-router-dom';
import '../Styles/Header.css';
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

    /*const orderNamePrueba=(e)=>{
        if(e.target.value==='') return dispatch(clearDetail());
        orderName(e.target.value)
    }*/

    return (
        <header className="navBar">
            <div className="NavBar1">
                <Link to='/'>
                    <button className='button-backToLanding' onClick={()=>dispatch(clearDetail())}>
                        {/*Esto hace que se ejecute dispatch({type:CLEAR:DETAIL}) */}
                        <h3>Back to landing</h3>
                    </button>
                </Link>
                
                
                <Link to='../createVideogame'>
                    <button className='button-crearVideogame' onClick={()=>dispatch(clearDetail())}>
                        {/*Esto hace que se ejecute dispatch({type:CLEAR:DETAIL}) */}
                        <h3>Crear videojuego</h3>
                    </button>
                </Link>
                <button className='class-order' onClick={orderName}>
                    <h3>Order A-Z/Z-A</h3>
                    {/*<h3>{orderN.type}</h3>*/}
                </button>

                <button className='class-rating' onClick={orderRating}>
                    <h3>Order by Rating</h3>
                    {/*<h3>{orderP.type}</h3>*/}
                </button>
                <h2 className="titulo">Henry Videogames</h2>
            </div>
            
            <div className="opciones">
            
            <div className="los_filtros">
                

                <select className='filtroPlat' onChange={filter}>
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

                <select className='filtroGen' onChange={filterGen}>
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

                {/*<select onChange={orderNamePrueba}>
                    <option value=''>Ordenar alfabeticamente</option>
                    <option value={orderN.type}>From A to Z</option>
                    
    </select>*/}
                <form className='formu' onSubmit={onSubmit}>
                    <input className='elInput' type='text' placeholder="Escribir el videojuego aqui..." 
                        value={name} onChange={handleChange}></input>
                </form>
            </div>
            </div>

        </header>
    )

}