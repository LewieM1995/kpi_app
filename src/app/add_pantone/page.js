'use client'

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth_context/auth_context";
import { useRouter } from "next/navigation";
import PantoneForm from "./pantone_form";
import styles from "./styles.module.css";

const AddPantone = () => {
  const [formState, setFormState] = useState({
    colorCode: "",
    selectedType: "",
    showTooltip: false,
    isTooltipFading: false,
    tooltipPosition: { x: 0, y: 0 },
  });

  const [updateMessage, setUpdateMessage] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const tooltipTimerRef = useRef(null);
  

  useEffect(() => {
    if (formState.showTooltip) {
      setFormState((prev) => ({ ...prev, isTooltipFading: false }));

      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);

      tooltipTimerRef.current = setTimeout(() => {
        setFormState((prev) => ({ ...prev, isTooltipFading: true }));
        setTimeout(() => {
          setFormState((prev) => ({ ...prev, showTooltip: false, isTooltipFading: false }));
        }, 500);
      }, 20000);
    }

    return () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    };
  }, [formState.showTooltip]);

  const handleChange = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formState.colorCode && formState.selectedType) {
      const formattedData = {
        value: formState.colorCode,
        label: formState.colorCode,
        type: formState.selectedType,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_ADDPANTONE}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
        });

        if (response.ok) {
          setUpdateMessage('New Colour Code added to database');
        } else {
          console.error("Failed to add new Pantone");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }

      setFormState({ colorCode: "", selectedType: null, showTooltip: false });
      setIsLoading(false);
    } else {
      alert("Please fill in all fields");
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
    }, [isAuthenticated, router]); // checks `isAuthenticated` changes
  
    if (!isAuthenticated) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Pantone</h2>
      <PantoneForm
        formState={formState}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        updateMessage={updateMessage}
        loading={loading}
      />
    </div>
  );
};

export default AddPantone;
