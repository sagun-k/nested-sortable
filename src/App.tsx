import { useState } from "react";
import "./App.css";
import CompanyTree, { TreeViewItem, createTreeViewItems } from "./CompanyTree/CompanyTree";




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




const companies: TreeViewItem[] = [
  {
      id: "E62FE7BC-D1B6-4CA6-981B-916D0FB0865F",
      name: "Holding AG",
      parentId: null
  },
  {
      id: "497A8157-7D8B-4EE9-91C8-47869DABADD7",
      name: "Management AG",
      parentId: "E62FE7BC-D1B6-4CA6-981B-916D0FB0865F"
  },
  {
      id: "29DC037C-556A-48E4-B4D6-6BC1C2E92FC4",
      name: "Produktion AG",
      parentId: "497A8157-7D8B-4EE9-91C8-47869DABADD7"
  },
  {
      id: "D899DB70-8AA7-498B-AC01-65D08E8A2744",
      name: "Deutschland AG",
      parentId: "497A8157-7D8B-4EE9-91C8-47869DABADD7"
  },
  {
      id: "D40502EE-C501-48AA-9A85-8AA4599D97A0",
      name: "Oesterreich AG",
      parentId: "497A8157-7D8B-4EE9-91C8-47869DABADD7"
  },
  {
      id: "137D0036-8B5B-4AD8-B1BB-00AA9E688385",
      name: "Schweiz AG",
      parentId: "497A8157-7D8B-4EE9-91C8-47869DABADD7"
  },
  {
      id: "E0478608-C841-49A1-BFEA-8202ACF0BF1C",
      name: "APEC",
      parentId: "E62FE7BC-D1B6-4CA6-981B-916D0FB0865F"
  },
  {
      id: "2322A978-C9BA-4727-9BD7-C4C7B0E5ABC7",
      name: "Neuseeland AG",
      parentId: "E0478608-C841-49A1-BFEA-8202ACF0BF1C"
  },
  {
      id: "75F7D7AD-FDFA-4C2E-A217-76A8E3017713",
      name: "Australia LTD",
      parentId: "E0478608-C841-49A1-BFEA-8202ACF0BF1C"
  }
]


export default function App() {
  const [companyTreeViewItems, setCompanyTreeViewItems] = useState<TreeViewItem[]>([
    {
      id:'0',
      name:"List of banks",
      children:createTreeViewItems(companies)
    }
  ]);

  return (
    <div>
      <CompanyTree  companies={companyTreeViewItems} onChange={setCompanyTreeViewItems}   />
    </div>
  );
}
