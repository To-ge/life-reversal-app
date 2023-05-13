import Image from "next/image";

const DEFAULT_IMAGE_IMG = "/default-user.jpg";

const PostedArticle = () => {
  return (
    <div className="w-5/6 min-h-1/6 bg-white px-10 py-5 border-solid border-gray-300 border-2 hover:bg-gray-200 cursor-pointer flex space-x-5">
      <div>
        <Image
          src={DEFAULT_IMAGE_IMG}
          className="block mx-auto rounded-full sm:mx-0 sm:shrink-0 object-cover"
          width={80}
          height={80}
          alt="Picture of the author"
        />
      </div>
      <div className="">
        <p className="text-2xl text-teal-500 mb-3">From : user</p>
        <p>
          私は大学生の時に独学で勉強することで目標を達成しました。そして、新卒で希望の業界に行くことができたのでその時に取り組んだことをお伝えしたいと思います。ぜひ参考にしてみてください。
        </p>
      </div>
    </div>
  );
};

export default PostedArticle;
