import { TableColumn } from "react-data-table-component";
import { Avatar } from "~/components/dashboard/Avatar";
import moment from "moment";
import { Status } from "~/components/ui/Badge";
import { statColorCode } from "~/utils/helpers";
import InDataTable from "~/components/table/InDataTable";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PaymentData } from "~/types/payment";

interface PaymentTableRow {
  id: string;
  fullname: string;
  amountPaid: string;
  avatar: string;
  sn: number;
  paymentStatus: string;
  courseTitle: string;
  datePaid: string;
  bankInfo: string;
  paymentMode: string;
  balance: string;
  phone_number: string;
}

interface OnlinePaymentsTableProps {
  data?: PaymentData[]; // Ensure it's optional to avoid undefined issues
}

const OnlinePaymentsTable: React.FC<OnlinePaymentsTableProps> = ({
  data = [],
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Transform received data to match the expected table structure
  const formattedData: PaymentTableRow[] = data.map((item, index) => ({
    id: item.payment_id.toString(),
    fullname: item.fullname,
    sn: index + 1,
    avatar: "",
    amountPaid: `₦${item.amountPaid.toLocaleString()}`,
    paymentStatus: item.paymentStatus,
    courseTitle: item.courseTitle,
    balance: item.balance.toString(),
    datePaid: item.datePaid
      ? moment(item.datePaid).format("MM/DD/YYYY")
      : "N/A",
    bankInfo: item.bankInfo,
    paymentMode: item.paymentMode,
    phone_number: item.phone_number,
  }));

  const columns: TableColumn<PaymentTableRow>[] = [
    {
      name: "S/N",
      selector: (row) => row.sn,
      sortable: false,
      width: "60px",
    },
    {
      name: "Full name",
      selector: (row) => row.fullname,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <Avatar
            img={row.avatar ?? ""}
            name={row.fullname}
            avatarClassName="md:h-8 h-8 w-8 md:w-8 rounded-full"
            textClassName="font-medium text-sm max-md:hidden"
            wrapperClassName="max-md:gap-0"
          />
          <h2 className="text-[12px] font-semibold font-CircularStd text-[#515F76]">
            {row.fullname}
          </h2>
        </div>
      ),
    },
    {
      name: "Program",
      selector: (row) => row.courseTitle,
      sortable: true,
    },
    {
      name: "Paid",
      selector: (row) => row.amountPaid,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.paymentMode,
      sortable: true,
    },
    {
      name: "Bank Info",
      selector: (row) => row.bankInfo,
      sortable: false,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
      sortable: false,
    },
    {
      name: "Date Paid",
      selector: (row) => row.datePaid,
    },
    {
      name: "Status",
      selector: (row) => row.paymentStatus,
      cell: (row) => (
        <Status
          status={statColorCode(
            row.paymentStatus === "Paid" ? "successful" : "failed"
          )}
          text={row.paymentStatus}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="relative">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
          >
            <BsThreeDotsVertical className="h-5 w-5 text-gray-600" />
          </button>

          {openMenuId === row.id && (
            <>
              {/* Overlay to close menu when clicked outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpenMenuId(null)}
              />

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                <button
                  onClick={() => {
                    console.log("View Details", row.id);
                    setOpenMenuId(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    console.log("Download Receipt", row.id);
                    setOpenMenuId(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Reject
                </button>
              </div>
            </>
          )}
        </div>
      ),
      width: "80px",
      sortable: false,
    },
  ];

  return (
    <div className="w-full pb-4 flex justify-center items-center bg-[#fff]">
      <div className="w-[99%]">
        <InDataTable<PaymentTableRow>
          columns={columns}
          data={formattedData}
          paginatable={false}
          searchable={false}
        />
      </div>
    </div>
  );
};

export default OnlinePaymentsTable;
