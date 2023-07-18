import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { createConsumer } from "@rails/actioncable";
import { useSession } from "next-auth/react";

type RoomProps = {
  color: string;
  title: string;
};

const URL = "ws://losalhost:3000/cable";

export default function Room(props: RoomProps) {
  const { color, title } = props;
  const { data: session } = useSession();
  const [cableApp, setCableApp] = useState({});
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const channelRef = useRef<any>(null);
  const cableRef = useRef<any>(null);
  const [chatPartner, setChatPartner] = useState<User | null>(null);
  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(localStorage.getItem("chat_partner"));

      if (event.key === "chat_partner") {
        console.log(event);
        const newChatPartner: User | null = JSON.parse(
          localStorage.getItem("chat_partner")
        );
        setChatPartner(newChatPartner);
      }
    };

    window.addEventListener("storage", () => handleStorageChange(e));

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   if (session?.user) {
  //     const consumer = createConsumer(URL);
  //     console.log(consumer);
  //     setCable(consumer);
  //   }
  // }, [session]);
  // const loadConsumer = async () => {
  //   const { createConsumer } = await import("@rails/actioncable");
  //   return createConsumer;
  // };
  // useEffect(() => {
  //   if (typeof window !== "undefined" && session?.user) {
  //     loadConsumer().then((createConsumer) => {
  //       setCableApp({
  //         cable: createConsumer(URL),
  //       });
  //     });
  //   }
  // }, [session, window]);

  // useEffect(() => {
  //   const initWebSocket = async () => {
  //     // if (!cable) return;
  //     const consumer = createConsumer(URL);
  //     console.log(consumer);
  //     // setCable(consumer);
  //     const connectedChannel = consumer.subscriptions.create(
  //       {
  //         channel: "ChatChannel",
  //         chat_id: "hoge",
  //       },
  //       {
  //         connected: () => {
  //           console.log("RoomsChannel connected!");
  //         },
  //         disconnected: () => {
  //           console.log("RoomsChannel disconnected!");
  //         },
  //       }
  //     );
  //     initWebSocket();
  //     console.log(connectedChannel);

  //     setChannel(connectedChannel);
  //   };
  // }, [session]);
  // const socket = io("ws://localhost:3000/cable");

  // useEffect(() => {
  //   socket.on("room_channel", (message) => {
  //     console.log(message);
  //     setMessages((messages) => [...messages, message]);
  //   });
  // }, []);

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit("room_channel", { content: inputMessage });
  //   setInputMessage("");
  // };

  return (
    <div className={`${color} h-full flex flex-col items-center pb-40`}>
      <h1 className="h-12 flex justify-center items-center text-white text-lg">
        To : {title}
      </h1>
      <div className="w-full h-4/5 flex flex-col items-end">
        {/* {messages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
          </div>
        ))} */}
        <div className="bg-lime-400 rounded-2xl w-fit px-7 py-3 text-lg font-medium mx-5 my-1 shadow-md shadow-gray-300">
          <p>Hello World!</p>
        </div>
        <div className="bg-lime-400 rounded-2xl w-fit px-7 py-3 text-lg font-medium mx-5 my-1">
          <p>Hello World!</p>
        </div>
      </div>
      <div className="w-3/5 flex">
        <input
          type="text"
          className="flex-grow px-5 py-4 rounded-l-md border border-gray-300 focus:outline-none focus:border-teal-500 text-lg leading-5 text-xl"
          value={inputMessage}
          placeholder="コメントを入力"
          // onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-r-md px-4 py-2"
          // onClick={(e) => handleSendMessage(e)}
        >
          送信
        </button>
      </div>
    </div>
  );
}
