import Container from "./Container";

import { BankDetail } from "../App";
import "./Wrapper.css";

interface WrapperProps {
  bank: BankDetail;
  bankIndexes: number[];
  setList: (groupsIndex: number[], groups: BankDetail[]) => void;
  onEnd: () => void;
  isRoot?: boolean;
}

const Wrapper = (props: WrapperProps) => {
  return (
    <>
    <div
      className=
         {`${props.bankIndexes.length <=1?'':'block wrapper container'}`}
    >
      {props.bankIndexes.length <=1 ? (
        <div style={{color:'black'}} >List of banks</div>
      ) : (
        <div style={{ color: "black" }}>
            <span>{props.bank.bank_name} </span>
            <span>,{props.bank.address}</span>
            </div>
      )}
      <Container
        className="container"
        key={props.bank.bank_name}
        {...props}
      />
    </div>
    </>
  );
};

export default Wrapper;
