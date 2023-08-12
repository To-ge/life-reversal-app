import Room from "components/chat/room/Room";
import SideBar from "components/chat/sidebar/SideBar";
import TopBar from "components/topbar/TopBar";
import { useState } from "react";
import useBreakpoint from "responsive/useBreakpoint";

const Chat = () => {
  const breakpoint = useBreakpoint();
  const [openBar, setOpenBar] = useState<boolean>(false);
  return (
    <div className="w-screen h-screen fixed">
      <TopBar />
      <div className="flex w-full relative">
        {["xs", "sm"].includes(breakpoint) && (
          <div
            className="absolute font-bold text-xl text-white cursor-pointer z-10 top-3 left-5"
            onClick={() => setOpenBar(!openBar)}
          >
            {openBar ? "✕" : "≪"}
          </div>
        )}
        {["xs", "sm"].includes(breakpoint) ? (
          openBar && (
            <SideBar width="w-3/4" color="bg-gray-300" title="チャット相手" />
          )
        ) : (
          <SideBar width="w-1/4" color="bg-gray-300" title="チャット相手" />
        )}
        <div className="w-full md:w-3/4">
          <Room color="bg-gray-600" title="チャットルーム" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
