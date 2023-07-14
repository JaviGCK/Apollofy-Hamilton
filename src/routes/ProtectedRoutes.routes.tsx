import { useAuth0 } from "@auth0/auth0-react"
import { Navigate } from "react-router-dom";
import {useEffect} from 'react'
export const ProtectedRoutes = ({...props}) => {

    const { isAuthenticated } = useAuth0();
    useEffect(() =>{
        console.log(isAuthenticated)
    },[isAuthenticated])
    
    return isAuthenticated ? props.children : <Navigate to = {'/login'}/>
    
}