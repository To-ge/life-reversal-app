import TopBar from "components/topbar/TopBar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "provider/userProvider";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteFollowingUser,
  findFollowers,
  findFollowingUsers,
} from "utils/follow";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const Profile = () => {
  const { data: session } = useSession();
  const [followers, setFollowers] = useState<User[] | []>([]);
  const [followingUsers, setFollowingUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const getFollowersAndFollowingUser = async () => {
      try {
        const followerRes = await findFollowers({
          email: session?.user?.email || "",
        });
        setFollowers(followerRes);
        const followingUserRes = await findFollowingUsers({
          email: session?.user?.email || "",
        });
        setFollowingUsers(followingUserRes);
      } catch (e) {
        console.log(e);
      }
    };
    getFollowersAndFollowingUser();
  }, []);

  const deleteFollow = async (followingUser: User) => {
    try {
      const res = await deleteFollowingUser({
        email: session?.user?.email || "",
        followed_id: followingUser.id,
      });
      if (res.message) {
        setFollowingUsers(followingUsers.filter((user) => user.id !== res.id));
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen h-screen fixed bg-yellow-100">
      <TopBar />
      <div className="h-full w-full">
        <div className="bg-white h-3/4 w-5/6 rounded-2xl my-10 mx-auto p-3 sm:p-12 shadow-xl flex flex-col">
          <div className="h-1/5 flex justify-around items-center sm:mb-5 sm:p-5">
            <div></div>
            <Image
              src={session?.user?.image || DEFAULT_IMAGE_IMG}
              className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
              width={50}
              height={50}
              alt="Picture of the author"
            />
            <div>
              <p className="text-sm sm:text-md text-blue-400 font-bold">
                Name : {session?.user?.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Email : {session?.user?.email}
              </p>
            </div>
            <div></div>
          </div>
          <hr className="border-2" />
          <div className="overflow-hidden h-3/4 w-full">
            <h2 className="flex justify-center items-center text-sm py-2 font-bold">
              {followingUsers.length >= 1
                ? "フォロー中"
                : "誰もフォローしていません"}
            </h2>
            <ul className="flex flex-col h-5/6 w-5/6 mx-auto space-y-2 overflow-y-auto mb-12">
              {followingUsers.length >= 1 &&
                followingUsers?.map((followingUser: User) => (
                  <li key={followingUser?.id} className="py-3 border-t-2">
                    <div className="flex justify-around items-center">
                      <div></div>
                      <Image
                        src={followingUser?.image || DEFAULT_IMAGE_IMG}
                        className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
                        width={40}
                        height={40}
                        alt="Picture of the author"
                      />
                      <div className="w-1/2">
                        <p className="text-xs sm:text-md text-teal-500 font-bold truncate">
                          Name : {followingUser?.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">
                          Email : {followingUser?.email}
                        </p>
                      </div>
                      <div>
                        <button
                          className="bg-red-300 rounded-lg px-2 sm:px-4 py-1 sm:py-2 text-xs"
                          onClick={() => deleteFollow(followingUser)}
                        >
                          解除
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
