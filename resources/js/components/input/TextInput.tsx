import React from "react";

const TextInput = ({ type, value, onChange, placeholder, name }: any) => {
  return (
    <input
      type={type ?? "text"}
      placeholder={placeholder}
      name={name}
      className="rounded-lg px-4 py-2 bg-gray-light text-bg-light"
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;
