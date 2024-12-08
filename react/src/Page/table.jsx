import React from "react";
import useFetch from "../services/UseFetch";

const Table = () => {
  const { data, error, loading } = useFetch("data");

  if (loading) return <p>...Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16 max-w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="custom-bg text-xs text-gray-700 uppercase dark:text-white-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Timestamp
            </th>
            <th scope="col" className="px-6 py-3">
              Response Code
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Type
            </th>
            <th scope="col" className="px-6 py-3">
              URL
            </th>
            <th scope="col" className="px-6 py-3">
              Response Message
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-white-800 dark:border-white-700">
              <td className="px-6 py-4">{item.timestamp}</td>
              <td className="px-6 py-4">{item.response_code}</td>
              <td className="px-6 py-4">{item.type_transaksi}</td>
              <td className="px-6 py-4">
                <a href={item.url} className="text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </td>
              <td className="px-6 py-4">{item.response_message || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
