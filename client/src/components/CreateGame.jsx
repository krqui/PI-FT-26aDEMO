import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

import {getAllGam, postVideogame, meTraigoGeneros} from '../redux/actions';
import '../Styles/CreateGame.css';
function CreateGame(){
    const dispatch=useDispatch();
    const [input, setInput]=useState({
        name:"",
        description:'',
        released:'',
        rating:0,
        platforms:[],
        image:'',
        genres:[],
        
    });
    //dispatch(meTraigoGeneros());
    // en la consola visualizo en los generos, los numeros con strings
console.log(input);
    const Genres= useSelector((state=>state.allGenres));
    //console.log(Genres);
    const [Errors, setErrors] = useState({});
    const videogames=useSelector((state)=>state.allGames);
    //console.log(videogames);


    function validate(input){
        let errors={}
        if (input.name[0]===' '){
            errors.name='Should not have space behind.'
        } else if (!input.name){
            errors.name='Missing name'
        } else if (videogames.filter(game=>game.name.toLowerCase()===input.name.toLowerCase()).length>0){
            // Probar con Portal 2
            errors.name='Name already exist'
        }
        if (input.description[0]===' '){
            errors.description='Should not have space behind!'
        } else if (!input.description) {
            errors.description='Missing description'
        } else if (input.description.length>10000000) {
            errors.description='Description is too long! Please write less characters.'
        }
        if (!input.released) {
            errors.released='Missing Date!'
        //} else if (!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(input.released)) {
        } else if (input.released[0]===' '){
            errors.released='Should not have space behind!'
        } else if (!/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(input.released)) {
            errors.released= 'Wrong format!. Example: YYYY-MM-DD'
        }
        if (input.rating<0 || input.rating >5) {
            errors.rating='Rating must be between 0 and 5!'
        }
        if (input.platforms.length===0) {
            errors.platforms='Select at least 2 platform!'
        }
        if (input.genres.length===0) {
            errors.genres='Select at least 2 gender!'
        }
        if (input.image[0]===' '){
            errors.image="You must write an image url!"
        } else if (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(input.image)){
            errors.image='You must insert a link that starts with http:// or https:// and ends with .com/.net/...'
        }
        //if (https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&))
        return errors
    }

    useEffect(()=>{
        
       
        dispatch(getAllGam())
        dispatch(meTraigoGeneros())
    },[])

    function handleInput(e){
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


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(input.name==='') return alert('LLENAR EL FORMULARIO');

        dispatch(postVideogame(input))
        setInput({
            name:'',
            description:'',
            released:'',
            rating:0,
            platforms:[],
            image:'',
            genres:[],
            //genres:''  
        });
        return alert('Created!')
    }

    return(
        <div className='container-div'>
            <form className='formulario' autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <div className='contenedor-InputPadre'>
                    <label>Name: </label>
                    <input className='nameInput' type="text" name="name" 
                            value={input.name} 
                            placeholder='Insert name...' 
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.name && (<p className='error-resaltado'>{Errors.name}</p>)}
                </div>
                <div className='contenedor-InputPadre'>
                    <label>Description: </label>
                    <input className='nameDescrip' type='text' name='description'
                            value={input.description}
                            placeholder='Insert description...'
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.description && (<p className='error-resaltado'>{Errors.description}</p>)}
                </div>
                <div className='contenedor-InputPadre'>
                    <label>Released: </label>
                    <input className='nameReleased' type='text' name='released'
                            value={input.released}
                            placeholder='Insert release date'
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.released && (<p className='error-resaltado'>{Errors.released}</p>)}
                </div>
                <div className='contenedor-InputPadre'>
                    <label>Rating: </label>
                    <input className='nameRating' type='number' name='rating'
                            value={input.rating} step='0.01' min='0' max='5' 
                            placeholder='Insert rating...'
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.rating && (<p className='error-resaltado'>{Errors.rating}</p>)}
                </div>
                <div className='contenedor-InputPadre'>
                    <label>Image: </label>
                    <input className='nameImage' type='text' name='image'
                            value={input.image}
                            placeholder='Url image...'
                            onChange={(e)=>handleInput(e)}>
                    </input>
                    {Errors.image && (<p className='error-resaltado'>{Errors.image}</p>)}
                </div>
                <div className='contenedor-InputPadre'>
                    <label>Platforms: </label>
                    <select value={input.platforms} onChange={(e)=>handlePlat(e)} multiple={true}>
                        {/*<option value=''>Seleccionar plataforma</option>*/}
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
                    {Errors.platforms && (<p className='error-resaltado'>{Errors.platforms}</p>)}
                </div>
                <div className='contenedor-InputPadre'>
                    <label>Genres: </label>
                    <select value={input.genres} onChange={(e)=>handleSelect(e)} multiple={true}>
                        {Genres && Genres.map(gen=>{
                            return (
                                <option key={gen.name} value={Number(gen.id)}>{gen.name}</option>
                            )
                        })}
                    </select>
                    {Errors.genres && (<p className='error-resaltado'>{Errors.genres}</p>)}
                    </div>
                </div>

                <div className='contenedor-InputPadre'>
                    <div>
                        <button className='submit'
                        disabled={!Errors.name && !Errors.description && !Errors.released && !Errors.platforms && !Errors.genres? false:true}
                        type='submit'>Create
                        </button>
                    </div>
                </div>
            </form>
            
            <div>
                <Link to='./home'>
                    <button className='meRegreso'>
                        Back to all Games
                    </button>
                </Link>
            </div>


        </div>
        
    )
}


export default CreateGame;