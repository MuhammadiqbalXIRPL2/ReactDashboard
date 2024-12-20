import React, { useState } from "react";
import IssueTable from "../components/issueComponents/IssueTable";
import CalendarPicker from "../components/issueComponents/Calendar";
import Chart3 from "../components/issueComponents/Chart3";

const IssuePage = () => {
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex justify-center rounded bg-gray-50 h-[31rem] w-3/4 shadow">
              <IssueTable startDate={startDate} endDate={endDate} />
            </div>
            <div className="flex justify-center rounded h-auto shadow">
              <CalendarPicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 shadow-xl">
            <Chart3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
