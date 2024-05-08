import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDogs, getTemperaments } from "../redux/actions/index.js";

const useFetchInitialData = () => {

    const filtered = useSelector(state => state.filtered)
    const temperament = useSelector(state => state.temperament)
    const group = useSelector(state => state.group)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperaments());
        return ()=> {}
    }, [dispatch])

  return {
    filtered,
    temperament,
    group,
    origin,
    dispatch
  }
}

export default useFetchInitialData