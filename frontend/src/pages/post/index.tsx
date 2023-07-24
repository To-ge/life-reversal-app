import SelectBar from "components/post/select-bar/SelectBar";
import TreeView from "components/post/tree-view/TreeView";
import TopBar from "components/topbar/TopBar";
import { useEffect, useState } from "react";

const Post = () => {
  const [buttonAction, setButtonAction] = useState<string>("");
  const [cardInfo, setCardInfo] = useState<Card[] | []>([]);
  const [commentPanel, setCommentPanel] = useState<boolean>(false);

  useEffect(() => {
    if (buttonAction === "Add") {
      setCardInfo((prev: Card[]) => [
        ...prev,
        {
          id: cardInfo.length + 1,
          content: "",
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
    setButtonAction("");
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
