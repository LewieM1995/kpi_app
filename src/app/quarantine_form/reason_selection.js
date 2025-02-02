import styles from './styles.module.css';

const ReasonSelection = ({ formState, handleChange }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor="reason">
        Reason for Quarantine
      </label>
      <select
        className={styles.input}
        id="reason"
        name="reason"
        value={formState.reason}
        onChange={handleChange}
      >
        <option value="">Select a reason</option>
        <option value="weak">Weak</option>
        <option value="separation">Separation</option>
        <option value="feathering">Feathering</option>
        <option value="expiration">Expiration</option>
        <option value="sedimentation">Sedimentation</option>
        <option value="bastardised">Bastardised</option>
        <option value="low_visco">Low Viscosity</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default ReasonSelection;
