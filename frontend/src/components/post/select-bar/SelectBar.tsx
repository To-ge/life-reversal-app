import { ButtonActions } from "./ButtonActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import api from "utils/axios";
import useBreakpoint from "responsive/useBreakpoint";

type SelectBar = {
  setButtonAction?: React.Dispatch<React.SetStateAction<string>>;
  commentPanel: boolean;
  setCommentPanel: React.Dispatch<React.SetStateAction<boolean>>;
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
  const { data: session } = useSession<boolean>();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    article && setComment(article.text);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setButtonAction && setButtonAction(e.currentTarget.innerText);
  };

  const publishArticle = async () => {
    if (comment === "") return;
    try {
      if (editing) {
        const articleRes = await api.put(`/articles/${article?.id}`, {
          text: comment,
        });
        console.log(articleRes);
        const cardsRes = await api.put(`/cards/${cardId}`, {
          content: JSON.stringify(cardInfo),
        });
      } else {
        const articleRes = await api.post("/articles", {
          email: session?.user?.email,
          text: comment,
        });
        const cardsRes = await api.post("/cards", {
          article_id: articleRes.data.id,
          content: JSON.stringify(cardInfo),
        });
      }
      router.push("/search");
    } catch (e) {
      console.log(e);
    }
  };

  const inputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div
      className={`${
        ["xs", "sm"].includes(breakpoint) && editing ? "w-full" : "w-1/3"
      } flex flex-col bg-yellow-200`}
    >
      {!commentPanel ? (
        <div className="w-full h-20 flex justify-center items-center text-sm sm:text-lg font-bold">
          <p>Select Elements</p>
        </div>
      ) : (
        <div className="w-full h-20 flex items-center justify-around text-lg font-bold">
          <div
            className="p-2 sm:px-4 sm:py-2 bg-gray-400 text-white rounded-md cursor-pointer hover:bg-gray-600 hover:text-gray-200 text-xs sm:text-sm"
            onClick={() => setCommentPanel(false)}
          >
            {!["xs", "sm"].includes(breakpoint) ? "《 Return" : "《"}
          </div>
          {((["xs", "sm"].includes(breakpoint) && editing) ||
            ["xl"].includes(breakpoint)) && (
            <p className="text-xs">コメントを書いて投稿しよう</p>
          )}
          <div
            className="px-4 py-2 bg-orange-400 text-white rounded-md cursor-pointer hover:bg-red-600 hover:text-gray-200 text-xs sm:text-sm"
            onClick={publishArticle}
          >
            {editing ? "Update" : "Publish"}
          </div>
        </div>
      )}
      <div className="h-full">
        {!commentPanel ? (
          <ul className="h-full flex flex-col md:flex-wrap pb-20">
            {ButtonActions.map((action, index) => (
              <li
                key={index}
                className={`${
                  action.warn && "text-rose-500"
                } basis-full md:basis-1/2 flex justify-center items-center border-dashed border-4 bg-yellow-500 cursor-pointer text-lg sm:text-2xl`}
                onClick={(e) => handleClick(e)}
              >
                {action.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full h-full flex justify-center items-start mb-20">
            <div className="w-full md:w-5/6 h-4/5 bg-white mx-auto">
              <textarea
                className="min-h-full w-full text-xs sm:text-sm p-2 md:p-5"
                placeholder="コメント欄（必須）"
                onChange={(e) => inputText(e)}
                value={comment}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBar;
