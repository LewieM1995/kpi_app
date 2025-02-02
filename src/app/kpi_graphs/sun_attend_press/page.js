'use client'

import Chart from "../chart";
import { useEffect, useState } from "react";
import SunAttendPressChart from "./sun_attend_press";
import { useAuth } from "@/app/auth_context/auth_context";
import { useRouter } from "next/navigation";


const SunAttendPress = () => {

const [chartData, setChartData] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CHARTS}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chartType: "sunAttendPress" }),
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
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, router]); // checks `isAuthenticated` changes
  
    if (!isAuthenticated) return null;

  return <Chart ChartComponent={SunAttendPressChart} chartData={chartData} />;
};

export default SunAttendPress;