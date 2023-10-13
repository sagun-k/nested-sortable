
import CompanyContainer from "./CompanyContainer";
import "../GroupTree/Wrapper.css"
import { TreeViewItem } from "./CompanyTree";

interface WrapperProps {
  company: TreeViewItem;
  companyIndexes: number[];
  setList: (companyIndex: number[], companies: TreeViewItem[]) => void;
  onEnd: () => void;
  isRoot?: boolean;
}

const CompanyWrapper = (props: WrapperProps) => {
  return (
    <>
    <div
      className=
         {`${props.companyIndexes.length <=1?'':'block wrapper container'}`}
    >
      {props.companyIndexes.length <=1 ? (
        <div style={{color:'black'}} >List of banks</div>
      ) : (
        <div style={{ color: "black" }}>
            <span>{props?.company?.name} </span>
            </div>
      )}
      <CompanyContainer
        className="container"
        key={props?.company?.id}
        {...props}
      />
    </div>
    </>
  );
};

export default CompanyWrapper;
