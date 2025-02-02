import PantoneTooltip from "./pantone_tooltip";
import styles from "./styles.module.css";

const PantoneInput = ({ formState, handleChange }) => {
  const toggleTooltip = (event) => {
    const rect = event.target.getBoundingClientRect();
    handleChange("tooltipPosition", { x: rect.left - 140, y: rect.top + 10 });
    handleChange("showTooltip", !formState.showTooltip);
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor="colorInput">
        Colour Code:
        <span className={styles.infoIcon} onClick={toggleTooltip}> ⓘ </span>
      </label>
      <input
        id="colorInput"
        className={styles.input}
        type="text"
        value={formState.colorCode}
        onChange={(e) => handleChange("colorCode", e.target.value)}
        placeholder="e.g. BLU0034/7689 C C"
      />
      {formState.showTooltip && <PantoneTooltip formState={formState} />}
    </div>
  );
};

export default PantoneInput;
