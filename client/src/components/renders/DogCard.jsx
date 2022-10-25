import React from 'react';
import style from '../../assets/styles/DogCard.module.css';
import { Link } from "react-router-dom";

export default function DogCard ({image, name, temperament, weight, id, addCapture}) {

    console.log(id)
    // let dogData = {image, name, temperament, weight}
    // let captured = false
    // function handleCapture(){
    //     if (captured === false) {captured = true}
    //     else {captured = false}
    //     addCapture(pokemonData)
    // }
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