import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Game.css'

export function Game(props){
    const {id,name,rating,launched,platforms,cover,genres}=props;
    console.log(genres);
    let c=''
    if (genres.length>1){
        c=genres.toString()
    }else {
        c=genres[0];
    }
    //let d=genres[0];
    //c=genres.map()
    //c=genres.reduce((a)=>+','+a,d)
    console.log(c);
    return (
        <div className='tarjetaJuego'>
            <Link to={`/games/${id}`}>
                    <h2 className='neim'>{name}</h2>
            </Link>
            <div className='container-imagen'>
            <Link to={`/games/${id}`}>
                <img className='imagen' src={cover} alt={name+'flag'}></img>
            </Link>
            </div>
            <div className='h3-container'>
                <h3>Rating: {rating} points</h3>
                <h3>Genres: {c}</h3>
            </div>
        </div>
    )
}