import ArticleDetail from "components/article/ArticleDetail";
import TopBar from "components/topbar/TopBar";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles`
  );
  const articles: Article[] = await articlesRes.json();
  const paths = articles.map((article) => ({
    params: { article_id: String(article.id) },
  }));

  return {
    paths,
    fallback: false,
  };
};
