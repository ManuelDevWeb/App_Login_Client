import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

const Authorizer = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};

const ProtectRoute = ({ children }) => {
  const { username } = useAuthStore((state) => state.auth);

  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};

export { Authorizer, ProtectRoute };
