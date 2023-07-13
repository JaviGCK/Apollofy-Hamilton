import { useAuth0 } from "@auth0/auth0-react"
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({...props}) => {

    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? props.children : <Navigate to = {'/login'}/>
    
}