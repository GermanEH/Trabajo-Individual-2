import React from 'react';
import style from '../../assets/styles/Filters.module.css'

export default function Filters ({temperament, selectFilter, selectedFilters, dispatch}) {

    let filters = []
    for (const filter of selectedFilters) {
        filters.push(Object.values(filter))
    }
    return (
        <div className={style.filters}>
            <h3 className={style.filters_title}>Filtrar por...</h3>
                    <h4 className={style.filters_subtitle}>Temperamento</h4>
                    <select className={style.options} id="temperaments" onChange={(e) => dispatch(selectFilter(selectedFilters, {'temperament': e.target.value}))}>
                        {(temperament?.map(
                            (t, i) => 
                            <option className="option" 
                            value={t.name} 
                            key={i}>{t.name}</option>
                        ))}
                    </select>
                    <div>{filters?.map(
                        (t, i) => 
                        <div key={i}>
                            {t}
                            <button value={t} onClick={(t) => dispatch(selectFilter(selectedFilters, {'temperament': t.target.value}))}>x</button>
                        </div>
                    )}</div>
                    <h4 className={style.filters_subtitle}>Origen</h4>
                    <div className={style.origins}>
                        <button className={style.origin} onClick={() => dispatch(selectFilter (selectedFilters, {'origin': 'original'}))} key={1}>original</button>
                        <button className={style.origin} onClick={() => dispatch(selectFilter (selectedFilters, {'origin': 'created'}))} key={2}>created</button>
                    </div>
        </div>
        
    )
}

//Se puede mejorar con React-select o React multiselect

                    // <select className="options" id="origins" onChange={(e) => dispatch(sortByName(e.target.value, filtered))}>
                    //     <option className="option" value="asc">ascendente</option>
                    //     <option className="option" value="desc">descendente</option>
                    // </select>

                //     <div className="temperaments">
                //     {(temperament?.map(
                //         (t, i) => 
                //         <div className="temperament" key={i}>
                //             <input 
                //             type="checkbox" 
                //             onChange={() => dispatch(selectFilter(selectedFilters, {'temperament': t.name}))} 
                //             key={i}></input>
                //                 {t.name}</div>))}
                // </div>

//AÑADIRLE UNA SOMBRA AL HACER CLICK EN UNO DE LOS BOTONES FILTERBYORIGIN