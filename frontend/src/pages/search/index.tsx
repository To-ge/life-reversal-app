import ScrollArea from "components/sns/ScrollArea";
import TopBar from "components/topbar/TopBar";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async (ctx) => {
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
      articles,
      users,
    },
    revalidate: 60 * 60 * 24,
  };
};

const Page = ({
  articles,
  users,
}: InferGetStaticPropsType<UsersAndArticles>) => {
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
