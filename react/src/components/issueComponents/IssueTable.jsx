import React, { useState, useEffect, useMemo } from "react";
import useFetch from "../../services/UseFetch";
import TableSkeleton from "../skeleton/TableSkeleton";

const IssueTable = ({ startDate, endDate }) => {
  const { data = [], error, loading, refetch } = useFetch("issue");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemDate = new Date(item.timestamp);
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesDateRange = itemDate >= startDate && itemDate <= endDate;
      return matchesSearch && matchesDateRange;
    });
  }, [search, data, startDate, endDate]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) return <TableSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full p-1">
        <input
          type="text"
          className="w-1/3 p-2 mb-4 border border-gray-300 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      <div className="relative overflow-x-auto sm:rounded-lg flex flex-col justify-between">

        <table className="w-full text-sm text-left rtl:text-right text-gray-800">
          <thead className="text-xs text-gray-700 uppercase bg-blue-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Response
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-slate-50 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {item.timestamp}
                  </td>
                  <td className="px-6 py-4 text-sm">{item.response_code}</td>
                  <td className="px-6 py-4 text-sm">{item.type_transaksi}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-medium text-blue-600 dark:text-blue-500">
                      {item.url}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.response_message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center px-6 py-4 text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default IssueTable;
