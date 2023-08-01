import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logout from "components/Logout";
import Login from "components/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useBreakpoint from "responsive/useBreakpoint";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const TopBar = () => {
  const { data: session } = useSession<boolean>();
  const router = useRouter();
  const breakpoint: string = useBreakpoint();

  useEffect(() => {
    if (typeof window !== "undefined" && !session?.user) {
      router.push("/");
    }
  }, []);

  const imageUrl = session?.user?.image || DEFAULT_IMAGE_IMG;
  return (
    <div className="bg-teal-600 flex items-center z-50 h-20">
      <div className="text-xl font-bold w-1/5 flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-500 cursor-pointer h-full px-2">
        <Link href="/">Life Reversal</Link>
      </div>
      <ul className="flex w-2/5 justify-center items-center space-x-2 md:space-x-10  font-bold text-md cursor-pointer">
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
          <div className="py-3 px-8 mx-auto xl:bg-white rounded-xl xl:shadow-lg flex overflow-hidden">
            <Link href={"/profile"}>
              <Image
                src={imageUrl}
                className="block mx-auto rounded-full cursor-pointer"
                width={45}
                height={45}
                alt="Picture of the author"
              />
            </Link>
            {!["sm", "md", "lg"].includes(breakpoint) && (
              <div className="px-3">
                <div className="text-yellow-600 font-bold">
                  {session?.user?.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {session?.user?.email}
                </div>
              </div>
            )}
          </div>
          <Logout />
        </>
      ) : (
        !(breakpoint === "sm") && <Login />
      )}
    </div>
  );
};

export default TopBar;
