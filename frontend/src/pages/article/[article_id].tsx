import ArticleDetail from "components/article/ArticleDetail";
import TopBar from "components/topbar/TopBar";
import { useRouter } from "next/router";

const Article = () => {
  const router = useRouter();
  const articleInfo = router.query;
  console.log(router.query);

  return (
    <div className="h-screen w-screen fixed">
      <TopBar />
      <div className="h-full flex">
        <ArticleDetail articleInfo={articleInfo} />
      </div>
    </div>
  );
};

export default Article;
