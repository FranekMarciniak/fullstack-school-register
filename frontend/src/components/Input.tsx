import React, { ReactElement } from "react";
interface Props {
  name: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
  className?: string;
}
export const labelStyles = `block text-gray-700 text-sm font-bold mb-2 w-full`;
export const inputStyles =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
function Input({
  name,
  placeholder,
  type = "text",
  onChange,
  label,
  value,
  className = "",
}: Props): ReactElement {
  return (
    <label htmlFor={name} className={labelStyles}>
      {label ? label : name}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={inputStyles + className}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
