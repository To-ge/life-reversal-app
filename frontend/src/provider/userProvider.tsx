import { createContext, useState } from "react";
import { UserProvider } from "types/props.type";

const UserContext = createContext<UserProvider | {}>({});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<User | undefined>(undefined);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const displayChat = (followingUser: User | undefined) => {
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
