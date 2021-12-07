import React, { useState } from 'react'
import Input from "./Input"

interface Props {
    options: { name: string; id: string | number }[];
}

const SelectSearch = ({ options }: Props) => {
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [search, setSearch] = useState("")
    return (
        <>
            {/* 
            <Input name="search_groups" value={search} label="Search groups" placeholder="Group name"
                onChange={(e) => setSearch(e.target.value)} className="" /> */}
            <select>
                {search === ""
                    ? filteredOptions.map(option => <option>{option.name}</option>)
                    :
                    options.map(option => <option>{option.name}</option>)}
            </select>
        </>)
}

export default SelectSearch
