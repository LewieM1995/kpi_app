

import { AgCharts } from "ag-charts-react";

const DEOverTimeChart = ({data}) => {

  const options = {
    height: 500,
    data: data,
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "de",
        yName: "DE",
        marker: { enabled: false },
      },
      {
        type: "line",
        xKey: "date",
        yKey: "target",
        yName: "Target",
        stroke: "red",
        strokeWidth: 2,
        marker: { enabled: false },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        label: { rotation: 45 },
        title: { text: "Date" },
      },
      {
        type: "number",
        position: "left",
        title: { text: "DE Value" },
        min: 0,
        max: 4,
      },
    ],
    title: { text: "DE Values Over Time" },
  };

  return <AgCharts options={options} />;
};

export default DEOverTimeChart;
