import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Avatar } from "~/components/dashboard/Avatar";
import moment from "moment";
import { Status } from "~/components/ui/Badge";
import { statColorCode } from "~/utils/helpers";
import InDataTable from "~/components/table/InDataTable";
// import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PaymentData } from "~/types/payment";
import { CourseServices } from "~/api/course";
interface PaymentTableRow {
  application_id: number;
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );

  const UpdateManualPayment = async (applicationId: number) => {
    try {
      if (applicationId) {
        const payload = {
          application_id: applicationId,
        };
        const res = await CourseServices.updateManualPayment(payload);
        if (res.data && res.data.data && res.data.data.length > 0) {
          console.log(res.data);
        }
      } else {
        console.log("No application Id Set");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  // Transform received data to match the expected table structure
  const formattedData: PaymentTableRow[] = data.map((item, index) => ({
    application_id: item.application_id,
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
          {row.paymentMode === "Manual Payment" && (
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() =>
                setOpenMenuId(openMenuId === row.id ? null : row.id)
              }
            >
              <BsThreeDotsVertical className="h-5 w-5 text-gray-600" />
            </button>
          )}

          {openMenuId === row.id && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpenMenuId(null)}
              />

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                <button
                  onClick={() => {
                    setSelectedPaymentId(row.application_id);

                    setShowConfirmModal(true);
                    setOpenMenuId(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    console.log("Download Receipt", row.id);
                    setSelectedPaymentId(row.application_id);
                    setShowRejectModal(true);
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
    <>
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
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
            <p className="mb-6">
              Are you sure you want to reject this payment?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedPaymentId(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                No
              </button>
              <button
                onClick={() => {
                  if (selectedPaymentId) {
                    UpdateManualPayment(selectedPaymentId);
                  }
                  setShowRejectModal(false);
                  setSelectedPaymentId(null);
                }}
                className="px-4 py-2 bg-bl bg-[#FF3B30] text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
            <p className="mb-6">
              Are you sure you want to confirm this payment?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedPaymentId(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                No
              </button>
              <button
                onClick={() => {
                  if (selectedPaymentId) {
                    UpdateManualPayment(selectedPaymentId);
                  }
                  setShowConfirmModal(false);
                  setSelectedPaymentId(null);
                }}
                className="px-4 py-2 bg-[#FF3B30] text-white rounded hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnlinePaymentsTable;
