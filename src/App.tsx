import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import styled from "styled-components";
import "./App.css";

const StyledBlockWrapper = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
  cursor: move;
  &:hover {
    //background: #eeeeee;
  }
`;

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared"
};

export interface IBlock{
  id: number,
  content: string;
  width?: number;
  type: string;
  parent_id: number | null;
  children: IBlock[]
}

export interface IWrappers{
  block:IBlock;
  setBlocks: React.Dispatch<React.SetStateAction<IBlock[]>>
  blockIndex:number[]
}

export default function App() {
  const [blocks, setBlocks] = useState<IBlock[]>([
    {
      id: 1,
      content: "item 1",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 2,
          content: "item 2",
          width: 3,
          type: "container",
          parent_id: 1,
          children: []
        },
        {
          id: 3,
          content: "item 3",
          width: 3,
          type: "container",
          parent_id: 1,
          children: []
        }
      ]
    },
    {
      id: 4,
      content: "item 2",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 5,
          content: "item 5",
          width: 3,
          parent_id: 2,
          type: "container",
          children: [
            {
              id: 8,
              content: "item 8",
              width: 6,
              type: "container",
              parent_id: 5,
              children: []
            },
            {
              id: 9,
              content: "item 9",
              width: 6,
              type: "container",
              parent_id: 5,
              children: []
            }
          ]
        },
        {
          id: 6,
          content: "item 6",
          width: 2,
          type: "container",
          parent_id: 2,
          children: []
        },
        {
          id: 7,
          content: "item 7",
          width: 2,
          type: "container",
          parent_id: 2,
          children: []
        }
      ]
    }
  ]);

  return (
    <div>
      <ReactSortable list={blocks} setList={setBlocks} {...sortableOptions}>
        {blocks.map((block, blockIndex) => (
          <BlockWrapper
            key={block.id}
            block={block}
            blockIndex={[blockIndex]}
            setBlocks={setBlocks}
          />
        ))}
      </ReactSortable>
      <button onClick={()=>{console.log(blocks)}} >Save herarchy</button>
    </div>
  );
}
function Container({ block, blockIndex, setBlocks }:IWrappers) {
  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children || []}
        setList={(currentList:IBlock[]) => {
          setBlocks((sourceList) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]["children"],
              tempList
            );
            lastArr[lastIndex as number]["children"] = currentList;
            return tempList;
          });
        }}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock, index) => {
            return (
              <BlockWrapper
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </>
  );
}
function BlockWrapper({ block, blockIndex, setBlocks }:IWrappers) {
  if (!block) return null;
    return (
      <StyledBlockWrapper className="block" style={{color:'black'}} >
        container: {block.content}
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </StyledBlockWrapper>
    );
}
