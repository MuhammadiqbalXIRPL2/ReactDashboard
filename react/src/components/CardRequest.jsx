import React, { useState, useEffect } from "react";
import useFetch from "../services/UseFetch";
import { FaExchangeAlt } from "react-icons/fa";
const CardRequest = () => {
  const { data, error, loading, refetch } = useFetch("request");

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) return <p>...Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full shadow-xl p-4">
        <h1 className="text-3xl font-bold">Recent Request</h1>
      <div className="flex gap-4 p-3">
        <div className="flex flex-col justify-center">
        <FaExchangeAlt className="w-14 h-14 text-blue-400"/>
        </div>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col text-center">
            <h2 className="text-xl font-semibold">{item.date}</h2>
            <h2 className="text-xl font-semibold">{item.transaction_count}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardRequest;
