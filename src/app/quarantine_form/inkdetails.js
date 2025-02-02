import styles from './styles.module.css';

const InkDetails = ({ formState, handleChange }) => {
  return (
    <div className={styles.inputRow}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="weight">
          Weight
        </label>
        <input
          className={styles.input}
          type="number"
          id="weight"
          name="weight"
          value={formState.weight}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="ppo">
          PPO2
        </label>
        <input
          className={styles.input}
          type="text"
          id="ppo"
          name="ppo"
          value={formState.ppo}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InkDetails;
