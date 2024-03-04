import React from 'react'
import { useState } from 'react'
import {useAuthContext} from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useCollection } from '../../hooks/useCollection'
import { useParams } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore'
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Make sure to import the locale you need


import Avatar from '../../components/Avatar'
export default function CommentForm({project}) {
  var relativeTime = require('dayjs/plugin/relativeTime')

  dayjs.locale('en');
  dayjs.extend(relativeTime)


  console.log(project.comments)
  const {updateDocument,deleteDocument} = useFirestore('projects')
  const { id } = useParams();
  console.log(id)
  const {user} = useAuthContext()
  const [comment,setComment]= useState('')
  async function handleSubmit(e){
    e.preventDefault()
    
    const commentToAdd ={
      displayName: user.displayName,
      photoUrl:user.photoURL,
      content:comment,
      createdAt:timestamp.fromDate(new Date()),
      id:Math.random()
    }
    console.log(commentToAdd)
   await updateDocument(project.id,{comments:[...project.comments,commentToAdd]})
    setComment('')
  }
  return (
    <div className='project-comments'>
      <h4>Project Comments</h4> 


      <ul>
        {project.comments.length > 0 && project.comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoUrl} />
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{dayjs(comment.createdAt.toDate()).fromNow()}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

        <form className='add-comment' onSubmit={handleSubmit}>
          <label>
            <span>Add a new comment:</span>
            <textarea required value={comment} onChange={(e)=> setComment(e.target.value)} type="text" name="comment"/>
          </label>
          <button className="btn">Comment</button>

        </form>
      
    </div>
  )
}
