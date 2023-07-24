import Room from "components/chat/room/Room";
import SideBar from "components/chat/sidebar/SideBar";
import TopBar from "components/topbar/TopBar";

const Chat = () => {
  return (
    <div className="w-screen h-screen fixed">
      <TopBar />
      <div className="flex w-full">
        <SideBar width="w-1/4" color="bg-gray-300" title="チャット相手" />
        <div className="w-3/4">
          <Room color="bg-gray-600" title="チャットルーム" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
