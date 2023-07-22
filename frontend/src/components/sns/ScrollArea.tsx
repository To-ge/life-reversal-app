import Link from "next/link";
import PostedArticle from "./PostedArticle";
import { useCallback, useEffect, useState } from "react";
import api from "utils/axios";
import Image from "next/image";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const ScrollArea = () => {
  const [articles, setArticles] = useState();
  const [users, setUsers] = useState([]);
  const [panel, setPanel] = useState(false);
  const [panelUser, setPanelUser] = useState<User | null>(null);
  const [postVol, setPostVol] = useState<number>(0);

  useEffect(() => {
    const getArticlesAndUsers = async () => {
      try {
        const articleResponse = await api.get("/articles");
        setArticles(articleResponse.data);
        const userResponse = await api.get("/users");
        setUsers(userResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    getArticlesAndUsers();
  }, []);

  const getPropsString = (props: UserAndArticle) => JSON.stringify(props);

  const displayInfo = useCallback(
    (e) => {
      const hoverUserId = Number(e.currentTarget.id);
      if (users.length >= 1) {
        setPanelUser(users.find((user: User) => user.id === hoverUserId));
      }
      setPostVol(
        articles?.filter((article: Article) => article.user_id === hoverUserId)
          .length
      );
      console.log(panelUser);
      setPanel(true);
    },
    [users]
  );

  return (
    <div className="flex">
      <div className="w-1/4 p-5 h-screen">
        <div className="flex justify-center">
          <p className="bg-gray-300 p-5 cursor-pointer font-bold hover:bg-teal-400">
            My Articles
          </p>
          <p className="bg-gray-300 p-5 cursor-pointer font-bold hover:bg-teal-400">
            All Articles
          </p>
          <p className="bg-gray-300 p-5 cursor-pointer font-bold hover:bg-teal-400">
            Following
          </p>
        </div>
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
              <p>
                登録日:
                {new Date(panelUser?.created_at).toLocaleString("ja-JP", {
                  timeZone: "Asia/Tokyo",
                  dateStyle: "short",
                })}
              </p>
              <p className="text-xl text-orange-400 mb-3">
                名前: {panelUser?.name}
              </p>
              <p className="text-lg">投稿数: {postVol}</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-3/5 h-full flex flex-col items-center overflow-y-auto pb-80">
        {articles &&
          articles.map((article: Article) => (
            <Link
              key={article.id}
              id={article.user_id}
              onMouseEnter={(e) => displayInfo(e)}
              onMouseLeave={() => setPanel(false)}
              href={{
                pathname: `/article/${article.id}`,
                query: {
                  props: getPropsString({
                    user: users?.find(
                      (user: User) => user.id === article.user_id
                    ),
                    article,
                  }),
                },
              }}
              className="flex justify-center w-full"
            >
              <PostedArticle
                article={article}
                user={users?.find((user: User) => user.id === article.user_id)}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ScrollArea;
