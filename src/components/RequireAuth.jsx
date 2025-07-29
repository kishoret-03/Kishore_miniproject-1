import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isAuth = localStorage.getItem("auth");
  return isAuth ? children : <Navigate to="/" />;
}