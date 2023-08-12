type TreeViewProps = {
  cardInfo: Card[] | [];
  setCardInfo: React.Dispatch<React.SetStateAction<Card[] | []>>;
};

const TreeView = (props: TreeViewProps) => {
  const { cardInfo, setCardInfo } = props;

  const handleChange = (index: number, text: string) => {
    setCardInfo((prev: Card[] | []) => {
      let updatedInfo: Card[] | [] = [...prev];
      updatedInfo[index].text = text;
      return updatedInfo;
    });
  };

  return (
    <div className="w-2/3 bg-gradient-to-r from-gray-300 to-slate-600 flex justify-center">
      <ul className="w-full sm:w-3/4 flex flex-col items-center p-5 space-y-10 overflow-y-auto mb-20">
        {cardInfo.map((card, index) => (
          <li key={index} className="w-full shadow-xl">
            <p className="w-12 sm:w-16 text-xs sm:text-sm ml-8 bg-white flex justify-center rounded-t-lg">
              {`No.${index + 1}`}
            </p>
            <input
              type="text"
              className="py-3 px-5 sm:py-5 sm:px-7 text-md w-full focus:outline-none rounded-lg"
              placeholder="when, where, how"
              onChange={(e) => handleChange(index, e.target.value)}
              value={card.text}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
