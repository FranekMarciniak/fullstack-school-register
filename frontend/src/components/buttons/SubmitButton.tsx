import React, { ReactElement } from "react";

interface Props {
  text: string;
}

function SubmitButton({ text }: Props): ReactElement {
  return (
    <input
      type="submit"
      value={text}
      className="rounded-lg px-4 md:px-5 xl:px-4 mt-5 py-2 md:py-3 xl:py-2 cursor-pointer bg-indigo-500 hover:bg-indigo-700 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md"
    />
  );
}

export default SubmitButton;
