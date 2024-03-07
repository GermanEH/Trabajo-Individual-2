import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from '../../assets/styles/Home.module.css' 
import Filters from "../renders/Filters.jsx";
import Sorters from "../renders/Sorters.jsx";
import Loader from "../renders/Loader.jsx";
import Pagination from "../renders/Pagination.jsx";
import DogCard from "../renders/DogCard.jsx";
import Message from "../renders/Message.jsx"
import { getAllDogs, getTemperaments, selectFilter, setFiltered, setRender, filter, sortByName, sortByWeight, 
    pagination, cleanSomeDogs, cleanDog, cleanError } from "../../redux/actions/index.js";

export default function Home () {

    //PARA GITHUB: incorporar React Select, React Forms, etc. (librerías para mejor organización y presentación visual)

    const dogs = useSelector(state => state.dogs)
    const someDogs = useSelector(state => state.someDogs)
    const dog = useSelector(state => state.dog)
    const temperament = useSelector(state => state.temperament)
    const selectedFilters = useSelector(state => state.selectedFilters)
    const filtered = useSelector(state => state.filtered)
    const currentPage = useSelector(state => state.currentPage)
    const error = useSelector(state => state.error)
    const render = useSelector(state => state.render)
    const dispatch = useDispatch()

    useEffect(() => {dispatch(getAllDogs()).then((res) => {if(res)dispatch(setFiltered(res))}); return ()=> {}}, [dispatch])
    useEffect(() => {dispatch(getTemperaments()); return () => {}}, [dispatch]) 
    useEffect(() => {(someDogs.length) ? dispatch(filter(someDogs)) : dispatch(filter()); return () => {}}, [dispatch, selectedFilters, someDogs])

    const slicedDogs = () => {
        //1. que no se encuentre ningún dog x name o id
        //1. que estén todos los dogs al montar => filtered
        //2. que haya varios dogs x filtros

        if(dog.length) return dog;
        if(filtered) {
            return filtered.slice(currentPage, currentPage + 8)
        }
        //3 y 4. que haya varios o un solo dog x searchByName => dog => filtered
        // if(Object.keys(dog).length > 0) return dog.slice(currentPage, currentPage + 8);

        // if(Object.keys(dog).length > 0 && filtered.length > 0) return filtered.slice(currentPage, currentPage + 8);

        //5. que no haya ningún dog por filtros => mensaje de error "Dogs not found"
        // if(selectedFilters > 0 && filtered.length === 0) return error;
    }

    if(render) {
        dispatch(setRender())
        slicedDogs()
    }

    const handleClose = () => {
        if(dog.length) dispatch(cleanDog())
        if(someDogs.length) dispatch(cleanSomeDogs())
        if(error)dispatch(cleanError())
        dispatch(setFiltered(dogs))
    }

    return (
        <div className={style.home}>
            <div className={style.column_left}>
                    {temperament && <Filters temperament={temperament} 
                    selectedFilters={selectedFilters} 
                    selectFilter={selectFilter}
                    dispatch={dispatch} className={style.filters}/>}
            </div>
            <div className={style.home_body}>
                    {!error && someDogs.length ? <div className={style.back_button}><h2>Dogs searched by name</h2><p>(close to get back)</p><button className={style.close_button} onClick={handleClose}>X</button></div> : <div></div>}
                    {!error && dog.length ? <div className={style.back_button}><h2>Dog searched by id</h2><p>(close to get back)</p><button className={style.close_button} onClick={handleClose}>X</button></div> : <div></div>}
                <div className={style.dogs}> 
                    {(filtered.length === 0 && error === null)
                        ? <Loader/>
                        : (error)
                            ? <Message msg={error} bgColor="#dc3545" handleClose={handleClose}/>
                            : slicedDogs().map((d, i) => {return (<DogCard key={i} image={d.image} name={d.name} temperament={d.temperament} weight={d.weight} id={d.id} />)})}
                    </div>
                    {<Pagination currentPage={currentPage} filtered={filtered} pagination={pagination} dispatch={dispatch}/>}
            </div>
            <div className={style.column_right}>
                <Sorters sortByName={sortByName} sortByWeight={sortByWeight} filtered={filtered} dispatch={dispatch} />
            </div>
        </div>
    )
}