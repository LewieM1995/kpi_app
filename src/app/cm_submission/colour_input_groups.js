import Dropdown from "./dropdown";
import styles from './colour_input_groups.module.css'

const ColourInputGroup = ({ 
  index, 
  color, 
  options, 
  aniloxOptions, 
  targetOptions, 
  handleChange, 
  handleRemoveColour, 
  showRemoveButton 
}) => {
  const backgroundColor = color.rgb ? `rgb(${color.rgb})` : "transparent";

  return (
    <div className={styles.colourGroupContainer}>
      {/* Header with RGB preview and Remove Button */}
      <div className={styles.header}>
        <span className={styles.rgbText}>{color.rgb ? `RGB: ${color.rgb}` : "No Color Selected"}</span>
        <span className={color.rgb ? styles.colorPreview : "hidden"} style={{ backgroundColor }}></span>
        {showRemoveButton && (
          <button className={styles.removeButton} onClick={() => handleRemoveColour(index)}>
            ✖
          </button>
        )}
      </div>

      {/* Checkbox for Previous Job */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Was colour on previous job? (tick if yes)</label>
        <input 
          type="checkbox" 
          checked={color.wasColourOnPrevJob || false} 
          onChange={(e) => handleChange(index, "wasColourOnPrevJob", e.target.checked)} 
          className={styles.checkbox}
        />
      </div>

      {/* Dropdown and Inputs */}
      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Colour:</label>
          <Dropdown
            options={options}
            handleChange={(selected) => {
              if (selected) {
                handleChange(index, "selectedColor", selected.value);
                handleChange(index, "selectedColorType", selected.type);
                handleChange(index, "rgb", `${selected.r}, ${selected.g}, ${selected.b}`);
              } else {
                handleChange(index, "selectedColor", null);
                handleChange(index, "rgb", null);
              }
            }}
            value={color.selectedColor}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Anilox:</label>
          <Dropdown 
            options={aniloxOptions} 
            handleChange={(selected) => handleChange(index, "anilox", selected ? selected.value : null)} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Target:</label>
          <Dropdown 
            options={targetOptions} 
            handleChange={(selected) => handleChange(index, "target", selected ? selected.value : null)} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>DE:</label>
          <input 
            type="text" 
            placeholder="Enter DE Value" 
            value={color.DE || ""} 
            onChange={(e) => handleChange(index, "DE", e.target.value)} 
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default ColourInputGroup;
