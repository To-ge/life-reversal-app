import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Login = (): React.ReactElement | null => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status !== "authenticated") {
    return (
      <div>
        <button
          className="flex justify-center items-center bg-white shadow-lg shadow-slate-300 px-7 py-3 rounded-md space-x-5"
          onClick={() =>
            signIn("google", { prompt: "login", callbackUrl: "/" })
          }
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            height={30}
            width={30}
            alt=""
          />
          <div className="font-semibold text-lg">Googleでログイン</div>
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default Login;
