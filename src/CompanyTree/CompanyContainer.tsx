import { ReactSortable } from "react-sortablejs";
import { TreeViewItem } from "./CompanyTree";
import CompanyWrapper from "./CompanyWrapper";

interface ContainerProps {
  company: TreeViewItem;
  companyIndexes: number[];
  // setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  setList: (companyIndexes: number[], companies: TreeViewItem[]) => void;
  onEnd: () => void;
  className:string;
}

const CompanyContainer = ({
  company,
  companyIndexes,
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
      list={company?.children as TreeViewItem[] ?? [] as TreeViewItem[]}
      setList={(s1, s2, s3) =>{ 
      return  s3.dragging && setList(companyIndexes, s1)}}
      {...sortableOptions}
      onEnd={onEnd}
      style={{ minHeight: "20px" }}
    >
      {(company?.children ?? []).map((childBlock, index) => {
        return (
          <CompanyWrapper
            key={childBlock.id}
            company={childBlock}
            companyIndexes={[...companyIndexes as number[], index]}
            setList={setList}
            onEnd={onEnd}
          />
        );
      })}
    </ReactSortable>
  );
};

export default CompanyContainer;
