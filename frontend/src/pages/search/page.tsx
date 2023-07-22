import ScrollArea from "components/sns/ScrollArea";
import TopBar from "components/topbar/TopBar";

// const getData = async () => {
//   const articleResponse = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/articles`,
//     { cache: "force-cache" }
//   );
//   const articleData = await articleResponse.json();
//   console.log(articleResponse);
//   const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//     cache: "force-cache",
//   });
//   const userData = await userResponse.json();

//   return {
//     props: {
//       articles: articleData,
//       users: userData,
//     } as { articles: Article[]; users: User[] },
//   };
// };

const Page = async () => {
  return (
    <div className="h-screen w-screen fixed">
      <TopBar />
      <div className="h-full flex justify-center bg-gradient-radial from-gray-600 via-white to-gray-500">
        <ScrollArea />
      </div>
    </div>
  );
};

export default Page;
