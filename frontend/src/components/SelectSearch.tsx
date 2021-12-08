import React, { useEffect, useState } from 'react'

interface IOption { name: string; id: string | number }

interface Props {
  options: IOption[];
  value: string | number;
  setValue: (value: string | number) => void;
}

const SelectSearch = ({ options, value, setValue }: Props) => {
  const [filteredOptions, setFilteredOptions] = useState([] as IOption[])
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => setFilteredOptions(options), [])
  const handleFocus = () => {
    setOpen(true)
  }
  const handleBlur = () => {
    setOpen(false)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    console.log(e.target.id)
    if (search === "") {
      setFilteredOptions(options)
    } else {
      setFilteredOptions(options.filter(option => option.name.toLowerCase().indexOf(search.toLowerCase()) > -1))
    }
  }
  console.log(value)
  return (
    <div className="flex flex-col ">
      <label>
        Choose a group
      </label>
      <input className="border-2 border-gray-400" onFocus={handleFocus}
        onBlur={handleBlur} onChange={handleChange} />
      <div className={` flex-col items-center flex ${open ? "visible" : "invisible"}`}>
        {filteredOptions.map(option => <button id={option.id.toString()} onClick={(e: any) => {
          setValue(e.target.id)
        }}>{option.name}</button>)}
      </div>
    </div>
  )
}

export default SelectSearch
