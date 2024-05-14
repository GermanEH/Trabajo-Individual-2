import style from '@/assets/styles/Filters.module.css'
import { RiBearSmileLine } from "react-icons/ri";


export const Temperaments = ({temperament, filters, setFilters}) => {

  return (
    <>
    <div>
        {/* Temperament */}
        <RiBearSmileLine style={{width:'25px',height:'50px', padding:'1rem', border:'solid 5px', borderRadius:'50%', transform:'rotate(-25deg)'}}/>
        <select className={style.options} id="temperaments" onChange={(e) => setFilters(prevFilters => [...prevFilters, {'temperament': e.target.value}])}>
            {(temperament?.map(
                (t, i) => 
                <option className="option" 
                value={t.name} 
                key={t.name}>{t.name}</option>
            ))}
        </select>
    </div>
        {/* <h4 className={style.filters_subtitle}>Temperamento</h4>
        <select className={style.options} id="temperaments" onChange={(e) => setFilters(prevFilters => [...prevFilters, {'temperament': e.target.value}])}>
            {(temperament?.map(
                (t, i) => 
                <option className="option" 
                value={t.name} 
                key={t.name}>{t.name}</option>
            ))}
        </select>
        <div>{(filters?.map( t => 
            <div key={t.temperament}>
                {t.temperament}
                <button onClick={() => setFilters(prevFilters => prevFilters.filter(f => Object.values(f)[0] !== t.temperament))}>x</button>
            </div>
        ))}
        </div> */}
    </>
  )
}

export default Temperaments