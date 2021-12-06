import React, { ReactElement } from "react";

interface Props {
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

function Button({ text, onClick, className }: Props): ReactElement {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${
        className && className
      } rounded-lg px-4 md:px-5 xl:px-4 mt-3 py-2 md:py-3 xl:py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-700 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md`}
    >
      {text}
    </button>
  );
}

export default Button;
