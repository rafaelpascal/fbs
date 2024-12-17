import React, { useState, useEffect } from "react";

interface DateFilterProps {
  onDateChange?: (dateFrom: string, dateTo: string) => void; // Optional callback to inform parent of changes
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateChange }) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    if (onDateChange) {
      onDateChange(dateFrom, dateTo);
    }
  }, [dateFrom, dateTo, onDateChange]);

  return (
    <div className="w-full mt-2 flex justify-between gap-3 items-end">
      <div className="flex flex-col w-[50%] justify-start items-start">
        <label
          htmlFor="datefrom"
          className="text-[14px] font-CircularStd font-semibold text-[#8F94A8]"
        >
          Date from
        </label>
        <input
          type="date"
          name="datefrom"
          id="datefrom"
          onChange={(e) => setDateFrom(e.target.value)}
          value={dateFrom}
          className="text-[14px] font-CircularStd w-full font-semibold text-[#8F94A8] h-[40px] bg-[#F4F5F8] px-2 outline-none border-[1px] border-[#E6E6E6] rounded-[4px]"
        />
      </div>

      <div className="flex flex-col w-[50%] justify-start items-start">
        <label
          htmlFor="dateTo"
          className="text-[14px] font-CircularStd font-semibold text-[#8F94A8]"
        >
          Date To
        </label>

        <input
          type="date"
          name="dateTo"
          id="dateTo"
          onChange={(e) => setDateTo(e.target.value)}
          value={dateTo}
          className="text-[14px] font-CircularStd w-full font-semibold text-[#8F94A8] h-[40px] bg-[#F4F5F8] px-2 outline-none border-[1px] border-[#E6E6E6] rounded-[4px]"
        />
      </div>
    </div>
  );
};

export default DateFilter;
