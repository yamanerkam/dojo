import React, { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Dashboard.css'
export default function Dashboard() {
  const {documents,error} = useCollection('projects')
  const [filter,setFilter] = useState('all')
  const { user} = useAuthContext()
  function changeFilter(f){
    setFilter(f)
} 

const projects = documents ? documents.filter((doc)=>{
    switch (filter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe= false
        doc.assignedUsersList.forEach((u)=>{
          if(user.uid ===  u.id){
            assignedToMe = true
          }
        })
        return assignedToMe

      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(doc.category,filter)
        return doc.category === filter


      default:
       return true
    }
}) : null


  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'></p>}
      {documents && <ProjectFilter filterChange={changeFilter} filter={filter}></ProjectFilter>}
      {projects && <ProjectList filter={filter} projects={projects}></ProjectList>}
    </div>
  )
}
