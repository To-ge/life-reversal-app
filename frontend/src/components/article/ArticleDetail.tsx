import SelectBar from "components/post/select-bar/SelectBar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "utils/axios";
import { followUser } from "utils/follow";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const ArticleDetail = (props: { articleInfo: UserAndArticleAndCards }) => {
  const { articleInfo } = props;
  const { user, article, cards } = articleInfo;
  const [cardInfo, setCardInfo] = useState<Card[] | []>(
    JSON.parse(cards.content)
  );
  const { data: session, status } = useSession();
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, text: string, e: any) => {
    console.log(e.target);
    setCardInfo((prev) => {
      let updatedInfo: Card[] | [] = [...prev];
      updatedInfo[index - 1].text = text;
      return updatedInfo;
    });
  };

  const clickButton = async (text: string) => {
    if (text === "Edit") {
      setEditing(true);
    } else if (text === "Follow") {
      const response = await followUser({
        email: session?.user?.email || "",
        followed_id: user.id,
      });
      if (response?.message) {
        toast.success(`${response?.message}`);
      } else {
        toast.error(`${response?.error}`);
      }
    }
  };

  const deleteArticle = async () => {
    try {
      const res = await api.delete(`/articles/${article.id}`);
      if (res.data.message) {
        toast.success(res.data.message);
        router.push("/search");
      } else {
        toast.error(res.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-orange-300 to-red-300 flex flex-col sm:flex-row justify-center">
      {!editing ? (
        <div className="w-full sm:w-1/3">
          <div className="bg-white rounded-2xl m-3 p-5 xl:m-10 xl:p-8 shadow-xl flex flex-col">
            <div className="h-1/3 flex flex-col justify-around items-center mb-5 space-y-2">
              <div className="flex items-center justify-start w-full basis-full space-x-8">
                <Image
                  src={user?.image || DEFAULT_IMAGE_IMG}
                  className="rounded-full object-cover"
                  width={60}
                  height={60}
                  alt="Picture of the author"
                />
                <div className="flex flex-col space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-teal-500 font-bold">
                      From : {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="text-xs bg-black text-white rounded-full px-4 py-1 sm:px-5 sm:py-2 hover:text-gray-400"
                      onClick={(e) => clickButton(e.currentTarget.innerText)}
                    >
                      {user.email !== session?.user?.email ? "Follow" : "Edit"}
                    </button>
                    {user.email === session?.user?.email && (
                      <button
                        className="text-xs bg-red-500 text-white rounded-full px-2 py-1 sm:px-3 sm:py-2 ml-3 hover:text-gray-400"
                        onClick={deleteArticle}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-2/3 min-w-full">
                <p className="text-xs sm:text-sm">{article?.text}</p>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <SelectBar
          editing={editing}
          commentPanel={true}
          cardInfo={cardInfo}
          article={article}
          cardId={cards.id}
          setCommentPanel={setEditing}
        />
      )}

      <ul className="h-full w-full sm:w-2/3 flex flex-col items-center p-5 space-y-7 overflow-y-auto mb-24">
        {cardInfo &&
          cardInfo.map((card: Card) => (
            <li key={card.id} className="w-4/5 shadow-xl">
              <p className="w-16 text-xs sm:text-sm font-bold ml-8 bg-white flex justify-center rounded-t-lg">
                {`No.${card.id}`}
              </p>
              <textarea
                value={card.text}
                onChange={(e) => handleChange(card.id, e.target.value, e)}
                className="p-5 sm:p-7 text-xs sm:text-sm w-full focus:outline-none rounded-lg"
                placeholder="when, where, how"
                readOnly={user.email !== session?.user?.email && !editing}
                rows={1}
                wrap="soft"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ArticleDetail;
