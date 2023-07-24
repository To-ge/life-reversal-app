type TreeViewProps = {
  cardInfo: Card[] | [];
  setCardInfo: React.Dispatch<React.SetStateAction<Card[] | []>>;
};

const TreeView = (props: TreeViewProps) => {
  const { cardInfo, setCardInfo } = props;

  const handleChange = (index: number, text: string) => {
    setCardInfo((prev: Card[] | []) => {
      let updatedInfo: Card[] | [] = [...prev];
      console.log(updatedInfo);
      updatedInfo[index].content = text;
      return updatedInfo;
    });
  };

  return (
    <div className="w-2/3 bg-gradient-to-r from-gray-300 to-slate-600 flex justify-center">
      <ul className="w-3/4 flex flex-col items-center p-5 space-y-10 overflow-y-auto mb-20">
        {cardInfo.map((card, index) => (
          <li key={index} className="w-3/4 shadow-xl">
            <p className="w-20 text-lg ml-8 bg-white flex justify-center rounded-t-lg">
              {`No.${index + 1}`}
            </p>
            <input
              type="text"
              className="p-7 text-2xl w-full focus:outline-none rounded-lg"
              placeholder="when, where, how"
              onChange={(e) => handleChange(index, e.target.value)}
              value={card.content}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
