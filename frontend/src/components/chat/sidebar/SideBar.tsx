import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "provider/userProvider";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBreakpoint from "responsive/useBreakpoint";
import useImageSize from "responsive/useImageSize";
import { UserProvider } from "types/props.type";
import { findFollowingUsers } from "utils/follow";

type SideBarProps = {
  width: string;
  color: string;
  title: string;
};

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const SideBar = (props: SideBarProps) => {
  const { width, color, title } = props;
  const { data: session } = useSession<boolean>();
  const [followingUsers, setFollowingUsers] = useState<User[] | []>([]);
  const { displayChat } = useContext<UserProvider>(UserContext);
  const imageSize = useImageSize(80, 80);
  const breakpoint = useBreakpoint();
  const mobileSize = ["xs", "sm"].includes(breakpoint);

  useEffect(() => {
    const getFollowingUser = async () => {
      try {
        const res = await findFollowingUsers({
          email: session?.user?.email || "",
        });
        if (res.error) {
          toast.error(res.error);
        } else {
          setFollowingUsers(res);
        }
      } catch (e) {
        toast.error("フォロー中のユーザーの取得に失敗しました。");
      }
    };
    getFollowingUser();
  }, []);

  return (
    <aside
      className={`${width} ${color} h-screen overflow-hidden absolute md:static`}
    >
      <div className="font-black text-center my-4 text-sm">{title}</div>
      <ul className="font-medium overflow-y-auto h-full flex-grow">
        {followingUsers.length >= 1 &&
          followingUsers.map((followingUser: User) => {
            return (
              <li
                key={followingUser?.id}
                className="h-20 flex rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 justify-center border-solid border-gray-400 border-2 cursor-pointer"
                onClick={() => displayChat && displayChat(followingUser)}
              >
                <div className="flex items-center p-2 text-gray-900 w-5/6 overflow-hidden">
                  <Image
                    src={followingUser?.image || DEFAULT_IMAGE_IMG}
                    alt=""
                    width={mobileSize ? 50 : imageSize.width}
                    height={mobileSize ? 50 : imageSize.height}
                    className="w-1/5 mx-auto rounded-full"
                  />
                  <h2 className="flex justify-center text-lg w-3/5 truncate mx-auto">
                    {followingUser?.name}
                  </h2>
                  {!["xs"].includes(breakpoint) && (
                    <p className="text-sm mx-auto truncate">
                      {followingUser.email}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
      <ToastContainer />
    </aside>
  );
};

export default SideBar;
