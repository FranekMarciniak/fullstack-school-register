import React, { MouseEventHandler, useEffect, useState } from "react";
import { inputStyles, labelStyles } from "./Input";

// interface IOption {
//   name: string;
//   id: string | number;
// }

interface Props {
  options: any[];
  value: any;
  setValue: any;
  label: string;
  placeholder: string;
  className?: string;
  keysToDisplay: string[];
}

const SelectSearch = ({
  options,
  value,
  setValue,
  placeholder,
  label,
  className = "",
  keysToDisplay,
}: Props) => {
  const [filteredOptions, setFilteredOptions] = useState([] as any[]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter(
          (option) =>
            keysToDisplay
              .reduce((prev, curr) => `${prev} ${option[curr as string]}`, "")
              .toLowerCase()
              .indexOf(e.target.value.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <div className={"flex flex-col mt-6" + className}>
      <label className={labelStyles}>{label}</label>
      <input
        className={inputStyles}
        onChange={handleChange}
        value={
          value === 0 || active === true
            ? search
            : keysToDisplay.reduce(
              (prev, curr) =>
                `${prev} ${options.find((option) => option.id === value)[
                curr as string
                ]
                }`,
              ""
            )
        }
        placeholder={placeholder}
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />
      <div
        className={`flex-col items-center flex max-h-44 overflow-y-auto mt-2 border-2 border-gray-400`}
      >
        {filteredOptions.map((option) => (
          <button
            className={`w-full py-2 hover:bg-gray-200 transition-all duration-500 font-medium ${option.id === value ? "bg-gray-400 hover:bg-gray-500 " : ""
              }`}
            onClick={(e: any) => {
              e.preventDefault()
              setValue(option.id);
              setFilteredOptions(options);
              setActive(false);
              setSearch("");
            }}
          >
            {keysToDisplay.reduce(
              (prev, curr) => `${prev} ${option[curr as string]}`,
              ""
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectSearch;
