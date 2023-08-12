import { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { UserContext } from "provider/userProvider";
import api from "utils/axios";
import { getAllMessages } from "utils/chat";
import { ActionCableContext } from "provider/ActionCableProvider";
import { ToastContainer, toast } from "react-toastify";
import { scrollDown } from "assets/scrollDown";
import { UserProvider } from "types/props.type";
import useBreakpoint from "responsive/useBreakpoint";

type RoomProps = {
  color: string;
  title: string;
};

export default function Room(props: RoomProps) {
  const { color, title } = props;
  const { data: session } = useSession();
  const [channel, setChannel] = useState({});
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [inputMessage, setInputMessage] = useState("");
  // const channelRef = useRef<any>(null);
  // const { cable } = useContext(ActionCableContext);
  const [chatPartner, setChatPartner] = useState<User | null>(null);
  const { partner } = useContext<UserProvider>(UserContext);
  const chatContainer = useRef(null);
  const breakpoint = useBreakpoint();
  const mobileSize = ["xs"].includes(breakpoint);

  useEffect(() => {
    const chatPartnerData = localStorage.getItem("chat_partner");
    if (chatPartnerData) {
      const newChatPartner: User = JSON.parse(chatPartnerData);
      setChatPartner(newChatPartner);
    }
  }, [partner]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getAllMessages({
          email: session?.user?.email || "",
          other_id: chatPartner?.id || 0,
        });
        setMessages(res);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [chatPartner]);

  const handleSendMessage = async () => {
    if (inputMessage === "") return;
    try {
      const res = await api.post("messages", {
        email: session?.user?.email,
        other_id: chatPartner?.id,
        content: inputMessage,
      });
      if (!res.data.error) {
        setInputMessage("");
        setMessages(() => [...messages, res.data]);
      } else {
        toast.error(res.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    scrollDown(chatContainer);
  }, [messages]);

  // console.log(cable);
  // useEffect(() => {
  //   if (cable && chatPartner) {
  //     console.log("接続開始");
  //     const chnl = cable.subscriptions.create(
  //       {
  //         channel: `${session?.user?.name}_${chatPartner.name}`,
  //       },
  //       {
  //         connected: () => {
  //           console.log("RoomsChannel connected!");
  //         },
  //         disconnected: () => {
  //           console.log("RoomsChannel disconnected!");
  //         },
  //         received: (data) => {
  //           console.log("Received message:", data.message);
  //         },
  //       }
  //     );

  //     setChannel(chnl);
  //   }

  //   return () => {
  //     if (cable) {
  //       cable.disconnect();
  //     }
  //   };
  // }, [chatPartner, cable]);

  return (
    <div className={`${color} h-screen flex flex-col items-center pb-28`}>
      <h1 className="h-12 flex justify-center items-center text-white text-md">
        To : {chatPartner?.name}
      </h1>
      <div className="overflow-hidden h-4/5 w-full">
        <div
          ref={chatContainer}
          id="room"
          className="w-full max-h-full flex flex-col space-y-3 overflow-y-auto"
        >
          {messages &&
            messages.length >= 1 &&
            messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.user_id !== chatPartner?.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.user_id !== chatPartner?.id
                      ? "bg-lime-400"
                      : "bg-slate-300"
                  } rounded-2xl w-fit px-5 py-3 text-xs sm:text-sm font-medium mx-12 my-1 shadow-md shadow-gray-300`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`flex ${
          mobileSize ? "pb-8 w-5/6 pt-3" : "w-3/5 pt-5"
        } mx-auto`}
      >
        <input
          type="text"
          className="flex-grow px-3 py-2 sm:px-5 sm:py-3 rounded-l-md border border-gray-300 focus:outline-none focus:border-teal-500 text-xs sm:text-md"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="コメントを入力"
        />
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-r-md px-3 py-2 text-sm sm:text-base"
          onClick={handleSendMessage}
        >
          送信
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
