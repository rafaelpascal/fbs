import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../styles/CustomStyles";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useCallback, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TbFileExport, TbSearch } from "react-icons/tb";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Api } from "~/utils/axios";
import { FilterModal } from "../Modal/FilterModal";
import { cn } from "~/utils/helpers";
import { useTheme } from "~/context/theme-provider";

type DynamicObject = {
  [key: string]: unknown;
};

interface ApiTableProps<T> {
  title?: string;
  paginatable: boolean;
  columns: TableColumn<T>[];
  apiUrl?: string;
  filters?: DynamicObject;
  children?: React.ReactNode;
  isFilterable?: boolean;
  pointerOnHover?: boolean;
  isRowSelectable?: boolean;
  loading?: boolean;
  isExport?: boolean;
  isFlagged?: boolean;
  onRowSelected?: ({ selectedRows }: { selectedRows: T[] }) => void;
  moreButtons?: React.ReactNode;
  header?: React.ReactNode;
  reload?: boolean;
}

const ApiTable = <T extends object>({
  title = "Table records",
  columns,
  apiUrl,
  children,
  isFilterable,
  isRowSelectable,
  pointerOnHover,
  filters = {},
  isExport = false,
  onRowSelected,
  moreButtons,
  reload,
}: ApiTableProps<T>) => {
  const { theme } = useTheme();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isSearchingActive, setIsSearchingActive] = useState(false);
  // const [, setSelectedRowsState] = useState(selectedRows);
  const [previousFilters, setPreviousFilters] =
    useState<DynamicObject>(filters);

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);

      let url = `${apiUrl}?page=${page}&pageSize=${perPage}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      // Append filters to the URL
      if (Object.keys(filters).length > 0) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            url += `&${encodeURIComponent(key)}=${encodeURIComponent(
              value as string
            )}`;
          }
        });
      }

      try {
        const response = await Api.get(url);
        console.log(response.data.users);

        if (response.data) {
          setData(response.data);
          // setTotalRows(response.data.totalItems);
        } else {
          setData(response.data.data.users);
          setTotalRows(response.data.data.totalItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, filters, perPage, searchQuery]
  );

  // Run fetchData only once when the component is mounted
  useEffect(() => {
    if (!initialLoadComplete) {
      fetchData(1);
      setInitialLoadComplete(true);
    } else if (reload) {
      fetchData(1);
      setInitialLoadComplete(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, reload]);

  // handle page
  const handlePageChange = (page: number) => {
    if (initialLoadComplete) {
      fetchData(page);
    }
  };

  const handlePerRowsChange = useCallback(
    async (newPerPage: number, page: number) => {
      if (initialLoadComplete) {
        setLoading(true);
        try {
          const response = await Api.get(
            `${apiUrl}?page=${page}&pageSize=${newPerPage}`
          );
          setData(response.data.data);
          setPerPage(newPerPage);
        } finally {
          setLoading(false);
        }
      }
    },
    [apiUrl, initialLoadComplete]
  );

  // Handle sort
  const handleSort = async (column: TableColumn<T>, sortDirection: string) => {
    if (!initialLoadComplete) return;

    let url = `${apiUrl}?page=1&pageSize=${perPage}&sort=${column.sortField}|${sortDirection}`;
    if (searchQuery) url = `${url}&search=${encodeURIComponent(searchQuery)}`;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        url += `&${encodeURIComponent(key)}=${encodeURIComponent(
          value as string
        )}`;
      }
    });

    const response = await Api.get(url);
    setData(response.data.data.items);
  };

  // Search data
  const searchData = (event: React.FormEvent) => {
    event.preventDefault();
    fetchData(1);
  };

  // handle Search Query Change
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsSearchingActive(true);
    const query = event.target.value;
    setSearchQuery(query);
  };

  // const handleSearch = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   filterData(searchQuery);
  // };
  // const filterData = (query: string) => {
  //   const lowercasedQuery = query.toLowerCase();
  //   const newData = data.filter((item) => {
  //     return Object.values(item).some((value) =>
  //       String(value).toLowerCase().includes(lowercasedQuery)
  //     );
  //   });
  //   setData(newData);
  // };

  const handleExport = () => {
    const doc = new jsPDF() as ANY;
    doc.text(title || "Table Export", 20, 10);
    const new_columns = columns.map((col: ANY) => col.name);

    const rows = data.map((item) =>
      columns.map((col) => {
        if (typeof col.selector === "function") {
          return col.selector(item);
        }
        return String(item[col.name as keyof T] || "");
      })
    );
    doc.autoTable({
      head: [new_columns],
      body: rows,
    });
    doc.save(`${title || "table-export"}.pdf`);
  };

  const applyFilters = useCallback(() => {
    const filtersChanged = Object.keys(filters).some((key) => {
      return filters[key] !== previousFilters[key];
    });

    if (filtersChanged) {
      fetchData(1);
      setPreviousFilters({ ...filters });
      setFilterOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, previousFilters]);

  const clearFilters = useCallback(() => {
    // Reset filters to an empty object or initial values
    Object.keys(filters).forEach((key) => {
      filters[key] = null;
    });

    // Reset previous filters
    setPreviousFilters(filters);

    fetchData(1); // Refetch data with new filters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const customLoader = (
    <div className="grid h-[200px] place-items-center">
      <LoadingSpinner />
    </div>
  );

  return (
    // skipcq: JS-0415
    <div
      className={cn("z-10 px-4", theme === "dark" ? "bg-[#333]" : "bg-[#fff]")}
    >
      <div className="relative w-full justify-between flex-col lg:flex-row items-center gap-2 mb-3">
        {title && (
          <h2 className="text-[16px] w-2/5 mx-4 text-[#4F4F4F] font-CircularStd font-bold">
            {title}
          </h2>
        )}

        <div className="flex items-center justify-end w-full gap-3">
          <form
            method="get"
            onSubmit={searchData}
            className="w-[224px] relative flex justify-between items-center border-[1px] border-[#E5E4E4] rounded-[5px] h-[35px] bg-white"
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
                onClick={searchData}
                className="bg-[#03435F] h-full w-[35px] flex justify-center items-center rounded-e-md"
              >
                <TbSearch className="text-[#fff] text-[20px]" />
              </button>
            )}
          </form>

          {isFilterable && (
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="border-[1px] rounded-[4px] py-2 bg-slate-200 border-slate-500 flex justify-center items-center px-3 gap-1.5"
            >
              <IoFilter className="text-[#000] text-[18px]" />
              <span className="text-[12px] font-semibold text-[#03435F] font-DMSans">
                Filters
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
                onClick={() => clearFilters()}
              >
                Clear
              </button>

              <button
                onClick={applyFilters}
                className="w-[98px] h-[33px] rounded-[4px] bg-[#03435F]"
              >
                <p className="text-[#fff] text-[12px] font-semibold font-DMSans">
                  Apply Filters
                </p>
              </button>
            </div>
          </FilterModal>

          {isExport && (
            <div className="flex items-center justify-end mx-4">
              <button
                onClick={handleExport}
                className="flex justify-center items-center gap-2 bg-[#03435F] py-2 px-3 rounded-[4px] "
              >
                <TbFileExport className="text-[20px] text-[#C4C4C4]" />
                <span className="text-[12px] font-semibold text-[#C4C4C4] font-DMSans">
                  Export
                </span>
              </button>
            </div>
          )}

          {moreButtons && (
            <div className="flex justify-between">{moreButtons}</div>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        sortServer
        paginationTotalRows={totalRows}
        onSort={handleSort}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        customStyles={customStyles}
        progressComponent={customLoader}
        onSelectedRowsChange={onRowSelected}
        pointerOnHover={pointerOnHover}
        selectableRows={isRowSelectable}
      />
    </div>
  );
};

export default ApiTable;
