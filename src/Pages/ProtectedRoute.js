import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


function ProtectedRoute({children}){
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()
    useEffect(function(){
        if(!isAuthenticated) navigate("/")
    },[isAuthenticated])
    return isAuthenticated ? children : null
}

export default ProtectedRoute;