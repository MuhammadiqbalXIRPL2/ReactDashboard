import React, { useEffect, useState } from "react";
import Table from "../components/dashboardComponents/table";
import AutoInsertWithInterval from "../test/AutoInsert";
import Chart1 from "../components/dashboardComponents/Chart1";
import Chart2 from "../components/dashboardComponents/Chart2";
import Card from "../components/dashboardComponents/Card";
import useFetch from "../services/UseFetch";

function Dashboard() {
  const { data, error, loading, refetch } = useFetch("weekly");
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex gap-4 mb-4">
            <div className="w-5/12 items-center justify-center rounded shadow">
              <h1 className="text-3xl font-bold px-4 pt-4">Transaction Type</h1>
              <Card endpoint="type" labels="type_transaksi" series="total" />
            </div>
            <div className="w-5/12 items-center justify-center rounded shadow">
              <h1 className="text-3xl font-bold px-4 pt-4">
                Total Request/day
              </h1>
              <Card
                endpoint="request"
                labels="date"
                series="transaction_count"
              />
            </div>
            <div className="flex w-2/12 items-center justify-center rounded shadow">
              <div className="p-4 w-full">
                <div className="flex gap-4">
                  <div className="flex p-3 ">
                    <h1 className="text-2xl font-bold px-4 pt-4">
                      Total weekly request
                    </h1>
                    <h1 className="text-3xl font-bold">{data}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex items-center justify-center w-2/3 h-auto rounded shadow">
              <Chart1 />
            </div>
            <div className="flex w-1/3 items-center justify-center rounded shadow">
              <Chart2 />
            </div>
          </div>
          <div className="flex items-center w-full justify-center mb-4 rounded shadow-lg">
            <Table />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-auto dark:bg-gray-800">
              <AutoInsertWithInterval />
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
