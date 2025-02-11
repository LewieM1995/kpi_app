"use client";

import Chart from "../kpi_graphs/chart";
import { useEffect, useState } from "react";
import ProcessGraphData from "./getGraph";
import { useAuth } from "@/app/auth_context/auth_context";
import { useRouter } from "next/navigation";

import styles from './style.module.css';

const ProcessGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedColour, setSelectedColour] = useState('');

  const colours = ["Magenta", "Cyan", "Yellow", "Black"];

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL_GETPROCESSQCDATA}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ colour: selectedColour }), // Send as an object
          }
        );

        const data = await response.json();
        if (response.ok) {
          setChartData(data.chartData);
        } else {
          console.error("Failed to load chart data");
        }
      } catch (error) {
        console.error("Error fetching chart:", error);
      }
    };

    fetchData();
  }, [selectedColour]); // Re-fetch when selectedColour changes

  const { isAuthenticated, isAdmin, login, logout, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <div>
        <select
          value={selectedColour}
          onChange={(e) => setSelectedColour(e.target.value)} // Fix the handler
          className={styles.select}
          required
        >
          <option value="">Select</option>
          {colours.map((colour) => (
            <option key={colour} value={colour}>
              {colour}
            </option>
          ))}
        </select>
      </div>
      <Chart ChartComponent={ProcessGraphData} chartData={chartData} selectedColour={selectedColour}/>
    </div>
  );
};

export default ProcessGraph;
