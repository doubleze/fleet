import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { auth, updateUserRole } = useContext(AuthContext);
  return { auth, updateUserRole };
};

export default useAuth;
