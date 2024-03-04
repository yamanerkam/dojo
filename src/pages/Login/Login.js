import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Login.css'

import { useLogin } from '../../hooks/useLogin'
export default function Login() {
  const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {isPending,error,login} = useLogin()
   
    function handleSubmit(e){
        e.preventDefault()
        login(email,password)

    }

  return (
    <div>
        <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login</h2>

            <label>
                <span>email:</span>
                <input required value={email} onChange={(e)=>setEmail(e.currentTarget.value)}  type="email" />
            </label>

            <label>
                <span>password:</span>
                <input required value={password} onChange={(e)=>setPassword(e.currentTarget.value)} type="password" />
            </label>

            

           
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}

        </form>
    </div>
  )
}

