import { ReactSortable } from "react-sortablejs";
import { BankDetail } from "../App";
import Wrapper from "./Wrapper";

interface ContainerProps {
  bank: BankDetail;
  bankIndexes: number[];
  // setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  setList: (bankIndexes: number[], banks: BankDetail[]) => void;
  onEnd: () => void;
  className:string;
}

const Container = ({
  bank,
  bankIndexes,
  setList,
  onEnd,
  className,
}: ContainerProps) => {
  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "shared",
    forceFallback: true
  };

  return (
    <ReactSortable
    className={className}
      list={bank.child as BankDetail[] ?? [] as BankDetail[]}
      setList={(s1, s2, s3) =>{ 
      return  s3.dragging && setList(bankIndexes, s1)}}
      {...sortableOptions}
      onEnd={onEnd}
      style={{ minHeight: "20px" }}
    >
      {(bank.child ?? []).map((childBlock, index) => {
        return (
          <Wrapper
            key={childBlock.id}
            bank={childBlock}
            bankIndexes={[...bankIndexes, index]}
            setList={setList}
            onEnd={onEnd}
            isRoot={bank.isRoot}
          />
        );
      })}
    </ReactSortable>
  );
};

export default Container;
