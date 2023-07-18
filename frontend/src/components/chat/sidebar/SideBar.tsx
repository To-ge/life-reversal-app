import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findFollowingUsers } from "utils/follow";

type SideBarProps = {
  width: string;
  color: string;
  title: string;
};

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const SideBar = (props: SideBarProps) => {
  const { width, color, title } = props;
  const { data: session } = useSession<Session | null>();
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const getFollowingUser = async () => {
      const res = await findFollowingUsers({ email: session?.user?.email });
      if (res.error) {
        toast.error(res.error);
      } else {
        setFollowingUsers(res);
      }
    };
    getFollowingUser();
  }, []);

  const displayChat = (followingUser: User) => {
    localStorage.setItem("chat_partner", JSON.stringify(followingUser));
  };

  return (
    <aside className={`${width} ${color} h-screen overflow-hidden`}>
      <div className="font-black text-center my-5 text-lg">{title}</div>
      <ul className="font-medium overflow-y-auto h-full flex-grow">
        {followingUsers.length >= 1 &&
          followingUsers.map((followingUser) => {
            return (
              <li
                key={followingUser?.id}
                className="h-20 flex rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 justify-center border-solid border-gray-400 border-2 cursor-pointer"
                onClick={() => displayChat(followingUser)}
              >
                <div className="flex items-center p-2 text-gray-900  w-4/5 overflow-hidden">
                  <Image
                    src={followingUser?.image || DEFAULT_IMAGE_IMG}
                    alt=""
                    width={40}
                    height={40}
                    className="mr-3 rounded-md"
                  />
                  <h2 className="text-xl w-3/5 truncate mx-2">
                    {followingUser?.name}
                  </h2>
                  <p className="text-sm truncate">
                    hello, world! have a good day!
                  </p>
                </div>
              </li>
            );
          })}
        {/* <li className="flex rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 justify-center">
          <Link
            href={"#"}
            className="flex items-center p-2 text-gray-900  w-4/5 overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt=""
              width={30}
              height={30}
              className="mr-3"
            />
            <h2 className="text-lg">aespa</h2>
          </Link>
        </li>
        <li className="flex rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 justify-center">
          <Link
            href={"#"}
            className="flex items-center p-2 text-gray-900  w-4/5 overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt=""
              width={30}
              height={30}
              className="mr-3"
            />
            <h2 className="text-lg">Le Serafim</h2>
          </Link>
        </li> */}
      </ul>
      <ToastContainer />
    </aside>
  );
};

export default SideBar;
