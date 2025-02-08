"use client";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth_context/auth_context";
import { useEffect } from "react";

const KpiGraphs = () => {
  const { isAuthenticated, isAdmin, login, logout, isLoading, error } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated, router]); //  Runs only when `isAuthenticated` changes

  if (!isAuthenticated) return null;

  const data = [
    "Anilox Average",
    "Anilox Scatter",
    "DE Over Time",
    "Pantone Target Accuracy",
    "Right First Time",
    "Sun Attend Press",
  ];

  return (
    <div className={styles.gridContainer}>
      {data.map((item, index) => (
        <div
          key={index}
          className={styles.gridItem}
          onClick={(e) =>
            router.push(`kpi_graphs/${item.split(" ").join("_").toLowerCase()}`)
          }
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default KpiGraphs;
