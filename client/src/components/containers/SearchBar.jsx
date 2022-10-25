import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getDog } from '../../redux/actions'

export default function SearchBar () {
    const dogs = useSelector(state => state.dogs)
    const dispatch = useDispatch()
    const [newDog, setNewDog] = useState("")
    return (
        <div>
            <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(getDog(newDog, dogs)) 

//los perros seleccionados pueden ser tratados como un estado de redux/local, o como un filtro más. 
//cleanDetail

//uso un mismo estado dog para detail y para searchbar (y en el back es dsitinto: una misma función para all y para searchbar)
//puedo filtrar dogs como un filtro más
//puedo pisar dogs, y desmontar al volver a clickear en Home / ir a otra sección
//puedo hacer un estado aparte 'someDogs'
//puedo pisar dog, y hacer un filtrado aparte

            setNewDog("")
            }}>
                <input 
                type="text"
                placeholder="Dog..."
                value={newDog}
                onChange={e => setNewDog(e.target.value)}/>
                <input type="submit" value="Search"/>
            </form>
        </div>
    )
}