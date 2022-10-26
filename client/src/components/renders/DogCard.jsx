import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import style from '../../assets/styles/DogCard.module.css';
import logo from '../../assets/images/huella_de_perro.png'
import { Link } from "react-router-dom";
import { adoption } from "../../redux/actions/index.js"

export default function DogCard ({image, name, temperament, weight, id}) {

    const adopted = useSelector(state => state.adopted)
    const dispatch = useDispatch()

    let dogData = {image, name, temperament, weight, id}
    function handleAdoption(e){
        dispatch(adoption(dogData, adopted))
    }
                        //className={`dog-card ${(captured===true) ? 'adopted' : 'not_adopted'}`}

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