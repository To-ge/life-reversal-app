import ArticleDetail from "components/article/ArticleDetail";
import TopBar from "components/topbar/TopBar";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const articleId = params?.article_id;
  const userArticleCardsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/article_detail/${articleId}`
  );
  const userArticleCards = await userArticleCardsRes.json();

  return {
    props: {
      data: userArticleCards,
    },
  };
};

const Article = ({ data }: { data: UserAndArticleAndCards }) => {
  return (
    <div className="h-screen w-screen fixed">
      <TopBar />
      <div className="h-full flex">
        <ArticleDetail articleInfo={data} />
      </div>
    </div>
  );
};

export default Article;
