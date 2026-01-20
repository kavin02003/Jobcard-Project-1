import { Navigate } from "react-router-dom"


export default function({children}){
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token) return <Navigate to = "/"/>
  if (role !== "MANAGER") return <Navigate to = "/unauthorized"/>

  return children;
}