import { Navigate } from "react-router-dom";

export default function TechnicianRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (role !== "TECHNICIAN") return <Navigate to="/unauthorized" />;

  return children;
}
