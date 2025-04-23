import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { FaFilter } from "react-icons/fa6";
import { TableColumn } from "react-data-table-component";
import { useTheme } from "~/context/theme-provider";
import { useEffect, useState } from "react";
import { cn } from "~/utils/helpers";
import { DashboardArea } from "~/layouts/DashboardArea";
import InDataTable from "~/components/table/InDataTable";
import { ContactModal } from "~/components/Modal/ContactModal";
import ActionMenu from "~/components/table/ActionMenu";
import { CourseServices } from "~/api/course";
import { fetchlistCourses, fetchSystemUser } from "~/api/course/hooks";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import moment from "moment";

interface MerchantTableRow {
  id: number;
  avatar: string;
  sn: number;
  userid: number;
  course_title: string;
  next_payment_date: string;
  payment_fee: number;
  payment_on: string;
  payment_status: number;
}

const PaymentPlan = () => {
  const { theme } = useTheme();
  const [tableData, setTableData] = useState<MerchantTableRow[]>([]);
  const { data: courseList } = fetchlistCourses();
  const { data: systemUsers } = fetchSystemUser();
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [userOptions, setUserOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [, setSelectedOption] = useState<CourseOption | null>(null);
  interface CourseOption {
    label: string;
    value: number;
  }

  const [options, setOptions] = useState<CourseOption[]>([]);
  const [isContact, setIscontact] = useState({
    status: false,
    id: 0,
  });

  useEffect(() => {
    if (courseList?.course_details.length) {
      interface CourseOption {
        label: string;
        value: number;
      }
      const formattedOptions: CourseOption[] = courseList?.course_details.map(
        (course: { course_title: string; coursesid: number }) => ({
          label: course.course_title,
          value: course.coursesid,
        })
      );
      setOptions(formattedOptions);
      setSelectedCourseId(formattedOptions[0].value);
      setSelectedOption(formattedOptions[0]);
    }
  }, [courseList]);

  useEffect(() => {
    if (systemUsers?.data.length) {
      const formattedUsers = systemUsers.data.map(
        (user: { userid: number; firstname: string; lastname: string }) => ({
          label: `${user.firstname} ${user.lastname} `,
          value: user.userid,
        })
      );
      setUserOptions(formattedUsers);
      setSelectedUserId(formattedUsers[0].value); // Optional: set default
    }
  }, [systemUsers]);

  const handleUserSelect = (option: {
    label: string;
    value: number | string;
  }) => {
    setSelectedUserId(Number(option.value));
  };

  const handleSelect = (option: { label: string; value: string | number }) => {
    setSelectedCourseId(Number(option.value));
  };

  const getPaymentPlans = async () => {
    setLoading(true);

    try {
      const payload = {
        userid: Number(selectedUserId),
        // courseid: 22,
        courseid: Number(selectedCourseId),
      };
      const res = await CourseServices.fetchPaymentPlans(payload);
      setTableData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCourseId && selectedUserId) {
      getPaymentPlans();
    }
  }, [selectedCourseId, selectedUserId]);

  const columns: TableColumn<MerchantTableRow>[] = [
    {
      name: "S/N",
      selector: (row: { sn: number }) => row.sn,
      cell: (_row, index: number) => index + 1,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row: { course_title: string }) => row.course_title,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <h2 className="text-[16px] font-normal font-DMSans">
            {row.course_title}
          </h2>
        </div>
      ),
      width: "350px",
    },
    {
      name: "Amount",
      selector: (row: { payment_fee: number }) => row.payment_fee,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-start gap-2 items-center">
          <h2 className="text-[16px] font-normal font-DMSans">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(row.payment_fee)}
          </h2>
        </div>
      ),
    },
    {
      name: "Payment on",
      selector: (row: { payment_on: string }) => row.payment_on,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.payment_on).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Next Payment",
      selector: (row: { next_payment_date: string }) => row.next_payment_date,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          {moment(row.next_payment_date).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Payment Status",
      selector: (row: { payment_status: number }) => row.payment_status,
      sortable: true,
      cell: (row) => (
        <div
          className={cn(
            " w-[80px] flex justify-center p-2 rounded-md items-center",
            row.payment_status === 1 ? "bg-green-300/30" : "bg-red-300/30"
          )}
        >
          <h2
            className={cn(
              "text-sm font-semibold font-DMSans",
              row.payment_status === 1 ? "text-green-600" : "text-red-600"
            )}
          >
            {row.payment_status === 1 ? "Paid" : "Not Paid"}
          </h2>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            {
              label: "Contact student",
              action: () =>
                setIscontact({
                  status: true,
                  id: row.id,
                }),
            },
            // {
            //   label: "Transcript ",
            //   action: () =>
            //     setIscontact({
            //       status: true,
            //       id: row.id,
            //     }),
            // },
          ]}
        />
      ),
      width: "110px",
      ignoreRowClick: true,
    },
  ];

  const handleClose = () => {
    setIscontact({
      status: false,
      id: 0,
    });
  };

  return (
    <DashboardArea>
      {" "}
      <div>
        <div className="my-4">
          <h2 className="font-DMSans font-semibold text-[20px]">
            Students Payment Plan
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center">
          <div className="w-full lg:w-[50%] gap-4 flex justify-start items-center mb-6">
            <SelectionDropdown
              options={options}
              // value={selectedOption}
              placeholder="Select Program"
              onSelect={handleSelect}
            />
            <SelectionDropdown
              options={userOptions}
              placeholder="Select User"
              onSelect={handleUserSelect}
            />
          </div>
          <button
            className={cn(
              "w-full lg:w-[350px] flex justify-between items-center rounded-md p-2 border-[0.5px] border-[#ddd] py-2 mb-6",
              theme === "dark" ? "bg-[#333]" : "bg-white"
            )}
          >
            <p>Search</p>
            <FaFilter className="text-[30px]" />
          </button>
        </div>
      </div>
      <div className="w-full pb-4 flex justify-center items-center bg-[#fff]">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-[99%]">
            <InDataTable<MerchantTableRow>
              columns={columns}
              data={tableData}
              paginatable={false}
              searchable={false}
              // pagination={false}
            />
          </div>
        )}
        <ContactModal
          isOpen={isContact.status}
          id={isContact.id}
          closeModal={handleClose}
        />
      </div>
    </DashboardArea>
  );
};

export default PaymentPlan;
