import React from 'react';
import style from '../../assets/styles/Sorters.module.css' 

export default function Sorters ({ setSorters }) {

    return (
        <div className={style.column_right}>
            <div className={style.sorters}>
                <h3 className={style.sorters_title}>Ordenar por...</h3>
                        <h4 className={style.sorters_subtitle}>Nombre</h4>
                    <select className={style.options} id="name" onChange={(e) => setSorters(prevState => ({...prevState, [e.target.id]:e.target.value}))}>
                        <option defaultValue hidden>elige...</option>   
                        <option className={style.option} value="asc">ascendente</option>
                        <option className={style.option} value="desc">descendente</option>
                    </select>
                        <h4 className={style.sorters_subtitle}>Peso</h4>
                    <select className={style.options} id="weight" onChange={(e) => setSorters(prevState => ({...prevState, [e.target.id]:e.target.value}))}>
                        <option defaultValue hidden>elige...</option>
                        <option className={style.option} value="asc">ascendente</option>
                        <option className={style.option} value="desc">descendente</option>
                    </select>
            </div>
        </div>
    )
}

//a los "elige..." les saqué los selected disabled porque me tiraba warnings la consola (los eemplacé por defaultValue según me sugería)