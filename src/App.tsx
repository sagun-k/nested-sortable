import React, { useState } from "react";
import "./App.css";
import GroupTree from "./GroupTree/GroupTree";




export type BankDetail = {
  id:number,
  bank_name: string;
  branch_name?: string;
  location?: string;
  address?: string;
  country?: string;
  child?:BankDetail[]
  isRoot?:boolean;
};



const bankLists: BankDetail[] = [
  {
    id: 1,
    bank_name: "Julius Baer Group",
    branch_name: "Main Branch",
    location: "Zurich",
    address: "123 Lake Street",
    country: "Switzerland",
    child: [],
  },
  {
    id: 2,
    bank_name: "Vontobel",
    branch_name: "Downtown Branch",
    location: "Geneva",
    address: "456 Alpine Avenue",
    country: "Switzerland",
    child: [],
  },
  {
    id: 3,
    bank_name: "Pictet Group",
    branch_name: "Central Branch",
    location: "Lucerne",
    address: "789 Swiss Road",
    country: "Switzerland",
    child: [
      {
        id: 4,
        bank_name: "Lombard Odier",
        branch_name: "Westside Branch",
        location: "Lausanne",   
        address: "101 Mountain Lane",
        country: "Switzerland",
        child: [],
      },
      {
        id: 5,
        bank_name: "J. Safra Sarasin",
        branch_name: "East End Branch",
        location: "Bern",
        address: "222 Valley Street",
        country: "Switzerland",
        child: [],
      },
    ], 
  },
 
]



export default function App() {
  const [bankDetails, setBankDetails] = useState<BankDetail[]>([
    {
      id:0,
      bank_name:'Root',
      child:bankLists,
      isRoot:true
    }
  ]);

  return (
    <div>
      <GroupTree banks={bankDetails} onChange={setBankDetails} />
    </div>
  );
}
