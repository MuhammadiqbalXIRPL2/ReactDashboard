import React, { useEffect, useState } from "react";
import useFetch from "../../services/UseFetch";
import TableSkeleton from "../skeleton/TableSkeleton";

const Table = () => {
  const { data, error, loading, refetch } = useFetch("data");

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  const totalPages = Math.ceil(data.length / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;
  const currentData = data.slice(startIndex, startIndex + itemPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
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
    <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="custom-bg text-xs text-gray-700 uppercase dark:text-white-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Timestamp
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Response Code
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Transaction Type
            </th>
            <th scope="col" className="px-6 py-3">
              URL
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Response Message
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-white-800 dark:border-white-700"
            >
              <td className="px-6 py-4 text-nowrap">{item.timestamp}</td>
              <td className="px-6 py-4">{item.response_code}</td>
              <td className="px-6 py-4">{item.type_transaksi}</td>
              <td className="px-6 py-4 max-w-md overflow-hidden whitespace-nowrap truncate">
                <a
                  href={item.url}
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </td>
              <td className="px-6 py-4 max-w-sm overflow-hidden whitespace-nowrap truncate">{item.response_message || "-"}</td>
            </tr>
          ))}
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

        <span className="text-sm whitespace-nowrap">
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
  );
};

export default Table;
