import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
//import {getAllGamParaCreate} from '../redux/actions';
import {getAllGam, postVideogame, meTraigoGeneros} from '../redux/actions';
function CreateGame(){
    const dispatch=useDispatch();
    const [input, setInput]=useState({
        name:'',
        description:'',
        released:'',
        rating:0,
        platforms:[],
        image:'',
        /*genres:[],*/
        genres:'',
    });
    //dispatch(meTraigoGeneros());

    const Genres= useSelector((state=>state.allGenres));
    console.log(Genres);
    const [Errors, setErrors] = useState({});
    const videogames=useSelector(state=>state.allGames);


    const validate=(input)=>{
        let errors={}
        if (input.name[0]===' '){
            errors.name='Should not have space behind.'
            //console.log('DEbes escribir algo');
        } else if (!input.name){
            errors.name='Missing name'
        }/* else if (videogames.filter(game=>game.name===input.name).length>0){
            errors.name='Name already exist'
        }*/ else {
           return errors
        }
    }

    useEffect(()=>{
        
        //dispatch(getAllGamParaCreate())
        //dispatch(getAllGam())
        dispatch(meTraigoGeneros())
    },[])

    const handleInput=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    };

    const handleSelect=(e)=>{
        const IndexGen=input.genres.indexOf(e.target.value)
        if(IndexGen===-1){
            setInput({
                ...input,
                genres:[...input.genres,e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]:e.target.value
            }))
        }
    }

    const handlePlat=(e)=>{
        const currentIndex=input.platforms.indexOf(e.target.value)
        if(currentIndex===-1){
            setInput({
                ...input,
                platforms:[...input.platforms, e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]:e.target.value
            }))
        }
    }
//dispatch(meTraigoGeneros());


    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(postVideogame(input))
        setInput({
            name:'',
            description:'',
            released:'',
            rating:0,
            platforms:[],
            image:'',
            //genres:[],
            genres:''  
        });
        return alert('Created!')
    }

    


    return(
        <div>
            <form autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <div>
                    <label>Name:</label>{/*
                     <input className="inputName" type='text' value={input.name}
                            name='name' placeholder="Insert name..." onChange={(e)=>handleInput(e)}>
                    </input>
    {Errors.name && (<p>{Errors.name}</p>)}*/}
                    <input type='text' value={input.name} name='name'
                            placeholder='Insert name...' 
                            onChange={(e)=>handleInput(e)}></input>
                    {/*Errors.name && (<p>{Errors.name}</p>)*/}
                </div>
                <div>
                    <label>
                        Description:
                    </label>
                    <input value={input.description} type='text' name='description'
                            placeholder='Insert description...'
                            onChange={(e)=>handleInput(e)}></input>
                </div>
                <div>
                    <label>
                        Released:
                    </label>
                    <input value={input.released} type='text' name='released'
                            placeholder='Insert release date'
                            onChange={(e)=>handleInput(e)}></input>
                </div>
                <div>
                    <label>
                        Rating:
                    </label>
                    <input value={input.rating} type='number' name='rating'
                            step='0.01' min='0' max='5' placeholder='Insert rating...'
                            onChange={(e)=>handleInput(e)}>
                    </input>
                </div>
                <div>
                    <label>
                        Image:
                    </label>
                    <input value={input.image} name='image' type='text'
                            placeholder='Url image...'
                            onChange={(e)=>handleInput(e)}>
                    </input>
                </div>
                <div>
                    <label>
                        Platforms:
                    </label>
                    <select value={input.platforms} onChange={(e)=>handlePlat(e)} multiple={true}>
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
                </div>
                <div>
                    <label>
                        Genres:
                    </label>
                    <select value={input.genres} onChange={(e)=>handleSelect(e)} multiple={false}>
                        {Genres && Genres.map(gen=>{
                            return (
                                <option key={gen.name} value={gen.id}>{gen.name}</option>
                            )
                        })}
                    </select>
                    </div>
                </div>
                <div>
                    <div>
                        <button type='submit'>Create</button>
                    </div>
                </div>
            </form>
        </div>
        
    )
}


export default CreateGame;