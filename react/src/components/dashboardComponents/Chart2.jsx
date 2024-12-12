import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useFetch from "../../services/UseFetch";
import ChartSkeleton from "../skeleton/ChartSkeleton";

const Chart2 = () => {
  const { data, error, loading, refetch } = useFetch("realtime");

  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      title: {
        text: "Response Code Distribution",
        align: "center",
      },
    },
  });

  useEffect(() => {
    if (data && data.labels && data.series) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: data.series,
        options: {
          ...prevOptions.options,
          labels: data.labels,
        },
      }));
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) return <ChartSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card w-full">
      <div className="card-body">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};

export default Chart2;
