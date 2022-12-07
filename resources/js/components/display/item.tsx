import React, { useState } from "react";
import Document from "../icons/Document";
import Folder from "../icons/Folder";
import FolderOpen from "../icons/FolderOpen";

const Item = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/files/${item.path}`.replace(" ", "_")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <li className="flex gap-2 justify-between rounded-lg bg-bg-light border-bg-light border-2 p-4 w-full my-2 hover:bg-bg-hover hover:border-border-hover hover:border-2 hover:cursor-pointer">
        <div className="flex gap-2 align-middle">
          {item.isFile ? <Document /> : hovered ? <FolderOpen /> : <Folder />}
          {item.title}
        </div>
        <span>{item.size}</span>
      </li>
    </a>
  );
};

export default Item;
