import React, { useEffect } from "react";
import useFetch from "../../services/UseFetch";
import CardSkeleton from "../skeleton/CardSkeleton";

const Card = ({ endpoint, labels, series }) => {
  const { data, error, loading, refetch } = useFetch(endpoint);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) return <CardSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="p-4 w-full">
      <div className="flex gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-2 text-center">
            <h1 className="text-lg font-semibold">{item[labels]}</h1>
            <h1 className="text-3xl font-bold">{item[series]}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card;
