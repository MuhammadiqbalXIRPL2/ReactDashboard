import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper to generate random data
const generateRandomData = () => {
  const transactionTypes = ["Purchase", "Refund", "Transfer", "Withdrawal"];
  const responseCodes = ["200","200","200","200","200","200","200","200", "201", "400", "404", "500"];
  const randomMessage = [
    "Transaction successful",
    "Transaction successful",
    "Transaction successful",
    "Transaction successful",
    "Transaction successful",
    "Transaction successful",
    "Transaction successful",
    "Transaction failed",
    "Pending confirmation",
    "Invalid request",
    "Completed with warnings",
  ];

  return {
    type_transaksi: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
    response_code: responseCodes[Math.floor(Math.random() * responseCodes.length)],
    url: `https://example.com/transaction/${Math.floor(Math.random() * 1000)}`,
    response_message: randomMessage[Math.floor(Math.random() * randomMessage.length)],
  };
};

const AutoInsertWithInterval = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [intervalMinutes, setIntervalMinutes] = useState(1); // Default interval: 1 minute
  const [isAutoInsertRunning, setIsAutoInsertRunning] = useState(false); // Auto-insert status
  const intervalMs = intervalMinutes * 60 * 1000; // Convert minutes to milliseconds

  // Function to send random dummy data to the API
  const autoInsertData = async () => {
    try {
      const dummyData = generateRandomData();

      const response = await axios.post("http://localhost:8000/api/store", dummyData);
      console.log("Data Inserted:", response.data);

      // Add new data to the state
      setData((prevData) => [...prevData, dummyData]);
    } catch (err) {
      console.error("Error inserting data:", err);
      setError("Failed to insert data. Please check your API.");
    }
  };

  // Effect to handle auto-insert at intervals
  useEffect(() => {
    let intervalId;

    if (isAutoInsertRunning) {
      intervalId = setInterval(() => {
        autoInsertData();
      }, intervalMs);
    }

    // Clear interval when the component unmounts or when auto-insert stops
    return () => clearInterval(intervalId);
  }, [isAutoInsertRunning, intervalMs]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Auto Insert with Random Data</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Interval Selector */}
      <div className="mb-4 flex space-x-4">
        <label>
          <span className="text-sm font-medium">Set Interval (minutes):</span>
          <select
            value={intervalMinutes}
            onChange={(e) => setIntervalMinutes(Number(e.target.value))}
            className="ml-2 px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 Minute</option>
            <option value={2}>2 Minutes</option>
            <option value={3}>3 Minutes</option>
          </select>
        </label>
      </div>

      {/* Start/Stop Auto Insert */}
      <div className="mb-6">
        <button
          onClick={() => setIsAutoInsertRunning(!isAutoInsertRunning)}
          className={`px-4 py-2 rounded shadow ${
            isAutoInsertRunning
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isAutoInsertRunning ? "Stop Auto Insert" : "Start Auto Insert"}
        </button>
      </div>

      {/* Display Inserted Data */}
      <ul className="bg-white w-full max-w-md rounded shadow p-4">
        {data.map((item, index) => (
          <li key={index} className="border-b last:border-0 px-2 py-2">
            <p>
              <strong>Type:</strong> {item.type_transaksi}
            </p>
            <p>
              <strong>Response Code:</strong> {item.response_code}
            </p>
            <p>
              <strong>URL:</strong> {item.url}
            </p>
            <p>
              <strong>Message:</strong> {item.response_message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoInsertWithInterval;
