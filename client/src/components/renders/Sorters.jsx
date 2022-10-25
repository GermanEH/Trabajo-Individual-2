import React from 'react';
import style from '../../assets/styles/Sorters.module.css' 

export default function Sorters ({sortByName, sortByWeight, dispatch, filtered}) {

    return (
            <div className={style.sorters}>
                <h3 className={style.sorters_title}>Ordenar por...</h3>
                        <h4 className={style.sorters_subtitle}>Nombre</h4>
                    <select className={style.options} id="origins" onChange={(e) => dispatch(sortByName(e.target.value, filtered))}>
                        <option defaultValue hidden>elige...</option>   
                        <option className={style.option} value="asc">ascendente</option>
                        <option className={style.option} value="desc">descendente</option>
                    </select>
                        <h4 className={style.sorters_subtitle}>Peso</h4>
                    <select className={style.options} id="weight" onChange={(e) => dispatch(sortByWeight(e.target.value, filtered))}>
                        <option defaultValue hidden>elige...</option>
                        <option className={style.option} value="asc">ascendente</option>
                        <option className={style.option} value="desc">descendente</option>
                    </select>
            </div>
    )
}

//a los "elige..." les saqué los selected disabled porque me tiraba warnings la consola (los eemplacé por defaultValue según me sugería)