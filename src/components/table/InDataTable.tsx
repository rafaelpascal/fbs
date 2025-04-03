import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../styles/CustomStyles";
import { LoadingSpinner } from "../ui/loading-spinner";
import { FilterModal } from "../Modal/FilterModal";
import { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import { TbFileExport, TbSearch } from "react-icons/tb";

type DynamicObject = {
  [key: string]: ANY;
};

interface InDataTableProps<T> {
  title?: string;
  paginatable: boolean;
  searchable: boolean;
  columns: TableColumn<T>[];
  data: T[];
  filters?: DynamicObject;
  children?: React.ReactNode;
  isFilterable?: boolean;
  pointerOnHover?: boolean;
  isRowSelectable?: boolean;
  loading?: boolean;
  isExport?: boolean;
  selectedRows?: T[];
}

const InDataTable = <T extends object>({
  title,
  columns,
  data,
  children,
  isFilterable,
  searchable,
  isRowSelectable,
  pointerOnHover,
  filters = {},
  isExport = false,
  selectedRows = [],
}: InDataTableProps<T>) => {
  const [filteredData, setFilteredData] = useState(data);
  const [totalRows, setTotalRows] = useState(data.length);
  const [, setPerPage] = useState(10);
  const [, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [, setSelectedRowsState] = useState(selectedRows);
  const [isSearchingActive, setisSearchingActive] = useState(false);

  useEffect(() => {
    let filtered = data;

    // Filter based on search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((item) =>
          String(item[key as keyof T] ?? "").includes(String(value))
        );
      }
    });

    setFilteredData(filtered);
    setTotalRows(filtered.length);
  }, [data, filters, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  // handle Search Query Change
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setisSearchingActive(true);
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleExport = () => {
    console.log("Selected Rows:");
  };

  const handleSelectedRowsChange = (state: { selectedRows: T[] }) => {
    setSelectedRowsState(state.selectedRows);
  };

  const applyFilters = () => {
    setFilterOpen(false);
  };

  const clearFilters = () => {
    // Reset filters to an empty object or initial values
    setFilterOpen(false);
  };

  const customLoader = (
    <div className="grid h-full place-items-center">
      <LoadingSpinner />
    </div>
  );

  return (
    // skipcq: JS-0415
    <div className="z-10">
      <div className="relative flex justify-between gap-2 pr-2 mb-3">
        {title && (
          <h2 className="text-[16px] w-full mx-4 font-DMSans font-bold">
            {title}
          </h2>
        )}

        <div className="flex justify-between">
          <div className="flex items-center justify-end w-full gap-3">
            {searchable && (
              <form
                method="get"
                className="w-[224px] relative flex justify-between items-center border-[1px] border-[#E5E4E4] rounded-[5px] h-[35px]"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Search"
                  className="h-full w-[200px] font-DMSans  text-[#A7A7A7] text-[12px] font-normal rounded-l-[5px] outline-none px-3"
                />
                {isSearchingActive && (
                  <button
                    type="submit"
                    className="bg-[#FF3B30] h-full w-[35px] flex justify-center items-center rounded-e-md"
                  >
                    <TbSearch className="text-[#fff] text-[20px]" />
                  </button>
                )}
              </form>
            )}

            {isFilterable && (
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="border-[1px] rounded-[4px] py-2 bg-slate-200 border-slate-500 flex justify-center items-center px-3 gap-1.5"
              >
                <IoFilter className="text-[#000] text-[18px]" />
                <span className="text-[12px] font-semibold text-[#03435F] font-DMSans">
                  Filter
                </span>
              </button>
            )}

            <FilterModal
              isOpen={filterOpen}
              closeModal={() => setFilterOpen(!filterOpen)}
            >
              <div className="flex items-center justify-between mt-1 mb-3">
                <h4 className="text-xl font-semibold">Filters</h4>
              </div>

              <div>{children}</div>

              <div className="flex items-center justify-between w-full mt-4">
                <button
                  className="w-1/3 py-2 text-white rounded bg-greyColor-300"
                  onClick={clearFilters}
                >
                  Clear
                </button>

                <button
                  onClick={applyFilters}
                  className="w-[98px] h-[33px] rounded-[4px] bg-[#FF3B30]"
                >
                  <p className="text-[#fff] text-[12px] font-semibold font-DMSans">
                    Apply Filters
                  </p>
                </button>
              </div>
            </FilterModal>
          </div>

          {isExport && (
            <div className="flex items-center justify-start w-full mx-4">
              <button
                onClick={handleExport}
                className="w-[95px] flex justify-center items-center gap-2 bg-[#03435F] py-2 rounded-[4px] "
              >
                <TbFileExport className="text-[20px] text-[#C4C4C4]" />
                <span className="text-[12px] font-semibold text-[#C4C4C4] font-DMSans">
                  Export
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        progressPending={false}
        pagination
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        customStyles={customStyles}
        progressComponent={customLoader}
        onSelectedRowsChange={handleSelectedRowsChange}
        pointerOnHover={pointerOnHover}
        selectableRows={isRowSelectable}
      />
    </div>
  );
};

export default InDataTable;
