import style from '../../assets/styles/Filters.module.css'


export const Temperaments = ({temperament, filters, setFilters}) => {

  return (
    <>
        <h4 className={style.filters_subtitle}>Temperamento</h4>
        <select className={style.options} id="temperaments" onChange={(e) => setFilters([...filters, {'temperament': e.target.value}])}>
            {(temperament?.map(
                (t, i) => 
                <option className="option" 
                value={t.name} 
                key={t.name}>{t.name}</option>
            ))}
        </select>
        <div>{(filters?.map(
            (t, i) => 
            <div key={t.temperament}>
                {t.temperament}
                <button onClick={() => setFilters(filters.filter(f => Object.values(f)[0] !== t.temperament))}>x</button>
            </div>
        ))}
        </div>
    </>
  )
}

export default Temperaments