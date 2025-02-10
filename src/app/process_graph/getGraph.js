
import { AgCharts } from "ag-charts-react";

const ProcessGraphData = ( {data} ) => {

  const options = {
    height: 500,
    data: data,
    series: [
      {
        type: "bar",
        xKey: "anilox",
        yKey: "press_result",
        yName: "Press Result",
        stroke: "green",
        label: { enabled: true, color: "white", fontSize: 12, formatter: ({ datum }) => `${datum.count}`}
      },
      {
        type: "bar",
        xKey: "anilox",
        yKey: "proofer_result",
        yName: "Proofer Result",
        stroke: "blue",
        strokeWidth: 2,
        label: { enabled: true, color: "white", fontSize: 12, formatter: ({ datum }) => `${datum.count}`}
      },
      {
        type: "line",
        xKey: "anilox",
        yKey: "target",
        yName: "Target",
        stroke: "green",
        strokeWidth: 2,
      },
      {
        type: "line",
        xKey: "anilox",
        yKey: "min",
        yName: "Min",
        stroke: "red",
        strokeWidth: 2,
      }
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
        title: { text: "Density" },
        min: 0,
        max: 4,
      },
    ],
    title: { text: `Anilox Performance by ${ data[0].colour ? data[0].colour[0].toUpperCase() + data[0].colour.slice(1) : 'Undefined'} ` },
    legend: { enabled: true },
  };

  return <AgCharts options={options} />;
};

export default ProcessGraphData;