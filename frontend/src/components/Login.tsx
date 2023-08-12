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
          className="flex justify-center items-center bg-white shadow-lg shadow-slate-300 px-4 py-2 rounded-md space-x-5"
          onClick={() =>
            signIn("google", { prompt: "login", callbackUrl: "/" })
          }
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            height={20}
            width={20}
            alt=""
          />
          <div className="font-semibold text-sm">Googleでログイン</div>
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default Login;
