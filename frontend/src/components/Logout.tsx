import { signOut, useSession } from "next-auth/react";
import { UserContext } from "provider/userProvider";
import { useContext } from "react";
import { UserProvider } from "types/props.type";
import api from "utils/axios";

const Logout = () => {
  const { data: session, status } = useSession();
  const { currentUser, logout } = useContext<UserProvider>(UserContext);

  const handleLogout = async () => {
    if (currentUser) {
      logout && logout();
    } else {
      signOut();
      localStorage.removeItem("chat_partner");
      await api.delete("/auth/logout");
    }
  };

  if (status === "authenticated" || currentUser) {
    return (
      <button
        className="text-xs sm:text-sm px-1 py-1 sm:text-base sm:px-4 sm:py-2 font-bold text-gray-600 hover:bg-gray-600 hover:text-white mx-auto rounded-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }
  return null;
};

export default Logout;
