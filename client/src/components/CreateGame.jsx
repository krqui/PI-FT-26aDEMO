import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
//import {getAllGamParaCreate} from '../redux/actions';
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
        /*genres:[],*/
        genres:'',
    });
    //dispatch(meTraigoGeneros());

    const Genres= useSelector((state=>state.allGenres));
    //console.log(Genres);
    const [Errors, setErrors] = useState({});
    const videogames=useSelector((state)=>state.allGames);
    //console.log(videogames);


    function validate(input){
        let errors={}
        if (input.name[0]===' '){
            errors.name='Should not have space behind.'
            //console.log('DEbes escribir algo');
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
        }
        if (!input.released) {
            errors.released='Missing Date!'
        } else if (!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(input.released)) {
            errors.released= 'Wrong format!. Example: XX-XX-XXXX'
        }
        if (input.rating<0 || input.rating >5) {
            errors.rating='Rating must be between 0 and 5!'
        }
        if (input.platforms.length===0) {
            errors.platforms='Select at least 1 platform!'
        }
        if (input.genres.length===0) {
            errors.genres='Select at least 1 gender!'
        }
        return errors
    }

    useEffect(()=>{
        
        //dispatch(getAllGamParaCreate())
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
            genres:[],
            //genres:''  
        });
        return alert('Created!')
    }

    return(
        <div className='container-div'>
            <form autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                <div>
                    <label>Name:</label>
                    <input className='nameInput' type="text" name="name" 
                            value={input.name} 
                            placeholder='Insert name...' 
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.name && (<p className='error-name'>{Errors.name}</p>)}
                </div>
                <div>
                    <label>Description:</label>
                    <input className='nameDescrip' type='text' name='description'
                            value={input.description}
                            placeholder='Insert description...'
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.description && (<p className='error-description'>{Errors.description}</p>)}
                </div>
                <div>
                    <label>Released:</label>
                    <input className='nameReleased' type='text' name='released'
                            value={input.released}
                            placeholder='Insert release date'
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.released && (<p className='error-released'>{Errors.released}</p>)}
                </div>
                <div>
                    <label>Rating:</label>
                    <input className='nameRating' type='number' name='rating'
                            value={input.rating} step='0.01' min='0' max='5' 
                            placeholder='Insert rating...'
                            onChange={(e)=>handleInput(e)}></input>
                    {Errors.rating && (<p className='error-rating'>{Errors.rating}</p>)}
                </div>
                <div>
                    <label>Image:</label>
                    <input className='nameImage' type='text' name='image'
                            value={input.image}
                            placeholder='Url image...'
                            onChange={(e)=>handleInput(e)}>
                    </input>
                </div>
                <div>
                    <label>Platforms:</label>
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
                    {Errors.platforms && (<p className='error-platforms'>{Errors.platforms}</p>)}
                </div>
                <div>
                    <label>Genres:</label>
                    <select value={input.genres} onChange={(e)=>handleSelect(e)} multiple={false}>
                        {Genres && Genres.map(gen=>{
                            return (
                                <option key={gen.name} value={gen.id}>{gen.name}</option>
                            )
                        })}
                    </select>
                    {Errors.genres && (<p className='error-genres'>{Errors.genres}</p>)}
                    </div>
                </div>

                <div>
                    <div>
                        <button className='submit'
                        disabled={!Errors.name && !Errors.description && !Errors.released && !Errors.platforms && !Errors.genres? false:true}
                        type='submit'>Create
                        </button>
                    </div>
                </div>
            </form>
            
            <div>
                {/*input.platforms && input.platforms.map(plat=>
                    <div className='position'>
                        <p className='list'>{plat}</p>
                        <button className='delete' onClick={()=> handleDeletePlat(plat)}>X</button>
                    </div>)
                }

                {input.genres.map(gen=>
                    <div className='position2'>
                        <p className='lisst'>{gen}</p>
                        <button className='delete2' onClick={()=>handleDeleteGen(gen)}>X</button>

                </div>)*/}



            </div>


        </div>
        
    )
}


export default CreateGame;