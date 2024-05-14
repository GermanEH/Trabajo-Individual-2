import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDogByName } from '@/redux/actions/index.js';
import style from '@/assets/styles/SearchBar.module.css';
import logo from '@/assets/images/lupa.png'

export default function SearchBar () {
    const dogs = useSelector(state => state.dogs)
    const dispatch = useDispatch()
    const [newDog, setNewDog] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDogByName(newDog, dogs))
        setNewDog("")
    }
    return (
        <div>
            <form 
            // onSubmit
            // ={
                // (e) => {
            // e.preventDefault();
            // dispatch(getDog(newDog, dogs)) 

//los perros seleccionados pueden ser tratados como un estado de redux/local, o como un filtro más. 
//cleanDetail

//uso un mismo estado dog para detail y para searchbar (y en el back es dsitinto: una misma función para all y para searchbar)
//puedo filtrar dogs como un filtro más
//puedo pisar dogs, y desmontar al volver a clickear en Home / ir a otra sección
//puedo hacer un estado aparte 'someDogs'
//puedo pisar dog, y hacer un filtrado aparte

            // setNewDog("")
            // }}>
            >
                <input 
                className={style.search_input}
                type="text"
                placeholder="Search by name or id..."
                value={newDog}
                onChange={e => setNewDog(e.target.value)}/>
                <img src={logo} alt="img" className={style.lupa} onClick={(e) => handleSubmit(e)}/>
            </form>
        </div>
    )
}
