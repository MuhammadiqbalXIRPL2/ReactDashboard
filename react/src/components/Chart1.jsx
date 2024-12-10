import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useFetch from "../services/UseFetch";

const Chart1 = () => {
  const { data, error, loading, refetch } = useFetch("time");

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    xaxis: {
      categories: [],
      title: {
        text: "Date and Hour",
      },
    },
    yaxis: {
      title: {
        text: "Total Responses",
      },
    },
    title: {
      text: "Total Response Codes per Date and Hour",
      align: "center",
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    series: [],
  });

  useEffect(() => {
    if (data && data.datesAndHours && data.chartData) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: data.datesAndHours,
        },
        series: data.chartData.map((item) => ({
          name: item.name,
          data: item.data,
        })),
      }));
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 20000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card shadow w-full">
      <div className="card-body">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default Chart1;
