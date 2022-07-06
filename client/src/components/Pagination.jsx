import React from 'react';
import '../Styles/Pagination.css'
export const Pagination=({gamesPerPage,totalGames,paginate})=>{
    const pageNumbers= [];
    const secPageToFinish = totalGames-9;
    pageNumbers.push(1);

    for (let i=2; i<=Math.ceil(secPageToFinish/10);i++){
        pageNumbers.push(i);
    }

    return (
        <nav className='footer-container'>
            <ul className='style-footer'>
               {pageNumbers.map(number=>(
                <li key={number} style={{listStyle:'none'}}>
                    <button type='button' className='botonPie' onClick={()=>paginate(number)}>
                        {number}
                    </button>
                </li>
               ))}
            </ul>
        </nav>
    );
}