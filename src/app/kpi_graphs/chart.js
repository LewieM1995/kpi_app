'use client'

"use client";

import styles from "./chart.module.css";

const Chart = ({ ChartComponent, chartData }) => {
  return (
    <div className={styles.ChartContainer}>
      {chartData ? <ChartComponent data={chartData} /> : <div>Loading...</div>}
    </div>
  );
};

export default Chart;
