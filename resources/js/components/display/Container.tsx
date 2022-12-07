import React from "react";

const Container = ({ children }: any) => {
  return <div className="container mx-auto py-8 flex flex-col">{children}</div>;
};

export default Container;
