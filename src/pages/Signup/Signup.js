import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './Signup.css'
export default function Signup() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [nickname,setNickname] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)


    const {error,isPending,signup} = useSignup()
    function handleSubmit(e){
        e.preventDefault()
        console.log(thumbnail)
        signup(email,password,nickname,thumbnail)
    }

    function handleFileChange(e){
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)

        if(!selected){
            setThumbnailError('Please select a dile')
            return
        }
        if(!selected.type.includes('image')){
            setThumbnailError('choose an image please')
            return
        }

        if(!selected.size>100000){
            setThumbnailError('size should be less than 100000')
            return
        }
        setThumbnailError(null)
        setThumbnail(selected)
        console.log('succesful')

    }

  return (


    <div>
        <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Sign up</h2>

            <label>
                <span>email:</span>
                <input required value={email} onChange={(e)=>setEmail(e.currentTarget.value)}  type="email" />
            </label>

            <label>
                <span>password:</span>
                <input required value={password} onChange={(e)=>setPassword(e.currentTarget.value)} type="password" />
            </label>

            <label>
                <span>nickname:</span>
                <input required type="text" value={nickname} onChange={(e)=>setNickname(e.currentTarget.value)} />
            </label>

            <label>
        <span>Profile thumbnail:</span>
        <input 
          required
          onChange={handleFileChange}
          type="file" 
        />
        {thumbnailError && <div className='error'>
            {thumbnailError}
            </div>}
      </label>

      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}

        </form>
    </div>
  )
}
