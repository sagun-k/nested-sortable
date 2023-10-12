import { useRef } from "react";
import { BankDetail } from "../App";
import Wrapper from "./Wrapper";

interface GroupTreeProps {
  banks: BankDetail[];
  onChange: (banks: BankDetail[]) => void;
}

const GroupTree = ({
    banks,
  onChange: handleChangeGroups
}: GroupTreeProps) => {
  const ref = useRef<any[]>([]);

  const handleSetGroups = (groupsIndex: number[], currentList: BankDetail[]) => {
    ref.current.push({ groupsIndex, currentList });
  };

  const handleOnEnd = () => {
    const attemps = [...ref.current];
    attemps.sort((a, b) => b.groupsIndex.length - a.groupsIndex.length);
    const tempList = [...banks];
    let attempIndex = 0;
    while (attempIndex < attemps.length) {
      const attemp = { ...attemps[attempIndex] };
      attempIndex++;
      const _blockIndex = [...attemp.groupsIndex];
      const lastIndex = _blockIndex.pop()!;
      const lastArr = _blockIndex.reduce(
        (arr, i) => arr[i]["child"] ?? [],
        tempList
      );
      lastArr[lastIndex]["child"] = attemp.currentList;
    }
    ref.current = [];
    handleChangeGroups(tempList);
  };
  
  const handleSaveHierarchy = () =>{
    console.log(banks[0].child)
  }

  return (
    <div>
      <Wrapper
        key={banks[0].id}
        bank={banks[0]}
        bankIndexes={[0]}
        setList={handleSetGroups}
        onEnd={handleOnEnd}
        isRoot={banks[0].isRoot}
      />
      <button onClick={handleSaveHierarchy} >
        Save hierarchy
      </button>
    </div>
  );
};

export default GroupTree;
