import React from "react";

interface Props {
  text: string;
  color: string;
}

const Alert = (props: Props) => {
  return (
    <div
      className={`${
        props.color === "danger"
          ? "bg-red-100 border border-red-400 text-red-700 "
          : "bg-red-100 border border-red-400 text-red-700 "
      }px-4 py-3 rounded relative w-11/12 max-w-2xl mx-auto my-4`}
      role="alert"
    >
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline ml-4">{props.text}</span>
    </div>
  );
};

export default Alert;