import React, { useState } from 'react';
import style from '../../assets/styles/DogCard.module.css';
import logo from '../../assets/images/huella_de_perro.png'
import { Link } from "react-router-dom";

export default function DogCard ({image, name, temperament, weight, id, addAdoption}) {

    const [adopted, setAdopted] = useState(false)

    let dogData = {image, name, temperament, weight, id}
    function handleAdoption(e){
        if (adopted === false) {setAdopted(true)}
        else {setAdopted(false)}
        addAdoption(dogData)
    }
                        //className={`pokemon-card ${(captured===true) ? 'pokemon_captured' : 'pokemon_savage'}`}


                        //está bien el link de dogs/id??? o es otro nombre
    return (
        <div>
            <div className={style.dog_card}>       
                <Link to ={`/dogs/${id}`} className={style.dog_name}>       
                    <h3>
                        {name}
                    </h3>
                </Link>
                <div className={style.dog_adoption} onClick={handleAdoption}>
                    <img src={logo} alt="not found" width='20' height='20'/>
                </div>
                <div>
                    <img src={image} alt="not found" height='150' width='100%'/>
                </div>
                <div className={style.dog_info}>
                    <div>
                        <span className={style.dog_tag}>Weight:</span> {weight}
                    </div>
                    <div>
                        <span className={style.dog_tag}>Temperament:</span> {temperament.join(', ')}
                    </div>
                </div>
            </div>
        </div>
        )
    // <div onClick={handleCapture}><img src={'https://img.elo7.com.br/product/zoom/28E57D8/pokebola-eva.jpg'} alt="not found" width='20' height='20'/></div>
}