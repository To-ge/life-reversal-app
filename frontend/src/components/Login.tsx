import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status !== "authenticated") {
    return (
      <div>
        <p>ログインしていません</p>
        <button onClick={() => signIn("google", { prompt: "login" })}>
          Googleでログイン
        </button>
      </div>
    );
  }
  return null;
};

export default Login;
