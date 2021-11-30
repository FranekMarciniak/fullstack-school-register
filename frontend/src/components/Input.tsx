import React, { ReactElement } from "react";
interface Props {
  name: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
}
function Input({
  name,
  placeholder,
  type = "text",
  onChange,
  label,
  value,
}: Props): ReactElement {
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2 w-full";
  const inputStyles =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <label htmlFor={name} className={labelStyles}>
      {label ? label : name}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={inputStyles}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
