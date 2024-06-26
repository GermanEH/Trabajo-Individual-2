import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '@/assets/styles/Adoption.module.css'
import DogCard from '@/modules/doggypedia/components/DogCard'
import Pagination from '@/modules/core/components/Pagination'
import Message from '@/components/renders/Message'
import Loader from '@/modules/core/components/Loader'
import Filters from '@/modules/doggypedia/components/filters'
import Sorters from '@/modules/doggypedia/components/Sorters'

import { cleanError, setFiltered, selectFilter, getTemperaments } from '../../redux/actions/index.js'

function DogAdoption() {

  const temperament = useSelector(state => state.temperament)
  const adopted = useSelector(state => state.adopted)
  const error = useSelector(state => state.error)
  const pagination = useSelector(state => state.pagination)
  const currentPage = useSelector(state => state.currentPage)
  const selectedFilters = useSelector(state => state.selectedFilters)
  const dispatch = useDispatch()

  useEffect(() => {dispatch(getTemperaments()); return () => {}}, [dispatch])

  const handleClose = () => {
    if(error)dispatch(cleanError())
    dispatch(setFiltered(adopted))
}

  return (
    <div className={style.dog_adoption}>
          <div className={style.column_left}>
                    {temperament && <Filters temperament={temperament} 
                    selectedFilters={selectedFilters} 
                    selectFilter={selectFilter}
                    dispatch={dispatch} className={style.filters}/>}
          </div>
          <div className={style.home_body}>
              <div className={style.dogs}> 
                {(adopted.length === 0) && (error === null)
                              ? <Loader/>
                              : (error)
                                  ? <Message msg={error} bgColor="#dc3545" handleClose={handleClose}/>
                                  : adopted.map((d, i) => {return (<DogCard key={i} image={d.image} name={d.name} temperament={d.temperament} weight={d.weight} id={d.id} />)})}
              </div>
              <div>
                  {<Pagination currentPage={currentPage} filtered={adopted} pagination={pagination} dispatch={dispatch}/>}
              </div>
          </div>
                    
          {/* <div className={style.column_right}>
              <Sorters sortByName={sortByName} sortByWeight={sortByWeight} filtered={adopted} dispatch={dispatch} />
          </div> */}
    </div>
  )
}

export default DogAdoption