import TopBar from "components/topbar/TopBar";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
  const [followers, setFollowers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const getFollowersAndFollowingUser = async () => {
      try {
        const followerRes = await findFollowers({
          email: session?.user?.email,
        });
        setFollowers(followerRes);
        console.log(followerRes);
        const followingUserRes = await findFollowingUsers({
          email: session?.user?.email,
        });
        setFollowingUsers(followingUserRes);
        console.log(followingUserRes);
      } catch (e) {
        console.log(e);
      }
    };
    getFollowersAndFollowingUser();
  }, []);

  const deleteFollow = async (followingUser: User) => {
    try {
      const res = await deleteFollowingUser({
        email: session?.user?.email,
        followed_id: followingUser.id,
      });
      if (res.message) {
        setFollowingUsers(
          followingUsers.filter((user) => user.id === followingUser.id)
        );
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-yellow-100">
      <TopBar />
      <div className=" h-full w-full">
        <div className="bg-white rounded-2xl m-20 p-12 shadow-xl flex flex-col">
          <div className="h-1/3 flex justify-around items-center mb-5 p-5">
            <div></div>
            <Image
              src={session?.user?.image || DEFAULT_IMAGE_IMG}
              className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
              width={120}
              height={120}
              alt="Picture of the author"
            />
            <div>
              <p className="text-2xl text-teal-500 font-bold">
                Name : {session?.user?.name}
              </p>
              <p className="text-lg text-gray-500">
                Email : {session?.user?.email}
              </p>
            </div>
            <div></div>
          </div>
          <hr className="border-2" />
          <div>
            <h2 className="flex justify-center items-center text-2xl py-3 font-bold">
              {followingUsers.length >= 1
                ? "フォロー中"
                : "誰もフォローしていません"}
            </h2>
            <ul className="flex flex-col w-5/6 m-auto space-y-3 overflow-y-auto mb-20">
              {followingUsers.length >= 1 &&
                followingUsers?.map((followingUser: User) => (
                  <li key={followingUser?.id} className="py-3 border-t-2">
                    <div className="h-1/3 flex justify-around items-center">
                      <div></div>
                      <Image
                        src={followingUser?.image || DEFAULT_IMAGE_IMG}
                        className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
                        width={60}
                        height={60}
                        alt="Picture of the author"
                      />
                      <div>
                        <p className="text-2xl text-teal-500 font-bold">
                          Name : {followingUser?.name}
                        </p>
                        <p className="text-lg text-gray-500">
                          Email : {followingUser?.email}
                        </p>
                      </div>
                      <div>
                        <button className="bg-blue-300 rounded-lg px-4 py-3 mr-5">
                          ルームへ
                        </button>
                        <button
                          className="bg-red-300 rounded-lg px-6 py-3"
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
