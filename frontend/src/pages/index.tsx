import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Logout from "components/Logout";
import Login from "components/Login";

const inter = Inter({ subsets: ["latin"] });

const DEFAULT_IMAGE_IMG = "frontend/public/default-user.jpg";

export default function Home() {
  const { data: session, status } = useSession();
  const imageUrl = session?.user?.image || DEFAULT_IMAGE_IMG;
  return (
    <>
      <Head>
        <title>life-reversal</title>
      </Head>
      <div>
        <h1>Life Reversal</h1>
        {status === "authenticated" ? (
          <div>
            <p>セッション期限:{session.expires}</p>
            <p>ようこそ、{session.user?.name}さん</p>
            <img src={imageUrl} alt="" style={{ borderRadius: "50px" }} />
            <div>
              <Logout />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}
