import styles from "./styles.module.css";

const PantoneType = ({ formState, handleChange }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor="type">
        Type
      </label>
      <select
        className={styles.input}
        id="type"
        name="selectedType"
        value={formState.selectedType}
        onChange={(e) => handleChange("selectedType", e.target.value)}
      >
        <option value="">Select type...</option>
        <option value="pantone">Pantone</option>
        <option value="special">Special</option>
      </select>
    </div>
  );
};

export default PantoneType;
