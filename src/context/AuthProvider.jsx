import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ userRole: null }); // Initialize with an empty userRole

  const updateUserRole = (userRole) => {
    setAuth((prevAuth) => ({
      ...prevAuth,
      userRole: userRole,
    }));
  };

  // Include the updateUserRole function in the context
  const contextValue = { auth, updateUserRole };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;