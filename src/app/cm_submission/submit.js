import styles from "./submit.module.css";

const SubmitSection = ({ isLoading, handleSubmit, handleAddColour, counter }) => {
  return (
    <div className={styles.submitContainer}>
      <button className={styles.btnPrimary} type="submit" onClick={handleSubmit}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
      {counter < 6 && (
        <button className={styles.btnSecondary} type="button" onClick={handleAddColour}>
          Add Colour
        </button>
      )}
    </div>
  );
};

export default SubmitSection;
