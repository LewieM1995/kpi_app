import styles from "./styles.module.css";

const PantoneTooltip = ({ formState }) => {
  return (
    <div
      className={`${styles.tooltip} ${formState.isTooltipFading ? styles.tooltipHidden : ""}`}
      style={{ left: `${formState.tooltipPosition.x}px`, top: `${formState.tooltipPosition.y}px` }}
    >
      <p>Formatting Instructions:</p>
      <ul className={styles.tooltipList}>
        <li>Enter the colour code in the format: XXX#### C</li>
        <li>Use capital letters for the prefix (e.g., BLU, RED)</li>
        <li>Include a space before the final character</li>
        <li>Ex: BLU0034 C</li>
        <li>Ex: 7891 C</li>
        <li>Ex: Red032 C</li>
      </ul>
    </div>
  );
};

export default PantoneTooltip;
