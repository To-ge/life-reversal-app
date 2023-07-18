import Link from "next/link";
import PostedArticle from "./PostedArticle";
import { useEffect, useState } from "react";
import api from "utils/axios";
const ScrollArea = () => {
  const [articles, setArticles] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getArticles = async () => {
      const response = await api.get("/articles");
      setArticles(response.data);
      console.log(response.data);
    };
    getArticles();
    const getUsers = async () => {
      const response = await api.get("/users");
      setUsers(response.data);
      console.log(response.data);
    };
    getUsers();
  }, []);

  const getPropsString = (props: UserAndArticle) => JSON.stringify(props);

  return (
    <div className="w-3/5 h-full flex flex-col items-center overflow-y-auto pb-80">
      {articles &&
        articles.map((article: Article) => (
          <Link
            key={article.id}
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
  );
};

export default ScrollArea;
