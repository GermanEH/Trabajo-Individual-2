import style from '@/assets/styles/Filters.module.css'
import { FaLocationDot } from "react-icons/fa6";

export const Origin = ({filters, setFilters}) => {

  return (
    <>
    <div>Origin
    <FaLocationDot style={{width:'50%',height:'auto'}} />

    </div>
        {/* <h4 className={style.filters_subtitle}>Origen</h4>
    <div className={style.origins}>
        <button className={style.origin} onClick={() => setFilters([...filters, {'origin': 'original'}])} key={1}>original</button>
        <button className={style.origin} onClick={() => setFilters([...filters, {'origin': 'created'}])} key={2}>created</button>
    </div> */}
    </>
  )
}