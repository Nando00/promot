"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Datepicker({}) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
    <DatePicker
      selected={startDate}
      showTimeSelect
      inline
      timeFormat="p"
      timeIntervals={30}
      dateFormat="Pp"
      onChange={(date) => setStartDate(date)}
    />
  );
}
