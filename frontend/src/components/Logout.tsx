import { signOut, useSession } from "next-auth/react";

const Logout = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    );
  }
  return null;
};

export default Logout;
