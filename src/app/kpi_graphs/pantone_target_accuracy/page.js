'use client'

import Chart from "../chart";
import { useEffect, useState } from "react";
import PantoneTargetingChart from "./pantone_target";
import { useAuth } from "@/app/auth_context/auth_context";
import { useRouter } from "next/navigation";


const PantoneTargetAccuracy = () => {

const [chartData, setChartData] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CHARTS}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chartType: "pantoneTargeting" }),
        });

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
  }, []);

  const { isAuthenticated, isAdmin, login, logout, isLoading, error } =
      useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (isAuthenticated === false) {
        router.push("/");
      }
    }, [isAuthenticated, router]); // checks`isAuthenticated` changes
  
    if (!isAuthenticated) return null;

  return <Chart ChartComponent={PantoneTargetingChart} chartData={chartData} />;
};

export default PantoneTargetAccuracy;