import {useState,useEffect} from 'react'
import { projectAuth,projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { ACTIONS } from '../context/AuthContext'

export const useLogin = () =>{
    const {dispatch,user} = useAuthContext()
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const [cancelled,setCancelled] = useState(false)





    const login = async(email,password)=>{
        setError(null)
        setIsPending(true)

        try{
           const res = await projectAuth.signInWithEmailAndPassword(email,password)
           await projectFirestore.collection('users').doc(res.user.uid).update({
            online:true,
            
        })
           if(!res){
            throw new Error('error mannnn')
        }
        dispatch({type:ACTIONS.LOGIN,payload:res.user})

        if(!cancelled){
            setIsPending(false)
            setError(null)     
         console.log(res) 

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


    return {error,isPending,login}
}