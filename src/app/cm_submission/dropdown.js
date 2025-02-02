
import { useState } from "react";
import Select from "react-select";

const Dropdown = ({ options, handleChange}) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={"select"}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name="color"
        options={options}
        onChange={handleChange}
      />
      <div
        style={{
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "italic",
          marginTop: "1em",
        }}
      ></div>
    </div>
  );
};

export default Dropdown;