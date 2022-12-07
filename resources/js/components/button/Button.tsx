import React from "react";
import cx from "classnames";

const Button = ({ type, text, onClick }: any) => {
  console.log({ type });
  return (
    <button
      className={cx(
        `rounded-lg border-2 px-4 py-2 duration-300`,
        `bg-${type ?? "success"}`,
        `border-${type ?? "success"}-dark`,
        `hover:bg-${type ?? "success"}-dark`
      )}
      onClick={onClick}
    >
      {text ?? "Submit"}
    </button>
  );
};

export default Button;
