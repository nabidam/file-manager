import React from "react";

const Box = ({ title, children }: any) => {
  return (
    <div className="p-4 border-2 border-bg-light rounded-lg gap-4 flex flex-col mb-8">
      {title ? <h3>{title}</h3> : ""}
      {children}
    </div>
  );
};

export default Box;
