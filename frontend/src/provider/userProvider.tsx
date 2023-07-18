import { createContext, useState } from "react";

const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
