import ColourInputGroup from "./colour_input_groups";

const ColourDetails = ({ colors, options, aniloxOptions, targetOptions, handleChange, handleRemoveColour }) => {
  return (
    <div className="colour_details_cont">
      {colors.map((color, index) => (
        <ColourInputGroup
          key={index}
          index={index}
          color={color}
          options={options}
          aniloxOptions={aniloxOptions}
          targetOptions={targetOptions}
          handleChange={handleChange}
          handleRemoveColour={handleRemoveColour}
          showRemoveButton={colors.length > 1}
        />
      ))}
    </div>
  );
};

export default ColourDetails;
