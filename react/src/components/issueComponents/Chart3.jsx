import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useFetch from "../../services/UseFetch";
import ChartSkeleton from "../skeleton/ChartSkeleton";

const Chart3 = () => {
  const { data: dataRes, error: dataError, loading: dataLoading, refetch: refetch1 } = useFetch("data");
  const { data: issueRes, error: issueError, loading: issueLoading, refetch: refetch2 } = useFetch("issue");
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    if (!dataLoading && !issueLoading && dataRes && issueRes) {
      const dataGrouped = dataRes.reduce((acc, item) => {
        const date = new Date(item.timestamp).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
  
      const issueGrouped = issueRes.reduce((acc, item) => {
        const date = new Date(item.timestamp).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
  
      const allDates = Array.from(new Set([...Object.keys(dataGrouped), ...Object.keys(issueGrouped)])).sort();
  
      const dataSeries = allDates.map((date) => dataGrouped[date] || 0);
      const issueSeries = allDates.map((date) => issueGrouped[date] || 0);
  
      setChartData({
        series: [
          {
            name: "Data API",
            type: "column",
            data: dataSeries,
          },
          {
            name: "Issue API",
            type: "line",
            data: issueSeries,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
          },
          stroke: {
            width: [0, 4],
          },
          title: {
            text: "Traffic Sources",
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          labels: allDates,
          yaxis: [
            {
              title: {
                text: "Data API",
              },
            },
            {
              opposite: true,
              title: {
                text: "Issue API",
              },
            },
          ],
        },
      });
    }
  }, [dataRes, issueRes, dataLoading, issueLoading]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      refetch1();
      refetch2();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch1, refetch2]);

  if (dataLoading || issueLoading) return <ChartSkeleton />;
  if (dataError || issueError) return <p>Error: {dataError || issueError}</p>;

  return (
    <div className="w-full p-4">
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default Chart3;
