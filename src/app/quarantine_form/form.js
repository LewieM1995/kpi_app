'use client'

import { useState } from "react";
import styles from './styles.module.css'
import ReasonSelection from "./reason_selection";


const Form = () => {

  const [formState, setFormState] = useState({
    technician: '',
    design: '',
    weight: '',
    ppo: '',
    reason: '',
  });

  const [loading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://policeappserver.duckdns.org:4000/fujiseal/postQuarantineInk', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formState: {
            technician: "LM",
            design: "SPE-123123",
            weight: "10",
            ppo: "PPO2-123456",
            reason: "Improper viscosity",
          }
        }),
      });

      if (response.ok) {
        console.log("Quarantined Ink added to database");
        setIsLoading(true);
      } else {
        console.error("Failed to add quarantined ink");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Quarantined Ink Record</h2>
      <div className={styles.grid}>
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

      <ReasonSelection  formState={formState} handleChange={handleChange}/>
      
      <div className={styles.submitSection}>
        <button type="submit" className={styles.submitButton}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Form;