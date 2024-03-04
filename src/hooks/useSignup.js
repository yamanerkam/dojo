import {useState, useEffect} from 'react'
import {projectAuth,projectStorage,projectFirestore} from '../firebase/config'
import {useAuthContext} from './useAuthContext'
import {ACTIONS} from '../context/AuthContext'

export const useSignup = () => {

    const [error,
        setError] = useState(null)
    const [isPending,
        setIsPending] = useState(false)
    const [cancelled,
        setCancelled] = useState(false)

    const signup = async(email, password, displayName) => {
        setError(null)
        setIsPending(true)
        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            if (!res) {
                throw new Error('errorrrrr')
            }

            // upload user thumbnail
            const uploadPath = `thumbnail/${res.user.uid}/${thumbnail.name}`
            const image = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await image.ref.getDownloadURL()

            await res
                .user
                .updateProfile({displayName,photoURL:imgUrl})


            // create a user document
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online:true,
                displayName,
                photoURL:imgUrl
            })


            dispatch({type: ACTIONS.SIGNUP, payload: res.user})
            if (!cancelled) {
                setIsPending(false)
                setError(null)
                console.log(res)

            }
        } catch (err) {
            if (!cancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }

    }
    useEffect(() => {
        return () => setCancelled(true)
    }, [])
    return {error, isPending, signup}

}