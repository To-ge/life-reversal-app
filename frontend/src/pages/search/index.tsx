import ScrollArea from "components/sns/ScrollArea";
import TopBar from "components/topbar/TopBar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articleResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles`
  );
  const articlesData = await articleResponse.json();
  const articles = articlesData || [];
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`
  );
  const usersData = await userResponse.json();
  const users = usersData || [];

  return {
    props: {
      data: {
        articles,
        users,
      },
    },
  };
};

const Page = ({ data }: InferGetServerSidePropsType<UsersAndArticles>) => {
  const { articles, users } = data;
  return (
    <div className="h-screen w-screen fixed">
      <TopBar />
      <div className="h-full flex justify-center bg-gradient-radial from-gray-600 via-white to-gray-500">
        <ScrollArea articles={articles} users={users} />
      </div>
    </div>
  );
};

export default Page;
