import Image from "next/image";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import Login from "components/Login";
import TopBar from "components/topbar/TopBar";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import useImageSize from "responsive/useImageSize";

export default function Home() {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const imageSize = useImageSize(200, 200);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await signIn("credentials", {
        name,
        email,
        password,
      });
      console.log(res);
      toast.success("ログインしました");
    } catch (e) {
      toast.error("入力に誤りがありました");
      console.log(e);
    }
  };

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
          <div className="top-1/4 right-10 z-10 absolute overflow-hidden opacity-0 md:opacity-100">
            <Image
              src="/chat_1.jpg"
              width={imageSize.width}
              height={imageSize.height}
              alt=""
              className="rounded-full object-cover"
            />
          </div>
          <div className="top-1/4 left-10 z-10 absolute overflow-hidden opacity-0 md:opacity-100">
            <Image
              src="/step_1.jpg"
              width={imageSize.width}
              height={imageSize.height}
              alt=""
              className="rounded-full object-cover shadow-md shadow-gray-500"
            />
          </div>
          <div className="w-full h-1/5 flex justify-center z-30">
            <h1 className="font-bold text-4xl md:text-6xl drop-shadow-[15px_15px_5px_rgba(79,153,153,1)] underline decoration-dashed decoration-8 decoration-teal-500 text-white my-auto">
              Life Reversal
            </h1>
          </div>
          <div className="h-3/5 w-full flex justify-center">
            {status === "authenticated" ? (
              <p className="text3xl lg:text-2xl z-30 text-white my-auto drop-shadow-[0px_4px_2px_rgba(0,0,0,1)]">
                失敗を経験している人へ、これからの人生設計の手助けをします
              </p>
            ) : (
              <div className="bg-white p-4 rounded-md w-5/6 md:w-1/2 mb-5 z-50 ">
                <div className="flex items-center justify-center">
                  <h1 className="text-md font-bold">ログインフォーム</h1>
                </div>
                <form
                  className="flex flex-col justify-around h-full pb-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name">名前:</label>
                    <input
                      className="px-3 py-2 border border-slate-300 border-solid border-2 text-sm outline-none"
                      {...register("name", { required: true })}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span>名前を入力してください。</span>}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email">メールアドレス:</label>
                    <input
                      className="px-3 py-2 border border-slate-300 border-solid border-2 text-sm outline-none"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <span>有効なメールアドレスを入力してください。</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">パスワード:</label>
                    <input
                      className="px-3 py-2 border border-slate-300 border-solid border-2 text-sm outline-none"
                      {...register("password", {
                        required: true,
                      })}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <span>パスワードを入力してください。</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-teal-500 rounded-sm mt-2"
                  >
                    ログイン
                  </button>
                </form>
                <ToastContainer />
              </div>
            )}
          </div>
          <div className="h-1/4 w-full flex justify-center items-start z-30">
            {status === "unauthenticated" && <Login />}
          </div>
        </div>
      </div>
    </>
  );
}
