import React, { useState } from "react";

function Dashboard() {
  const numbers = ["satu", "dua", "tiga"];
  return (
    <>
      <div className="p-4 sm:ml-8 mt-10">
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {numbers.map((number) => (
              <div className="flex items-center justify-center h-24 rounded custom-bg">
                <p className="text-2xl text-white dark:text-white">{number}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-white-800 mt-6 border-2">
            <p className="">

            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
