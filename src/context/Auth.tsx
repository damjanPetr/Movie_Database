import { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
type IAuthContext = null | valueProp;

const AuthContext = createContext<IAuthContext>(null);

interface valueProp {
  id: number;
  username: string;
  email: string;
}

export const AuthProvider = () => {
  const user: valueProp = {
    id: 1,
    username: "test",
    email: "random@gmail.com",
  };

  return (
    <AuthContext.Provider value={user}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
