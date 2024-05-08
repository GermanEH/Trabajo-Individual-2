import { useSelector } from "react-redux";
import Loader from "../../core/components/Loader.js";
import Pagination from "../../../components/renders/Pagination.tsx/index.js";
import DogCard from "../renders/DogCard.jsx";
import Message from "../../../components/renders/Message.jsx"
import { pagination, cleanError } from "../../../redux/actions/index.js";
import style from '../../assets/styles/DogsLists.module.css' 

export const DogsList = ({setFilters, filtered, dispatch}) => {

    const currentPage = useSelector(state => state.currentPage)
    const error = useSelector(state => state.error)

    const handleClose = () => {
        if(error)dispatch(cleanError())
        setFilters([])
    }

    let slicedDogs = () => {
        if(filtered.length > 0) {
            return filtered.slice(currentPage, currentPage + 8)
        } else {
            return filtered
        }
    }

    return (
    <div className={style.home_body}>
        {/* {!error && someDogs.length ? <div className={style.back_button}><h2>Dogs searched by {filter}</h2><p>(close to get back)</p><button className={style.close_button} onClick={handleClose}>X</button></div> : <div></div>} */}
        {/* {!error && dog.length ? <div className={style.back_button}><h2>Dog searched by id</h2><p>(close to get back)</p><button className={style.close_button} onClick={handleClose}>X</button></div> : <div></div>} */}
        <div className={style.dogs}> 
        {(filtered.length === 0 && error === null)
            ? <Loader/>
            : (error)
                ? <Message msg={error} bgColor="#dc3545" handleClose={handleClose}/>
                : slicedDogs().map((d, i) => {return (<DogCard key={i} image={d.image} name={d.name} temperament={d.temperament} weight={d.weight} id={d.id} />)})}
        </div>
        <Pagination currentPage={currentPage} filtered={filtered} pagination={pagination} dispatch={dispatch}/>
    </div>
    )
}