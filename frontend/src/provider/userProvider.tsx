import { createContext, useState } from "react";

const UserContext = createContext<UserProvider | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<User | null>(null);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const displayChat = (followingUser: User) => {
    window.localStorage.setItem("chat_partner", JSON.stringify(followingUser));
    setPartner(followingUser);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        partner,
        displayChat,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
