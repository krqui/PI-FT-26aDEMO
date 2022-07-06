import axios from 'axios';
// primero vamos a exportar los type:
export const GET_GAMES='GET_GAMES';
export const GET_GENRES='GET_GENRES';
export const CLEAR_DETAIL='CLEAR_DETAIL';
export const SORT_ORDER_NAME_ASC='SORT_ORDER_NAME_ASC';
export const SORT_ORDER_NAME_DES='SORT_ORDER_NAME_DES';
export const GET_GAME_NAME='GET_GAME_NAME';
export const SORT_ORDER_RATING_ASC='SORT_ORDER_RATING_ASC';
export const SORT_ORDER_RATING_DES='SORT_ORDER_RATING_DES';
export const PLATFORM_FILTER='PLATFORM_FILTER';
export const GENRE_FILTER='GENRE_FILTER';
export const GET_GAME_ID='GET_GAME_ID';
export const CLEAR_GENRE='CLEAR_GENRE';

const URL='http://localhost:3001/games';
const URLCreateGame='http://localhost:3001/createGame';
// se exportan al reducer.js
export function getAllGam(){
    return async (dispatch)=>{
        const res = await axios('http://localhost:3001/games/');
        return dispatch({ type: GET_GAMES, payload: res.data });
    }
}

export function meTraigoGeneros(){
    return async (dispatch)=>{
        let respuesta=await axios('http://localhost:3001/genres/')
        return dispatch({type:GET_GENRES,payload:respuesta.data})
    }
}


export const getGameName=(name)=> async dispatch => {
    try{
        const response=await axios(`${URL}?name=${name}`);

        if (response.data) return dispatch({type:GET_GAME_NAME, payload:response.data});
        } catch(error) {
        return dispatch({type: GET_GAME_NAME,payload:{error:'no se encontro datos.'}});
    }
}
export const orderNameAsc=()=>{
    return {
        type: SORT_ORDER_NAME_ASC,
    }
}

export const orderNameDes=()=>{
    return {
        type: SORT_ORDER_NAME_DES,
    }
}

export const orderRatingAsc=()=>{
    return {
        type: SORT_ORDER_RATING_ASC,
    }
}

export const orderRatingDes=()=>{
    return {
        type: SORT_ORDER_RATING_DES,
    }
}


export function clearDetail(){
    return {type:CLEAR_DETAIL}
}

export function clearGenre(){
    return {type:CLEAR_GENRE}
}

export const getGameDetail=(id)=>async dispatch=>{
    try{
        
        const response= await axios(`${URLCreateGame}/${id}`);
        return dispatch({type:GET_GAME_ID, payload:response.data})
    } catch (error) {
        return console.log('ERROR--->',error);
    }
}

export function postVideogame(payload){
    return async function (dispatch) {
        let response= await axios.post('http://localhost:3001/createGame',payload)
        return response
    }
}

export const platformFilter=(platform)=>{
    return {
        type: PLATFORM_FILTER, payload:platform
    }
}

export const genreFilter=(genre)=>{
    return {
        type: GENRE_FILTER, payload:genre
    }
}





// NO OLVIDAR AGREGAR ALGO SIMILAR A: dispatch({type: 'DELETE_CITY', payload:234})