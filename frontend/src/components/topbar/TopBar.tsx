import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Logout from "components/Logout";
import Login from "components/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const TopBar = () => {
  const { data: session } = useSession<Session | null>();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !session?.user) {
      router.push("/");
    }
  }, []);

  const imageUrl = session?.user?.image || DEFAULT_IMAGE_IMG;
  return (
    <div className="bg-teal-600 flex items-center z-50 h-28">
      <div className="text-2xl font-bold w-1/5 flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-500 cursor-pointer h-full">
        <Link href="/">Life Reversal</Link>
      </div>
      <ul className="flex w-2/5 justify-center items-center space-x-10 font-bold text-xl cursor-pointer">
        <Link href="/search">
          <li className="hover:bg-teal-700 px-3 py-2 rounded-md">Search</li>
        </Link>
        <Link href="/post">
          <li className="hover:bg-teal-700 px-3 py-2 rounded-md">Post</li>
        </Link>
        <Link href="/room">
          <li className="hover:bg-teal-700 px-3 py-2 rounded-md">Chat</li>
        </Link>
      </ul>
      {session ? (
        <>
          <div className="py-8 px-12 mx-auto bg-white rounded-xl shadow-lg sm:py-4 flex w-1/6 overflow-hidden">
            <Link href={"/profile"}>
              <Image
                src={imageUrl}
                className="block mx-auto rounded-full sm:mx-0 sm:shrink-0"
                width={50}
                height={50}
                alt="Picture of the author"
              />
            </Link>
            <div className="px-3">
              <div className="text-yellow-600 font-bold">
                {session?.user?.name}
              </div>
              <div className="text-gray-500">{session?.user?.email}</div>
            </div>
          </div>
          <Logout />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default TopBar;
