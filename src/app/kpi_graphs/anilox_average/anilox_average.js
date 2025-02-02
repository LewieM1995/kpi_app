
import { AgCharts } from "ag-charts-react";

const AniloxAverageChart = ( { data } ) => {

  const options = {
    height: 500,
    data: data,
    series: [
      {
        type: "line",
        xKey: "anilox",
        yKey: "avgDE",
        yName: "Average DE",
        stroke: "green",
        marker: { enabled: false },
      },
      {
        type: "line",
        xKey: "anilox",
        yKey: "upperlimit",
        yName: "Upper Limit",
        stroke: "red",
        strokeWidth: 2,
        marker: { enabled: false },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Anilox" },
        label: { rotation: 0 },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Average DE" },
        min: 0,
        max: 4,
      },
    ],
    title: { text: "Average DE per Anilox Type" },
    legend: { enabled: true },
  };

  return <AgCharts options={options} />;
};

export default AniloxAverageChart;
