import { useRef } from "react";
import { CompanyDto } from "../App";
import CompanyWrapper from "./CompanyWrapper";
interface GroupTreeProps {
  companies:TreeViewItem[]
  onChange: (companies: TreeViewItem[]) => void;

}

export type TreeViewItem = {
  id?: string;
  name?: string;
  parentId?: string | null;
  children?: TreeViewItem[];
}


const CompanyTree = ({
  companies,
  onChange: handleChangeGroups

}: GroupTreeProps) => {
  const ref = useRef<any[]>([]);

  const handleSetGroups = (groupsIndex: number[], currentList: TreeViewItem[]) => {
    ref.current.push({ groupsIndex, currentList });
  };

  const handleOnEnd = () => {
    const attemps = [...ref.current];
    attemps.sort((a, b) => b.groupsIndex.length - a.groupsIndex.length);
    const tempList = [...companies];
    let attempIndex = 0;
    while (attempIndex < attemps.length) {
      const attemp = { ...attemps[attempIndex] };
      attempIndex++;
      const _blockIndex = [...attemp.groupsIndex];
      const lastIndex = _blockIndex.pop()!;
      const lastArr = _blockIndex.reduce(
        (arr, i) => arr[i]["children"] ?? [],
        tempList
      );
      lastArr[lastIndex]["children"] = attemp.currentList;
    }
    ref.current = [];
    handleChangeGroups(tempList);
  };

  const  flatten=(node: TreeViewItem, parentId: string | null,result:TreeViewItem[])=> {
    const { children, ...item } = node;
    item.parentId = parentId;
    result.push(item);
    if (children) {
      children.forEach(child => flatten(child, node.id || null,result));
    }
  }

   const flattenTreeView=(tree: TreeViewItem[]): TreeViewItem[]=> {
    const result: TreeViewItem[] = [];
    tree.forEach(item => flatten(item, null,result));
    return result;
  }
  

  const handleSaveHierarchy = () =>{
    console.log(flattenTreeView(companies[0].children as TreeViewItem[]))
  }


  return (
    <div>
      <CompanyWrapper
        key={companies?.[0]?.id}
        company={companies?.[0]}
        companyIndexes={[0]}
        setList={handleSetGroups}
        onEnd={handleOnEnd}
      />
      <button onClick={handleSaveHierarchy} >
        Save hierarchy
      </button>
    </div>
  );
};

export const createTreeViewItems = (companies?: CompanyDto[]): TreeViewItem[] => {
  const result: TreeViewItem[] = [];
  if (companies) {
      return companies.filter(company => company.parentId === null)
          .map<TreeViewItem>(company => {
             return {
                 ...company,
                 children: createChildTreeViewItems(companies, company.id!)
             }
          });
  }
  return result;
}
export const createChildTreeViewItems = (companies: CompanyDto[], parentId: string): TreeViewItem[] => {
  return companies.filter(company => company.parentId === parentId)
      .map<TreeViewItem>(company => {
          return {
              ...company,
              children: createChildTreeViewItems(companies, company.id!)
          }
      });
}

export default CompanyTree;