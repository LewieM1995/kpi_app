'use client'

import Dropdown from "./dropdown";
import styles from "./sap_date_time.module.css";

const SunAttendPress = ({ sunAttendPress, setSunAttendPress, sunAttendOptions, handleDateChange, date }) => {
  return (
    <div className={styles.sunAttendContainer}>
      <h3 className={styles.sectionTitle}>Sun Attend Press</h3>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Sun Attend Press?</label>
        <Dropdown
          options={sunAttendOptions}
          handleChange={(selected) => setSunAttendPress(selected ? selected.value : null)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Date and Time</label>
        <input 
          type="datetime-local" 
          onChange={handleDateChange} 
          value={date || ""} 
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default SunAttendPress;

