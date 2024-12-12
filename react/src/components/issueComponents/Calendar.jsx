import React, { useState } from "react";
import { DateRange, DateRangePicker, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarPicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const handleSelect = (ranges) => {
    console.log("ranges:", ranges);
    if (ranges && ranges.selection) {
      console.log("ranges2:", ranges.selection);

      setStartDate(ranges.selection.startDate);
      setEndDate(ranges.selection.endDate);
    }
  };
  return (
    <section className="">
      <DateRange
        ranges={[{ startDate, endDate, key: "selection" }]}
        onChange={handleSelect}
        minDate={new Date('2024-01-01')}
        maxDate={new Date('2025-12-31')}
      />
      <div className="flex gap-4 p-2 text-black font-semibold">

      <p>start : {startDate.toLocaleDateString()}</p>
      <p>end : {endDate.toLocaleDateString()}</p>
      </div>
    </section>
  );
};

export default CalendarPicker;
