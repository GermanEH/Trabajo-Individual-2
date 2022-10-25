import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from '../../assets/styles/Form.module.css'
// import logo from '../../assets/Ash_Ketchum_BW.webp'       //CAMBIAR LOGO
import Message from '../renders/Message.jsx'
import { getAllDogs, getTemperaments, createDog, cleanError, cleanMessage } from '../../redux/actions'
import validations from "../../helpers/validations.js"; 
import { Link } from "react-router-dom";

export default function Form () {

    const error = useSelector(state => state.error)
    const message = useSelector(state => state.message)

    const initialForm = {
        image:'',
        name:'',
        minHeight:0,               
        maxHeight:0,
        minWeight:0,   
        maxWeight:0,
        minLifeSpan:0,
        maxLifeSpan:0,
        temperaments:[]
    }
    const [input, setInput] = useState(initialForm)
    const [namesExistentes, setNamesExistentes] = useState([])
    const [selectedTemperaments, setSelectedTemperaments] = useState([])
    const [errors, setErrors] = useState({})

    const dogs = useSelector(state => state.dogs)
    const temperament = useSelector(state => state.temperament)
    const dispatch = useDispatch()

    useEffect(() => dispatch(getAllDogs()), [dispatch])
    useEffect(() => dispatch(getTemperaments()), [dispatch]) 

    useEffect(() => {
        let dogNames = []
        let getNames = (dogs) => {
            for (const dog of dogs) {
                dogNames.push(dog.name)
            } 
            return dogNames
        };
        const names = getNames(dogs); setNamesExistentes(names)
    }, [dogs])
    useEffect(() => setInput(prevInput => ({...prevInput, temperaments: selectedTemperaments})), [selectedTemperaments])
    useEffect(() => setErrors(validations(input, namesExistentes)), [input, namesExistentes])

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validations(input, namesExistentes))
    }

    const handleTemperamentSelect = (tName) => {
        if(selectedTemperaments.includes(tName)){
            setSelectedTemperaments(selectedTemperaments.filter(te => te !== tName))
        } else {
            setSelectedTemperaments([...selectedTemperaments, tName])
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createDog(input));
        setInput(initialForm)
    }

//"las validaciones x html no son las mismas que las validaciones x react"

//NO ESCATIMAR EN VALIDACIONES


    // const handleBlur = (e) => {
    //     handleInputChange(e)
    //     setErrors(validationForm(input))
    // }

    const handleClose = () => {
        if(error)dispatch(cleanError())
        if(message)dispatch(cleanMessage())
    }

    return (
    <div className={style.newDog}>
        <div className={style.right_column}>
            <div className={style.back_button_container}>
                <Link to ={`/home`} className={style.back_button}>
                    <div>{'<'}</div>
                </Link>
            </div>
        </div>
        {error 
            ? <Message msg={error} bgColor="#dc3545" handleClose={handleClose}/> 
            : (message) 
                ? <Message msg={message} bgColor="#3c763d" handleClose={handleClose}/>
                : <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.table}>
                        <div className={style.dogItem}>
                            <label htmlFor="image">Image: </label>
                            <input 
                            key="image"
                            type="url"                      
                            name="image"
                            placeholder="Image..."
                            value={input.image}
                            // onBlur={handleBlur}
                            onChange={handleInputChange}/>
                        </div>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="name">Name: </label>
                                    <input  
                                className={`${style.input} ${(errors.name) ? style.error : style.complete}`}
                                key="name"
                                type="text"
                                name="name"
                                placeholder="Name..."
                                value={input.name}
                                // onBlur={handleBlur}
                                onChange={handleInputChange}/>
                        </div>
                        <p className={style.validator}>{errors.name}</p>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="minHeight">Min Height: </label>
                                <input 
                                    className={`${style.input} ${(errors.minHeight) ? style.error : style.complete}`}
                                    key="minHeight"
                                    type="number"
                                    name="minHeight"
                                    placeholder="Min height..."
                                    value={input.minHeight}
                                    // onBlur={handleBlur}
                                    onChange={handleInputChange}/>
                        </div>
                        <div className="empty"></div>
                        <p className={style.validator}>{errors.minHeight}</p>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="maxHeight">Max Height: </label>
                                <input 
                                className={`${style.input} ${(errors.maxHeight) ? style.error : style.complete}`}
                                key="maxHeight"
                                type="number"
                                name="maxHeight"
                                placeholder="Max height..."
                                value={input.maxHeight}
                                // onBlur={handleBlur}
                                onChange={handleInputChange}/>
                        </div>
                        <p className={style.validator}>{errors.maxHeight}</p>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="minWeight">Min Weight: </label>
                                <input 
                                className={`${style.input} ${(errors.minWeight) ? style.error : style.complete}`}
                                key="minWeight"
                                type="number"
                                name="minWeight"
                                placeholder="Min weight..."
                                value={input.minWeight}
                                // onBlur={handleBlur}
                                onChange={handleInputChange}/>
                        </div>
                        <p className={style.validator}>{errors.minWeight}</p>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="maxWeight">Max Weight: </label>
                            <input 
                            className={`${style.input} ${(errors.maxWeight) ? style.error : style.complete}`}
                            key="maxWeight"
                            type="number"
                            name="maxWeight"
                            placeholder="Max weight..."
                            value={input.maxWeight}
                            // onBlur={handleBlur}
                            onChange={handleInputChange}/>
                        </div>
                        <p className={style.validator}>{errors.maxWeight}</p>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="minLifeSpan">Min life span: </label>
                            <input 
                            className={`${style.input} ${(errors.minLifeSpan) ? style.error : style.complete}`}
                            key="minLifeSpan"
                            type="number"
                            name="minLifeSpan"
                            placeholder="Min life span..."
                            value={input.minLifeSpan}
                            // onBlur={handleBlur}
                            onChange={handleInputChange}/>
                        </div>
                        <p className={style.validator}>{errors.minLifeSpan}</p>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="maxLifeSpan">Max life span: </label>
                            <input 
                            className={`${style.input} ${(errors.minLifeSpan) ? style.error : style.complete}`}
                            key="maxLifeSpan"
                            type="number"
                            name="maxLifeSpan"
                            placeholder="Max life span..."
                            value={input.maxLifeSpan}
                            // onBlur={handleBlur}
                            onChange={handleInputChange}/>
                        </div>
                        <p className={style.validator}>{errors.maxLifeSpan}</p>
                        <div className={style.dogItem}>
                            <label className={style.label} htmlFor="temperaments">Temperament:</label>
                        </div>
                    </div>
                            <select key="temperaments" className={`${style.options}  ${(errors.temperaments) ? style.error : style.complete}`} id="temperaments" onChange={(e) => handleTemperamentSelect(e.target.value)}>
                                {(temperament?.map(
                                    (t, i) => 
                                    <option className={style.options}
                                    value={t.name} 
                                    key={i}>{t.name}</option>
                                ))}
                            </select>
                            <br></br>
                            <div>{(selectedTemperaments?.map(
                                (t, i) => 
                                <div key={i}>
                                    {t}
                                    <button type="button" value={t} onClick={(t) => handleTemperamentSelect(t.target.value)}>x</button>
                                </div>
                                ))}</div>
                        <p className={style.validator}>{errors.temperaments}</p>
                        <div className={style.dogItem}>
                            <button type="submit" disabled={Object.values(errors).length} className={Object.values(errors).length ? style.button_disabled : style.button}>Create Dog</button>
                        </div>
            </form>}
        <div className={style.left_column}>
                        {/* <img src={logo} alt="Ash Ketchum" width="300" height="500"></img> */}
        </div>
    </div>
    )
}