import PantoneInput from "./pantone_input";
import PantoneType from "./pantone_type";
import styles from "./styles.module.css";

const PantoneForm = ({ formState, handleChange, handleSubmit, updateMessage, loading }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <PantoneInput formState={formState} handleChange={handleChange} />
      <PantoneType formState={formState} handleChange={handleChange} />
      
      {updateMessage && <p className={styles.successMessage}>{updateMessage}</p>}
      
      <button className={styles.btn} type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default PantoneForm;
