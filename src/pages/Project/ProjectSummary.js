import React from 'react'
import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
export default function ProjectSummary({project}) {
  const {user} = useAuthContext()
  const {deleteDocument} = useFirestore('projects')
  const history = useHistory();

  function handleClick(){
    deleteDocument(project.id)
    history.push('/');

  }
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.category}
          <br />
          {project.details}

        </p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
        

      </div>

      {user.uid === project.createdBy.id &&(

<button onClick={handleClick}className='btn'>Mark as Complete</button>

)}
    </div>
  )
}
