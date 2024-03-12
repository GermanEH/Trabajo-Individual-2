import style from '../../assets/styles/Filters.module.css'
import { Temperaments } from './Temperaments.jsx'
import { Origin } from './Origin.jsx'

export default function Filters ({filters, setFilters, temperament}) {
    
    return (
    <div className={style.column_left}>
        {temperament && 
        <div className={style.filters}>
            <h3 className={style.filters_title}>Filtrar por...</h3>
                    <Temperaments temperament={temperament} filters={filters} setFilters={setFilters}/>
                    <Origin filters={filters} setFilters={setFilters}/>
        </div>}
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