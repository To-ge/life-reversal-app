import { ButtonActions } from "./ButtonActions";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import api from "utils/axios";
import { UserContext } from "provider/userProvider";

type CardInfoType = {
  id: number;
  text: string;
};

type SelectBar = {
  setButtonAction?: React.Dispatch<React.SetStateAction<string>>;
  commentPanel: boolean;
  setCommentPanel?: React.Dispatch<React.SetStateAction<boolean>>;
  cardInfo: Card[];
  editing?: boolean;
  article?: Article;
  cardId?: number;
};

const SelectBar = (props: SelectBar) => {
  const {
    setButtonAction,
    commentPanel,
    setCommentPanel,
    cardInfo,
    editing,
    article,
    cardId,
  } = props;
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession<Session>();

  useEffect(() => {
    article && setComment(article.text);
  }, []);

  const handleClick = (e) => {
    setButtonAction(e.target.innerText);
  };

  const publishArticle = async () => {
    try {
      console.log("作成前");
      if (editing) {
        const articleRes = await api.put(`/articles/${article?.id}`, {
          text: comment,
        });
        console.log(articleRes);
        const cardsRes = await api.put(`/cards/${cardId}`, {
          content: JSON.stringify(cardInfo),
        });
        console.log(JSON.parse(cardsRes.data.content));
      } else {
        const articleRes = await api.post("/articles", {
          email: session?.user?.email,
          text: comment,
        });
        console.log(articleRes);
        const cardsRes = await api.post("/cards", {
          article_id: articleRes.data.id,
          content: JSON.stringify(cardInfo),
        });
        console.log(JSON.parse(cardsRes.data.content));
      }
      router.push("/search");
    } catch (e) {
      console.log(e);
    }
  };

  const inputText = (e) => {
    // if (editing) {
    //   setArticleInfo((prev: Article) => {
    //     let updatedInfo: Article = prev;
    //     updatedInfo.text = e.target.value;
    //     return updatedInfo;
    //   });
    // } else {
    setComment(e.target.value);
    // }
  };

  return (
    <div className="w-1/3 flex flex-col bg-yellow-200">
      {!commentPanel ? (
        <div className="w-full h-20 flex justify-center items-center text-lg font-bold">
          <p>Select Elements</p>
        </div>
      ) : (
        <div className="w-full h-20 flex items-center justify-around text-lg font-bold">
          <div
            className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer hover:bg-gray-600 hover:text-gray-200"
            onClick={() => setCommentPanel(false)}
          >
            《 Return
          </div>
          <p>コメントを書いて投稿しよう</p>
          <div
            className="px-4 py-2 bg-orange-400 text-white rounded-md cursor-pointer hover:bg-red-600 hover:text-gray-200"
            onClick={publishArticle}
          >
            {editing ? "Update" : "Publish"}
          </div>
        </div>
      )}
      <div className="h-full">
        {!commentPanel ? (
          <ul className="h-full flex flex-wrap">
            {ButtonActions.map((action, index) => (
              <li
                key={index}
                className={`${
                  action.warn && "text-rose-500"
                } w-1/2 flex justify-center items-center border-dashed border-4 bg-yellow-500 cursor-pointer text-2xl`}
                onClick={(e) => handleClick(e)}
              >
                {action.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full h-full flex justify-center items-start mb-20">
            <div className="w-5/6 h-4/5 bg-white">
              <textarea
                className="min-h-full min-w-full text-lg p-5"
                placeholder="Keep comment!"
                onChange={(e) => inputText(e)}
                value={
                  // editing ? articleInfo?.text :
                  comment
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBar;
