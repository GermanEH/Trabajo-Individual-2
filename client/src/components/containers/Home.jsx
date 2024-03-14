import style from '../../assets/styles/Home.module.css' 
import Filters from "../renders/Filters.jsx"
import Sorters from "../renders/Sorters.jsx";
import { DogsList } from '../renders/DogsLists.jsx'
import useFetchInitialData from "../../customHooks/useFetchInitialData";
import useSortingAndFiltering from "../../customHooks/useSortingAndFiltering";

export default function Home () {

    //PARA GITHUB: incorporar React Select, React Forms, etc. (librerías para mejor organización y presentación visual)
 
    const {filtered, temperament, dispatch} = useFetchInitialData()
    const {filters, setFilters, setSorters} = useSortingAndFiltering()

    return (
        <div className={style.home}>
            <Filters filters={filters} setFilters={setFilters} temperament={temperament} />
            <DogsList setFilters={setFilters} filtered={filtered} dispatch={dispatch} />
            <Sorters setSorters={setSorters}/>
        </div>
    )
}