import React from "react";

const Item = ({ item }) => {
  return (
    <a href={`/files/${item.path}`}>
      <li className="rounded-lg bg-bg-light border-bg-light border-2 p-4 w-full my-2 hover:bg-bg-hover hover:border-border-hover hover:border-2 hover:cursor-pointer">
        {item.title}
      </li>
    </a>
  );
};

export default Item;
