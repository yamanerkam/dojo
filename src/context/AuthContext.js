import {createContext, useEffect, useReducer} from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext()

export const ACTIONS = {
    SIGNUP: 'sign_up',
    LOGOUT: 'log_out',
    LOGIN: 'log_in',
    AUTHISREADY: 'auth_is_ready'
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SIGNUP:
            return {
                ...state,
                user: action.payload
            }
        case ACTIONS.LOGOUT:
            return {
                ...state,
                user: null
            }
        case ACTIONS.LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case ACTIONS.AUTHISREADY: 
            return {
                ...state,
                user: action.payload,
                authIsReady: true
            }
        default:
            return state
    }
}


export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(authReducer,{user:null,authIsReady:false})
    useEffect(()=>{
        const unsub = projectAuth.onAuthStateChanged((user)=>{
            dispatch({type:ACTIONS.AUTHISREADY,payload:user})
            unsub()
        })
    },[])

    console.log(state)
    return (
        <AuthContext.Provider
            value={{
            ...state,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )


}