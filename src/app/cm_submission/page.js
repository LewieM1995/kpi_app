'use client'

import ColourForm from "./colour_form";
import style from './styles.module.css'
import { useAuth } from "../auth_context/auth_context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CmSubmission = () => {

  const { isAuthenticated, isAdmin, login, logout, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Auth state:", isAuthenticated);
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated, router]); // Runs only when `isAuthenticated` changes

  if (!isAuthenticated) return null;

  return (
    <div className={style.gridContainer}>
      <ColourForm />
    </div>
  );
};

export default CmSubmission;
