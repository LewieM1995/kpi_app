
import { AgCharts } from "ag-charts-react";

const SunAttendPressChart = ({data}) => {
  const sapPercentage = data

  const processedData = [
    {
      status: "SAP Yes",
      percentage: sapPercentage,
    },
    {
      status: "SAP No",
      percentage: 100 - sapPercentage,
    },
  ];

  const options = {
    height: 500,
    data: processedData,
    series: [
      {
        type: "pie",
        angleKey: "percentage",
        labelKey: "status",
        calloutLabelKey: "status",
        sectorLabelKey: "percentage",
        fills: ["#4CAF50", "#F44336"],
        strokeWidth: 0,
      },
    ],
    title: { text: "SAP 'Yes' Percentage" },
    legend: {
      enabled: true,
      position: "bottom",
    },
  };

  return <AgCharts options={options} />;
};

export default SunAttendPressChart;
