import { ButtonActions } from "./ButtonActions";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import api from "utils/axios";

type CardInfoType = {
  id: number;
  text: string;
};

type SelectBarProps = {
  setButtonAction: React.Dispatch<React.SetStateAction<string>>;
  commentPanel: boolean;
  setCommentPanel: React.Dispatch<React.SetStateAction<boolean>>;
  cardInfo: CardInfoType[];
};

const SelectBar = (props: SelectBarProps) => {
  const { setButtonAction, commentPanel, setCommentPanel, cardInfo } = props;
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession<Session>();

  const handleClick = (e) => {
    setButtonAction(e.target.innerText);
  };

  const publishArticle = async () => {
    try {
      const articleRes = await api.post("/articles", {
        user_id: session?.user?.id,
        text: comment,
      });
      console.log(articleRes);
      const cardsRes = await api.post("/cards", {
        article: {
          user_id: session?.user?.id,
          article_id: articleRes.data.id,
          content: cardInfo,
        },
      });
      console.log(cardsRes);
      router.push("/search");
    } catch (e) {
      console.log(e);
    }
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
            Publish
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
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBar;
