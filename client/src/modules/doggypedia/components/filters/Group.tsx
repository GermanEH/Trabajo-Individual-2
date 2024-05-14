import React from 'react'
import style from '@/assets/styles/Filters.module.css'

const Group = ({group, setFilters}) => {
  return (
    <>
        {/* Group */}
      
              {(group?.map(g => 
                  <button className={style.filter} id="groups" onClick={(e) => setFilters(prevFilters => [...prevFilters, {'group': g.name}])}>
                    {g.name}
                  </button>
              ))}
          
    </>
  )
}

export default Group