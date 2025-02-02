import { AgCharts } from "ag-charts-react";
import { useState } from "react";
import style from './anilox_scatter.module.css';

const AniloxScatterChart = ({ data }) => {
  const [selectedAnilox, setSelectedAnilox] = useState(null);

  const uniqueAniloxTypes = [
    ...new Set(data.map((item) => item.anilox)),
  ];

  const filteredData = selectedAnilox
    ? data.filter((item) => item.anilox === selectedAnilox)
    : data;

  // Conditionally include trendline series based on selected anilox type
  const trendlineSeries = selectedAnilox ? [
    {
      type: "line",
      xKey: "date",
      yKey: "trendline",
      title: "Trend Line",
      stroke: "#ff6b6b",
      strokeWidth: 2,
      marker: { enabled: false },
    }
  ] : [];

  const options = {
    height: 500,
    data: filteredData,
    series: [
      {
        type: "scatter",
        xKey: "date",
        yKey: "de",
        title: "DE Values",
        marker: {
          size: 6,
          fill: "rgba(61, 133, 198, 0.7)",
          stroke: "#3d85c6",
        },
      },
      ...trendlineSeries, // Include trendline if selectedAnilox is set
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Date" },
        label: { rotation: 45 },
      },
      {
        type: "number",
        position: "left",
        title: { text: "DE Value" },
        min: 0,
        max: 5,
      },
    ],
    title: {
      text: selectedAnilox
        ? `DE Values Over Time for Anilox ${selectedAnilox}`
        : "DE Values Over Time by Anilox Type",
    },
    legend: { enabled: true },
    tooltip: {
      enabled: true,
      format: "Date: {x}, DE: {y}",
    },
  };

  return (
    <div className={style.aniloxScatterContainer}>
      <div className={style.aniloxTypeContainer}>
        <h3>Select Anilox Type:</h3>
        <div className={style.aniloxTypeSelection}>
          {uniqueAniloxTypes.map((anilox) => (
            <button
              key={anilox}
              onClick={() => setSelectedAnilox(anilox)}
              style={{
                cursor: "pointer",
                marginLeft: "5px",
                backgroundColor: selectedAnilox === anilox ? "#333" : "white",
                color: selectedAnilox === anilox ? "white" : "#333",
              }}
            >
              {anilox}
            </button>
          ))}
          <button
            onClick={() => setSelectedAnilox(null)}
            style={{
              cursor: "pointer",
              marginLeft: "5px",
              backgroundColor: selectedAnilox === null ? "#333" : "white",
              color: selectedAnilox === null ? "white" : "#333",
            }}
          >
            All
          </button>
        </div>
      </div>
      <AgCharts options={options} />
    </div>
  );
};

export default AniloxScatterChart;
