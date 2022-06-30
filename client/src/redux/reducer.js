import {GET_GAMES,GET_GENRES,CLEAR_DETAIL, 
    SORT_ORDER_NAME_ASC,SORT_ORDER_NAME_DES, GET_GAME_NAME,
    SORT_ORDER_RATING_ASC, SORT_ORDER_RATING_DES, PLATFORM_FILTER, GENRE_FILTER,
    //GET_VIDEO_ID
    GET_GAME_ID
} from './actions';

const initialState={
    allGames:[],
    allGenres:[],
    GameDetails:{},
    videogameid:{},
    message:null
}

const order=(arr,prop)=>{
    const result = arr.sort(function(a,b){
        if(a[prop]<b[prop]) return -1;
        if(a[prop]>b[prop]) return 1;
        return 0;
    })
    return result;
}


function reducer(state=initialState, {type,payload}){
    switch (type) {
        case GET_GAMES:
            return {
                ...state,
                allGames:payload
            };
        case GET_GENRES:
            return {
                ...state,
                allGenres:payload
            };
        case GET_GAME_NAME:
            return {
                ...state,
                searchGame:payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                GameDetails:{},
                message:null
            };
        case SORT_ORDER_NAME_ASC:
            let asc=state.searchGame?
                    order(state.searchGame,'name')
                    :order(state.allGames,'name')
            return {
                ...state,
                searchGame:asc
            };
        case SORT_ORDER_NAME_DES:
            let des=state.searchGame?
                    order(state.searchGame,'name').reverse()
                    :order(state.allGames,'name').reverse()
            return {
                ...state,
                searchGame:des
            };
        case SORT_ORDER_RATING_ASC:
            let ascc=state.searchGame?
                    order(state.searchGame,'rating')
                    :order(state.allGames,'rating')
            return {
                ...state,
                searchGame:ascc
            };
        case SORT_ORDER_RATING_DES:
            let dess=state.searchGame?
                    order(state.searchGame,'rating').reverse()
                    :order(state.allGames,'rating').reverse()
            return {
                ...state,
                searchGame:dess
            }
        case PLATFORM_FILTER:
            let allPlatformsClone=[...state.allGames];
            let filtered=allPlatformsClone.filter(c=>c.plataformas?.includes(payload))
            return {
                ...state,
                searchGame:filtered
            }
        case GENRE_FILTER:
            let allGenresClone=[...state.allGames];
            //let filtered2= allGenresClone.filter(c=>c.genres?.filter(a=>a.name===payload).length>0)
            let filtered2=allGenresClone.filter(c=>c.genre?.includes(payload))
            return {
                ...state,
                searchGame:filtered2
            }
        /*case GET_VIDEO_ID:
            return {
                ...state,
                videogameid: payload
            }*/
        case GET_GAME_ID:
            return {
                ...state,
                GameDetails:payload
            }
        default:return state
    }
}

export default reducer;