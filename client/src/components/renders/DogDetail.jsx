import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from '../../assets/styles/DogDetail.module.css';
import Loader from "./Loader.jsx"
import { getDog, setFiltered, cleanDog } from "../../redux/actions";

export default function DogDetail (props) {

    console.log(props)
    const dogId = props.match.params.id
    const dog = useSelector(state => state.dog[0])
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDog(dogId)); 
        return function() {dispatch(cleanDog())}}, 
        [dispatch, dogId])
    useEffect(() => dispatch(setFiltered(dog)))

    console.log(dog)
    return (
        <div>
            <div className={style.dog_detail}>
                {(dog)?
                <div className={style.dog_container}>
                <div className={style.dog_head}>
                    <h3>
                        {dog.name}
                    </h3>
                    <div>
                        <img src={dog.image} alt="not found" height='200'/>
                    </div>
                </div>
                <div className={style.dog_info}>
                    <div className={style.dog_data}>
                        <div className={style.dog_stat}>
                            Temperament: {dog.temperament.join(', ')}
                        </div>
                        <div className={style.dog_stat}>
                            Height: {dog.height}
                        </div>
                        <div className={style.dog_stat}>
                            Weight: {dog.weight}
                        </div>
                        <div className={style.dog_stat}>
                            life span: {dog.life_span}
                        </div>
                    </div>
                </div>
            </div>
            : 
            <Loader/>}
            </div>
        </div>
    )
}