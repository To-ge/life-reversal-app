import Link from "next/link";
import PostedArticle from "./PostedArticle";
const ScrollArea = () => {
  return (
    <div className="w-3/5 h-full flex flex-col items-center">
      <Link
        href={{
          pathname: "/article/1",
          query: {
            user: {
              name: "newjeans",
              email: "newjeans@gmail.com",
            },
            text: "私は大学生の時に独学で勉強することで目標を達成しました。そして、新卒で希望の業界に行くことができたのでその時に取り組んだことをお伝えしたいと思います。ぜひ参考にしてみてください。",
            cards: [
              "haerin",
              "hanni",
              "mingi",
              "daniel",
              "heyin",
              "unchae",
              "chaewon",
              "yunjin",
            ],
          },
        }}
        className="flex justify-center"
      >
        <PostedArticle />
      </Link>
      <PostedArticle />
      <PostedArticle />
      <PostedArticle />
    </div>
  );
};

export default ScrollArea;
