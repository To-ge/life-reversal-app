import Room from "components/chat/room/Room";
import SideBar from "components/chat/sidebar/SideBar";
import TopBar from "components/topbar/TopBar";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

// const { data: session } = useSession<Session | null>();

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/find_following_users`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: session?.user?.email,
//       }),
//     }
//   );
//   console.log(res);
//   const followingUsersData = await res.json();
//   const followingUsers = followingUsersData || [];

//   return {
//     props: {
//       followingUsers,
//     },
//     revalidate: 60 * 60 * 24,
//   };
// };

const Chat = () =>
  // { followingUsers }: InferGetStaticPropsType<User[]>
  {
    return (
      <div className="w-screen h-screen fixed">
        <TopBar />
        <div className="flex w-full">
          <SideBar width="w-1/4" color="bg-gray-300" title="チャット相手" />
          <div className="w-3/4">
            <Room color="bg-gray-600" title="チャットルーム" />
          </div>
        </div>
      </div>
    );
  };

export default Chat;
