import React, { ReactElement } from "react";

interface Props {
  options: any[];
  defaultVal: string;
  setValue: (id: number) => void;
  label?: string;
  keyToDisplay: string;
  value: number;
}

function Select({
  options,
  label,
  value,
  setValue,
  defaultVal,
  keyToDisplay,
}: Props): ReactElement {
  return (
    <select
      className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setValue(parseInt(e.target.value))
      }
    >
      <option value={0}>{defaultVal}</option>
      {options.map((option, index) => (
        <option key={index} value={option.id}>
          {option[keyToDisplay]}
        </option>
      ))}
    </select>
  );
}

export default Select;
