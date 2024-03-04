import React from 'react'
import { useDocument } from '../../hooks/useDocument'
import { useParams } from 'react-router-dom';
import './Project.css'
import ProjectSummary from './ProjectSummary';
import CommentForm from './CommentForm';
export default function Project() {
  const { id } = useParams();
  const {document,error} = useDocument('projects',id)
console.log(document)
if (error) {
  return <div className="error">{error}</div>
}
if (!document) {
  return <div className="loading">Loading...</div>
}

  return (
    <div className="project-details">
      <ProjectSummary project={document}></ProjectSummary>
      <CommentForm project={document}></CommentForm>
    </div>
  )
}
