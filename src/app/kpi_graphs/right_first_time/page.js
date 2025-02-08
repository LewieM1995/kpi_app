'use client'

import Chart from "../chart";
import { useEffect, useState } from "react";
import RightFirstTimeChart from "./right_first_time";
import { useAuth } from "@/app/auth_context/auth_context";
import { useRouter } from "next/navigation";

const RightFirstTime = () => {

const [chartData, setChartData] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CHARTS}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chartType: "rightFirstTime" }),
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
    }, [isAuthenticated, router]); // checks `isAuthenticated` changes
  
    if (!isAuthenticated) return null;

  return <Chart ChartComponent={RightFirstTimeChart} chartData={chartData} />;
};

export default RightFirstTime;