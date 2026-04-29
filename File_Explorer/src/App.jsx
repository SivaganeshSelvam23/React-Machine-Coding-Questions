import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import data from "./data/data";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { CiFolderOn, CiFileOn } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";

const App = () => {
  const [fileData, setFileData] = useState(data);
  const [createFile, setCreateFile] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [input, setInput] = useState("");
  const [isExpand, setIsExpand] = useState({});
  const [record, setRecord] = useState(0);

  const insertNode = (list, folderId, newNode) => {
    return list.map((item) => {
      if (item.id === folderId) {
        return {
          ...item,
          children: [...item.children, newNode],
        };
      }

      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: insertNode(item.children, folderId, newNode),
        };
      }

      return item;
    });
  };

  const saveHandler = () => {
    if (!input.trim()) return;

    if (createFile) {
      const newFile = {
        id: uuidv4(),
        name: input,
        isFolder: false,
        children: [],
      };

      if (record) {
        setFileData((prev) => insertNode(prev, record, newFile));
      } else {
        setFileData((prev) => [...prev, newFile]);
      }

      setCreateFile(false);
    }

    if (createFolder) {
      const newFolder = {
        id: uuidv4(),
        name: input,
        isFolder: true,
        children: [],
      };

      if (record) {
        setFileData((prev) => insertNode(prev, record, newFolder));
      } else {
        setFileData((prev) => [...prev, newFolder]);
      }

      setCreateFolder(false);
    }

    setInput("");
    setRecord(0);
  };

  const ListComponent = ({ list }) => {
    const nameClickHandler = (node) => {
      if (node.isFolder) {
        setIsExpand((prev) => ({
          ...prev,
          [node.name]: !prev[node.name],
        }));

        setRecord(node.id);
      }
    };

    return (
      <div className="px-3 py-2 border-l-2 border-slate-300">
        {list.map((node) => (
          <div key={node.id}>
            <div className="flex items-center gap-1">
              {node.isFolder && (
                <div>
                  {isExpand?.[node.name] ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </div>
              )}

              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => nameClickHandler(node)}
              >
                <div>
                  {node.isFolder ? (
                    <CiFolderOn className="text-yellow-400 text-xl" />
                  ) : (
                    <CiFileOn className="text-green-400 text-xl" />
                  )}
                </div>

                <div className="">{node.name}</div>
              </div>
            </div>

            {isExpand?.[node.name] && node.children && (
              <ListComponent list={node.children} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <p className="text-4xl flex justify-center m-10">
        File Explorer Component
      </p>

      <div className="m-25">
        <div className="ml-3 mb-3 h-5 flex gap-3 items-center">
          <div>File explorer</div>

          <CiFolderOn
            className="text-3xl cursor-pointer text-sky-600"
            onClick={() => {
              setCreateFolder(true);
              setCreateFile(false);
            }}
          />

          <CiFileOn
            className="text-3xl cursor-pointer text-sky-600"
            onClick={() => {
              setCreateFile(true);
              setCreateFolder(false);
            }}
          />

          {(createFile || createFolder) && (
            <div className="relative w-fit">
              <input
                className="p-2 pr-8 border-2 rounded-md border-white text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <IoSaveOutline
                className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-green-600 cursor-pointer"
                onClick={saveHandler}
              />
            </div>
          )}
        </div>

        <ListComponent list={fileData} />
      </div>
    </div>
  );
};

export default App;
