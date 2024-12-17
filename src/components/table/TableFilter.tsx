import { ChangeEvent } from "react";
import DateFilter from "./DateFilter";

interface TableFilterProps {
  handleDateChange: (dateFrom: string, dateTo: string) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filters: {
    status: string;
    dateFrom: string;
    dateTo: string;
    minAmount?: string;
    maxAmount?: string;
  };
  showAmountFilter?: boolean;
}

// TableFilter
const TableFilter = ({
  handleDateChange,
  handleInputChange,
  filters,
  showAmountFilter = false,
}: TableFilterProps) => {
  return (
    <div className="w-full">
      {showAmountFilter && (
        <div className="w-full mb-2 flex justify-between gap-3 items-end">
          {/* Min Amount Input */}
          <div className="flex flex-col w-[50%] justify-start items-start">
            <label
              htmlFor="minAmount"
              className="text-[14px] font-CircularStd font-semibold text-[#8F94A8]"
            >
              Min Amount
            </label>
            <input
              type="number"
              name="minAmount"
              id="minAmount"
              placeholder="Min Amount"
              onChange={handleInputChange}
              value={filters.minAmount || ""}
              className="text-[14px] font-CircularStd w-full font-semibold text-[#8F94A8] h-[40px] bg-[#F4F5F8] px-2 outline-none border-[1px] border-[#E6E6E6] rounded-[4px]"
            />
          </div>

          {/* Max Amount Input */}
          <div className="flex flex-col w-[50%] justify-start items-start">
            <label
              htmlFor="maxAmount"
              className="text-[14px] font-CircularStd font-semibold text-[#8F94A8]"
            >
              Max Amount
            </label>
            <input
              type="number"
              name="maxAmount"
              id="maxAmount"
              placeholder="Max Amount"
              onChange={handleInputChange}
              value={filters.maxAmount || ""}
              className="text-[14px] font-CircularStd w-full font-semibold text-[#8F94A8] h-[40px] bg-[#F4F5F8] px-2 outline-none border-[1px] border-[#E6E6E6] rounded-[4px]"
            />
          </div>
        </div>
      )}
      <DateFilter onDateChange={handleDateChange} />

      <select
        name="status"
        id="status"
        onChange={handleInputChange}
        value={filters.status || ""}
        className="outline-none px-2 mt-4 py-1 text-[14px] font-CircularStd font-semibold text-[#8F94A8] w-[50%] h-[40px] bg-[#F4F5F8] border-[1px] border-[#E6E6E6] rounded-[4px]"
      >
        <option value="" disabled>
          Status
        </option>
        <option value="success">Success</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
    </div>
  );
};

export default TableFilter;
