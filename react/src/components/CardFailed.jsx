import React, { useState, useEffect } from "react";
import useFetch from "../services/UseFetch";
import {FaExclamationCircle} from "react-icons/fa";

const CardFailed = () => {
  const { data, error, loading, refetch } = useFetch("failed");

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) return <p>...Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="p-4 shadow-xl">
        <h1 className="text-3xl font-bold">Issue Transaction</h1>
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center">

      <FaExclamationCircle className="h-14 w-14 text-red-700"/>
        </div>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col p-3 text-center">
            <h1 className="text-xl font-semibold">{item.response_code}</h1>
            <h1 className="text-3xl font-bold">{item.total}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardFailed;
