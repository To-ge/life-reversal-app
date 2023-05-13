import Image from "next/image";

type ArticleDetailProps = {
  articleInfo: {
    user: {
      name: string;
      email: string;
    };
    text: string;
    cards: string[];
  };
};

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const ArticleDetail = (props: ArticleDetailProps) => {
  const { articleInfo } = props;

  return (
    <div className="w-full bg-gradient-to-b from-orange-300 to-red-300 flex justify-center">
      <div className="w-1/3">
        <div className="bg-white rounded-2xl m-20 p-12 shadow-xl flex flex-col">
          <div className="h-1/3 flex justify-around items-center mb-5">
            <Image
              src={DEFAULT_IMAGE_IMG}
              className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
              width={80}
              height={80}
              alt="Picture of the author"
            />
            <div>
              <p className="text-lg text-teal-500 font-bold">
                From : {articleInfo.user.name}
              </p>
              <p className="text-md text-gray-500">{articleInfo.user.email}</p>
            </div>
            <div>
              <button className="bg-black text-white rounded-full px-5 py-2 hover:text-gray-400">
                Follow
              </button>
            </div>
          </div>
          <div className="h-2/3">
            <p className="font-medium">
              私は大学生の時に独学で勉強することで目標を達成しました。そして、新卒で希望の業界に行くことができたのでその時に取り組んだことをお伝えしたいと思います。ぜひ参考にしてみてください。
            </p>
          </div>
        </div>
      </div>
      <ul className="w-2/3 flex flex-col items-center p-5 space-y-10 overflow-y-auto mb-20">
        {articleInfo.cards.map((card, index) => (
          <li key={index} className="w-4/5 shadow-xl">
            <p className="w-20 text-lg ml-8 bg-white flex justify-center rounded-t-lg">
              {`No.${index + 1}`}
            </p>
            <p className="p-7 text-2xl w-full rounded-lg bg-white">{card}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleDetail;
