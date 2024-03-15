import style from '../../../assets/styles/Filters.module.css'
import { Temperaments } from './Temperaments.tsx'
import { Origin } from './Origin.tsx'
import Weigth from './Weigth.tsx'
import Height from './Height.tsx'
import LifeSpan from './LifeSpan.tsx'
import Group from './Group.tsx'
import Source from './Source.tsx'

export default function Filters ({filters, setFilters, temperament, group}) {
    
    return (
    // <div className={style.column_left}>
    <>
        {temperament && 
        <div className={style.filters}>
            {/* <h3 className={style.filters_title}>Filtrar por...</h3> */}
                    <Group group={group} filters={filters}/>
                    <Temperaments temperament={temperament} filters={filters} setFilters={setFilters}/>
                    <Weigth/>
                    <Height/>
                    <LifeSpan/>
                    <Origin filters={filters} setFilters={setFilters}/>
                    <Source/>
        </div>}
    </>
        // </div>
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