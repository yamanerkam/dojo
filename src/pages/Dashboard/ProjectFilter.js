import React, { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'

const filterList = ['all','mine','development','design','marketing','sales']


export default function ProjectFilter({filter,filterChange}) {
    const {documents,error} = useCollection('projects')
   function handleClick(f){
        filterChange(f)
        console.log(filter)
   } 

  return (
    <div className='project-filter'>
        <nav>
            <p>Filter by: </p>
                {filterList.map((f)=>(
                    <button key={f}
                       onClick={()=>handleClick(f)} 
                       className={filter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
        </nav>
    </div>
  )
}
