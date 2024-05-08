import style from '../../assets/styles/Home.module.css' 
import Filters from "../../modules/doggypedia/components/filters"
import Sorters from "../../modules/doggypedia/components/Sorters.js";
import { DogsList } from '../../modules/doggypedia/components/DogsLists.tsx'
import useFetchInitialData from "../../customHooks/useFetchInitialData.jsx";
import useSortingAndFiltering from "../../customHooks/useSortingAndFiltering.jsx";

export default function Breeds () {

    //PARA GITHUB: incorporar React Select, React Forms, etc. (librerías para mejor organización y presentación visual)
 
    const {filtered, temperament, group, dispatch} = useFetchInitialData()
    const {filters, setFilters, setSorters} = useSortingAndFiltering()

    return (
        <div className={style.home}>
            <Filters filters={filters} setFilters={setFilters} temperament={temperament} group={group} />
            <DogsList setFilters={setFilters} filtered={filtered} dispatch={dispatch} />
            <Sorters setSorters={setSorters}/>
        </div>
    )
}