import styles from "./styles.module.css";

const PantoneFilter = ({ filter, handleFilterChange }) => {
  return (
    <input
      className={styles.inputText}
      type="text"
      placeholder="Search filter"
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default PantoneFilter;
