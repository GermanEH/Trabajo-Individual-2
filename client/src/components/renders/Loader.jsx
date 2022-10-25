import React from 'react';
// import 'Loader.css'
import Logo from '../../assets/images/unnamed.jpg'        //COMPLETAR CON LOGO

export default function Loader () {
    return (
        <div>
            <img src={Logo} alt="loading..." widht="150" height="150"/>
            <br></br>
            <p>Cargando...</p>
        </div>
    )
}