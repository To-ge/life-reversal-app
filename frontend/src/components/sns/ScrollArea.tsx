import Link from "next/link";
import PostedArticle from "./PostedArticle";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useBreakpoint from "responsive/useBreakpoint";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const ScrollArea = ({ articles, users }: UsersAndArticles) => {
  const [panel, setPanel] = useState(false);
  const [panelUser, setPanelUser] = useState<User | undefined>(undefined);
  const [filterdArticles, setFilteredArticles] = useState<Article[] | []>(
    articles
  );
  const [postVol, setPostVol] = useState<number>(0);
  const { data: session } = useSession<boolean>();
  const breakpoint = useBreakpoint();

  const userInfo: User | undefined = users.find(
    (user) => user.email === session?.user?.email
  );

  const filterArticle = (action: string) => {
    if (action === "My Articles") {
      setFilteredArticles(
        articles.filter((article) => article.user_id === userInfo?.id)
      );
    } else {
      setFilteredArticles(articles);
    }
  };

  const displayInfo = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const hoverUserId = Number(e.currentTarget.id);
      if (users.length >= 1) {
        setPanelUser(users.find((user: User) => user.id === hoverUserId));
      }
      setPostVol(
        articles?.filter((article: Article) => article.user_id === hoverUserId)
          .length
      );
      setPanel(true);
    },
    [users]
  );

  return (
    <div className="flex flex-col md:flex-row w-screen">
      <div className="md:w-1/4 md:p-5 md:h-screen">
        <div className="flex justify-center md:flex-col lg:flex-row text-sm">
          <div
            onClick={(e) => filterArticle(e.currentTarget.innerText)}
            className="basis-1/2 text-center bg-gray-300 p-5 cursor-pointer font-bold hover:bg-teal-400"
          >
            My Articles
          </div>
          <div
            onClick={(e) => filterArticle(e.currentTarget.innerText)}
            className="basis-1/2 text-center bg-gray-300 p-5 cursor-pointer font-bold hover:bg-teal-400"
          >
            All Articles
          </div>
        </div>
        {!["xs", "sm"].includes(breakpoint) && (
          <div className="h-2/3 flex items-center justify-center">
            {panel && (
              <div className="w-4/5 bg-white rounded-md p-5 space-y-5 shadow-lg shadow-black">
                <Image
                  src={panelUser?.image || DEFAULT_IMAGE_IMG}
                  className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
                  width={70}
                  height={70}
                  alt="Picture of the author"
                />
                <p className="text-sm">
                  登録日:
                  {panelUser &&
                    new Date(panelUser?.created_at).toLocaleString("ja-JP", {
                      timeZone: "Asia/Tokyo",
                      dateStyle: "short",
                    })}
                </p>
                <p className="text-md text-orange-400 mb-3">
                  名前: {panelUser?.name}
                </p>
                <p className="text-md">投稿数: {postVol}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full md:w-3/5 h-full flex flex-col items-center overflow-y-auto pb-60">
        {filterdArticles &&
          Array.isArray(filterdArticles) &&
          filterdArticles.map((article: Article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="flex justify-center w-full"
            >
              <div
                id={String(article.user_id)}
                onMouseEnter={(e) => displayInfo(e)}
                onMouseLeave={() => setPanel(false)}
                className="w-full"
              >
                <PostedArticle
                  article={article}
                  user={
                    users &&
                    users?.find((user: User) => user.id === article.user_id)
                  }
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ScrollArea;
