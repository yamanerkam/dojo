import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { timestamp } from "../firebase/config";
export const useAuthContext =()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw Error('error')
    }

    return context
}