import React, { useEffect, useState } from "react";
import { inputStyles, labelStyles } from "./Input";

interface IOption {
  name: string;
  id: string | number;
}

interface Props {
  options: IOption[];
  value: IOption;
  setValue: any;
  placeholder: string;
}

const SelectSearch = ({ options, value, setValue, placeholder }: Props) => {
  const [filteredOptions, setFilteredOptions] = useState([] as IOption[]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  useEffect(() => setFilteredOptions(options), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter(
          (option) =>
            option.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <div className="flex flex-col w-max mt-6">
      <label className={labelStyles}>Choose a group</label>
      <input
        className={inputStyles}
        onChange={handleChange}
        value={value.id === 0 || active === true ? search : value.name}
        placeholder={placeholder}
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />
      <div
        className={`flex-col items-center flex max-h-56 overflow-y-auto mt-2`}
      >
        {filteredOptions.map((option) => (
          <button
            className={`w-full py-2 hover:bg-gray-200 transition-all duration-500 font-medium ${
              option.id === value.id ? "bg-gray-400 hover:bg-gray-500 " : ""
            }`}
            onClick={() => {
              setValue(option);
              setFilteredOptions(options);
              setActive(false);
              setSearch("");
            }}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectSearch;
