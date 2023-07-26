import Image from "next/image";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const PostedArticle = (props: UserAndArticle) => {
  const { article, user } = props;

  return (
    <div className="w-5/6 min-h-1/6 min-w-full bg-white px-10 py-5 border-solid border-gray-300 border-2 hover:bg-gray-200 cursor-pointer flex space-x-5">
      <div className="basis-1/6">
        <Image
          src={user?.image || DEFAULT_IMAGE_IMG}
          className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
          width={80}
          height={80}
          alt="Picture of the author"
        />
      </div>
      <div className="basis-5/6">
        <p>
          {new Date(article?.updated_at).toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
            dateStyle: "short",
          })}
        </p>
        <p className="text-lg text-teal-500 mb-3">By_{user?.name}</p>
        <p>{article.text}</p>
      </div>
    </div>
  );
};

export default PostedArticle;
