'use client'

import { useState, useEffect } from "react";
import { useAuth } from "../auth_context/auth_context";
import { useRouter } from "next/navigation";
import styles from './styles.module.css';
import TechnicianComp from "./technician_comp";
import InkDetails from "./inkdetails";
import ReasonSelection from "./reason_selection";

const QuarantineForm = () => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formState }),
      });

      if (response.ok) {
        console.log("Quarantined Ink added to database");
        setIsLoading(false);
      } else {
        console.error("Failed to add quarantined ink");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setIsLoading(false);
    }
  };

  const { isAuthenticated, isAdmin, login, logout, isLoading, error } =
      useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, router]); // ✅ Runs only when `isAuthenticated` changes
  
    if (!isAuthenticated) return null;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Quarantined Ink Record</h2>

      <div className={styles.grid}>
        {/* Row 1 - Technician and Design */}
        <TechnicianComp formState={formState} handleChange={handleChange} />

        {/* Row 2 - Weight and PPO */}
        <InkDetails formState={formState} handleChange={handleChange} />

        {/* Row 3 - Reason */}
        <ReasonSelection formState={formState} handleChange={handleChange} />
      </div>

      <div className={styles.submitSection}>
        <button type="submit" className={styles.submitButton}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default QuarantineForm;
