import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Game.css'

export function Game(props){
    const {id,name,rating,launched,platforms,cover,genres}=props;
    return (
        <div>
            <Link to={`/games/${id}`}>
                    <h2>{name}</h2>
            </Link>
        <div>
            <h3>{rating}</h3>
            <h4>{genres}</h4>
            {/*
            <h3>{launched}</h3>
            <h3>{platforms}</h3>
            */}
            <img className='imagen' src={cover} alt={name+'flag'}></img>
        </div>
    </div>
    )
}