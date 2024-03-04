import {useEffect, useState} from 'react'
import { projectAuth,projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { ACTIONS } from '../context/AuthContext'

export const useLogout = () =>{
    const {dispatch,user} = useAuthContext()
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const [cancelled,setCancelled] = useState(false)
    const logout = async ()=>{
        setError(null)
        setIsPending(true)
        try{
            if(user){
                            await projectAuth.signOut()
                            await projectFirestore.collection('users').doc(user.uid).update({
                                online:false,
                                
                            })
                
                            dispatch({type:ACTIONS.LOGOUT})

            }

            if(!cancelled){
                setIsPending(false)
                setError(null)
               }
        }
        catch(err){
            if(!cancelled){
                console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
    }

    useEffect(()=>{
        return ()=>setCancelled(true)
    },[])

    return {error,isPending,logout}



}