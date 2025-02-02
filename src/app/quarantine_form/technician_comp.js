import styles from './styles.module.css';

const TechnicianComp = ({ formState, handleChange }) => {
  return (
    <div className={styles.inputRow}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="technician">
          Technician
        </label>
        <input
          className={styles.input}
          type="text"
          id="technician"
          name="technician"
          value={formState.technician}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="design">
          Design
        </label>
        <input
          className={styles.input}
          type="text"
          id="design"
          name="design"
          value={formState.design}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TechnicianComp;
