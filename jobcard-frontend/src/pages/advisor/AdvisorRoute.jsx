import { Navigate } from "react-router-dom";


export default function AdvisorRoute({children}){
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")

    if (!token) return <Navigate to = "/"/>
    if (role !== "ADVISOR") return <Navigate to = "/unauthorized"/>
    
    return children;

}