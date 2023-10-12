import React, { useState } from 'react';

interface IData {
  id: number;
  first_name: string;
  email: string;
  children: IData[];
}

export const CustomDragAndDrop = () => {
  const [data, setData] = useState<IData[]>([{
    "id": 1,
    "first_name": "Gilberta",
    "email": "gjime0@symantec.com",
    children:[
    ]
  }, {
    "id": 2,
    "first_name": "Timothea",
    "email": "thoble1@opera.com",
    children:[]
  }, {
    "id": 3,
    "first_name": "Lionel",
    "email": "llaugier2@hexun.com",
    children:[]
  }, {
    "id": 4,
    "first_name": "Laural",
    "email": "lvanderkrui3@imdb.com",
    children:[]
  }, {
    "id": 5,
    "first_name": "Andros",
    "email": "awakely4@blogger.com",
    children:[]

  }]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragEnter = (index: number) => {
    setDragOverIndex(index);
  };

  const onDrop = () => {
    if (draggedIndex === null || dragOverIndex === null || draggedIndex === dragOverIndex) {
      return;
    }
    const copyData = JSON.parse(JSON.stringify(data));
    const dragItem = copyData[draggedIndex];
    const dropTarget = copyData[dragOverIndex];
    // If the dragged item is placed before the drop target, it should become a child of the drop target.
    // If the dragged item is placed after the drop target, it should become a sibling of the drop target.
    if (draggedIndex < dragOverIndex) {
      if (!dropTarget.children) {
        dropTarget.children = [];
      }
      dropTarget.children.push(dragItem);
    } else {
      const parentIndex = copyData.findIndex((item) => item.children?.includes(dragItem));
      if (parentIndex !== -1) {
        copyData[parentIndex].children = copyData[parentIndex].children?.filter((item) => item.id !== dragItem.id) || [];
      }
      copyData.splice(draggedIndex, 1);
      copyData.splice(dragOverIndex, 0, dragItem);
    }

    setData(copyData);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderContent = (items: IData[], level = 0) => {
    return items.map((item, index) => (
      <div
        key={item.id}
        onDragOver={handleDragOver}
        style={{width:'80%',  border: '2px solid black', background:'white',color:'black' ,padding: '20px', marginLeft: `${level * 20}px` }}
        id={String(index)}
        draggable
        onDragStart={() => onDragStart(index)}
        onDragEnter={() => onDragEnter(index)}
        onDragEnd={onDrop}
      >
        {item.id}
        {item.children?.length > 0 && renderContent(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div style={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',}} >
      {renderContent(data)}
    </div>
  );
};
