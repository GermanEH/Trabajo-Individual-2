import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filter, sort } from "../redux/actions/index.js";

const useSortingAndFiltering = () => {
  
    const [ filters, setFilters ] = useState([])
    const [ sorters, setSorters ] = useState(new Set([{"name": ""}, {"weight": ""}]))

    const filtered = useSelector(state => state.filtered)
    const dispatch = useDispatch()
    
    useEffect(() => {dispatch(filter(filters)); return () => {}}, [dispatch, filters])
    useEffect(() => {dispatch(sort(sorters,filtered)); return () => {}}, [dispatch, sorters])

    return {
    filters, setFilters, sorters, setSorters
  }
}

export default useSortingAndFiltering