import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [is_logueado, setIsLogueado] = useState(false);
  const [user, setUser] = useState(null);

  const loginCliente = (email) => {
    const nuevoUser = { email, role: 'cliente' };
    setUser(nuevoUser);
    setIsLogueado(true);
  };

  const loginAdmin = (email) => {
    const nuevoUser = { email, role: 'admin' };
    setUser(nuevoUser);
    setIsLogueado(true);
  };

  const registerCliente = ({ nombre, email, password }) => {
    const nuevoUser = {
      nombre,
      email,
      role: 'cliente',
    };

    setUser(nuevoUser);
    setIsLogueado(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogueado(false);
  };

  return (
    <AuthContext.Provider
      value={{
        is_logueado,
        user,
        isAdmin: user?.role === 'admin',
        isCliente: user?.role === 'cliente',
        loginCliente,
        loginAdmin,
        registerCliente,  
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
