import styles from "./job_details.module.css";

const JobDetails = ({ PPONum, setPPONum, designNum, setDesignNum, speNum, setSPENum, handleInputChange }) => {
  return (
    <div className={styles.jobCodeWrapper}>
      <h3 className={styles.sectionTitle}>Job Details</h3>
      <div className={styles.jobCodeContainer}>
        <div className={styles.inputGroup}>
          <label>PPO Number</label>
          <input
            type="text"
            placeholder="PPO2-#"
            onChange={handleInputChange(setPPONum, "PPO2-", 6)}
            value={PPONum}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Design Number</label>
          <input
            type="text"
            placeholder="200-#"
            onChange={handleInputChange(setDesignNum, "200-", 6)}
            value={designNum}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>SPE Number</label>
          <input
            type="text"
            placeholder=""
            onChange={handleInputChange(setSPENum, "SPE-", 7)}
            value={speNum}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
