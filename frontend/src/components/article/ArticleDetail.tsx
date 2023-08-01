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
    <div className="w-full bg-gradient-to-b from-orange-300 to-red-300 flex justify-center">
      {!editing ? (
        <div className="w-1/3">
          <div className="bg-white rounded-2xl m-3 p-5 xl:m-10 xl:p-12 shadow-xl flex flex-col">
            <div className="h-1/3 flex flex-wrap lg:flex-row justify-around items-center mb-5 space-y-2">
              <Image
                src={user?.image || DEFAULT_IMAGE_IMG}
                className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover basis-full lg:basis-1/2"
                width={80}
                height={80}
                alt="Picture of the author"
              />
              <div className="basis-full lg:basis-1/2 text-center">
                <p className="text-lg text-teal-500 font-bold">
                  From : {user?.name}
                </p>
                <p className="text-md text-gray-500">{user?.email}</p>
              </div>
              <div className="flex basis-full justify-center">
                <button
                  className="bg-black text-white rounded-full px-5 py-2 hover:text-gray-400"
                  onClick={(e) => clickButton(e.currentTarget.innerText)}
                >
                  {user.email !== session?.user?.email ? "Follow" : "Edit"}
                </button>
                {user.email === session?.user?.email && (
                  <button
                    className="bg-red-500 text-white rounded-full px-3 py-2 ml-3 hover:text-gray-400"
                    onClick={deleteArticle}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="h-2/3">
              <p className="">{article?.text}</p>
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

      <ul className="w-2/3 flex flex-col items-center p-5 space-y-7 overflow-y-auto mb-20">
        {cardInfo &&
          cardInfo.map((card: Card) => (
            <li key={card.id} className="w-4/5 shadow-xl">
              <p className="w-20 text-lg ml-8 bg-white flex justify-center rounded-t-lg">
                {`No.${card.id}`}
              </p>
              <textarea
                value={card.text}
                onChange={(e) => handleChange(card.id, e.target.value, e)}
                className="p-7 text-xl w-full focus:outline-none rounded-lg"
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
