import ScrollArea from "components/sns/ScrollArea";
import TopBar from "components/topbar/TopBar";

const search = () => {
  return (
    <div className="h-screen w-screen fixed">
      <TopBar />
      <div className="h-full flex justify-center bg-gradient-radial from-gray-600 via-white to-gray-500">
        <ScrollArea />
      </div>
    </div>
  );
};

export default search;
