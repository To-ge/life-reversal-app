import SelectBar from "components/post/select-bar/SelectBar";
import TreeView from "components/post/tree-view/TreeView";
import TopBar from "components/topbar/TopBar";
import { useEffect, useState } from "react";

type CardInfoType = {
  id: number;
  text: string | undefined;
};

const Post = () => {
  const [buttonAction, setButtonAction] = useState(null);
  const [cardInfo, setCardInfo] = useState<CardInfoType[] | []>([]);
  const [commentPanel, setCommentPanel] = useState<boolean>(false);

  useEffect(() => {
    if (buttonAction === "Add") {
      setCardInfo((prev) => [
        ...prev,
        {
          id: cardInfo.length + 1,
          text: "",
        },
      ]);
      console.log(cardInfo);
    } else if (buttonAction === "Delete One") {
      setCardInfo((prev) => prev.slice(0, prev.length - 1));
    } else if (buttonAction === "Delete All") {
      setCardInfo([]);
    } else if (buttonAction === "Publish") {
      setCommentPanel(true);
    }
    setButtonAction(null);
  }, [buttonAction]);

  return (
    <div className="h-screen w-screen fixed">
      <TopBar />
      <div className="flex h-full">
        <SelectBar
          setButtonAction={setButtonAction}
          commentPanel={commentPanel}
          setCommentPanel={setCommentPanel}
          cardInfo={cardInfo}
        />
        <TreeView cardInfo={cardInfo} setCardInfo={setCardInfo} />
      </div>
    </div>
  );
};

export default Post;
