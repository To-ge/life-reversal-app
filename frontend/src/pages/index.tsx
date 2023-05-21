import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Logout from "components/Logout";
import Login from "components/Login";
import DeleteUser from "components/DeleteUser";
import TopBar from "components/topbar/TopBar";

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
      <div className="h-screen w-screen fixed">
        <TopBar />
        <div className="w-full h-full relative">
          <div className=" mx-auto w-1/4 left-1/4 h-full absolute -z-10">
            <img src="/green_4.jpg" alt="" className="h-full" />
          </div>
          <div className=" mx-auto w-1/4 left-1/2 h-full absolute -z-10">
            <img src="/green_5.jpg" alt="" className="h-full" />
          </div>
          <div className=" mx-auto w-1/4 h-full absolute -z-10">
            <img src="/green_3.jpg" alt="" className="h-full" />
          </div>
          <div className=" mx-auto w-1/4 left-3/4 h-full absolute -z-10">
            <img src="/green_2.jpg" alt="" className="h-full" />
          </div>
          <div className="top-1/4 right-10 z-10 absolute overflow-hidden">
            <Image
              src="/chat_1.jpg"
              width={300}
              height={300}
              alt=""
              className="rounded-full object-cover"
            />
          </div>
          <div className="top-1/4 left-10 z-10 absolute overflow-hidden ">
            <Image
              src="/step_1.jpg"
              width={400}
              height={400}
              alt=""
              className="rounded-full object-cover shadow-md shadow-gray-500"
            />
          </div>
          <div className="w-full h-1/4 flex justify-center z-30">
            <h1 className="font-bold text-8xl drop-shadow-[15px_15px_5px_rgba(79,153,153,1)] underline decoration-dashed decoration-8 decoration-teal-500 text-white my-auto">
              Life Reversal
            </h1>
          </div>
          <div className="h-1/2 w-full flex justify-center">
            <p className="text-4xl z-30 text-white my-auto drop-shadow-[0px_4px_2px_rgba(0,0,0,1)]">
              失敗を経験している人へ、これからの人生設計の手助けをします
            </p>
          </div>
          <div className="h-1/4 w-full flex justify-center items-start z-30">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
