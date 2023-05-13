import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type SideBarProps = {
  width: string;
  color: string;
  title: string;
};

const DEFAULT_IMAGE_IMG = "/frontend/public/default-user.jpg";

const SideBar = (props: SideBarProps) => {
  const { width, color, title } = props;
  const { data: session } = useSession<Session | null>();

  const imageUrl = session?.user?.image || DEFAULT_IMAGE_IMG;

  const testArray = [
    1,
    1,
    1,
    1,
    1,
    11,
    1,
    11,
    1,
    1,
    1,
    11,
    1,
    1,
    1,
    1,
    11,
    1,
    1,
    11,
    1,
    ,
    1,
    11,
    1,
    1,
    11,
    ,
    11,
    1,
    1,
  ];

  return (
    <aside className={`${width} ${color} h-screen overflow-hidden`}>
      <div className="font-black text-center my-5 text-lg">{title}</div>
      <ul className="font-medium overflow-y-auto h-full flex-grow">
        {testArray.map((value, index) => {
          return (
            <li className="h-20 flex rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 justify-center border-solid border-gray-400 border-2">
              <Link
                href={"#"}
                className="flex items-center p-2 text-gray-900  w-4/5 overflow-hidden"
              >
                <Image
                  src={imageUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="mr-3 rounded-md"
                />
                <h2 className="text-xl w-3/5 truncate mx-2">{`Staycldkjfoasd ${index}`}</h2>
                <p className="text-sm truncate">
                  hello, world! have a good day!
                </p>
              </Link>
            </li>
          );
        })}
        {/* <li className="flex rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 justify-center">
          <Link
            href={"#"}
            className="flex items-center p-2 text-gray-900  w-4/5 overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt=""
              width={30}
              height={30}
              className="mr-3"
            />
            <h2 className="text-lg">aespa</h2>
          </Link>
        </li>
        <li className="flex rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 justify-center">
          <Link
            href={"#"}
            className="flex items-center p-2 text-gray-900  w-4/5 overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt=""
              width={30}
              height={30}
              className="mr-3"
            />
            <h2 className="text-lg">Le Serafim</h2>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default SideBar;
