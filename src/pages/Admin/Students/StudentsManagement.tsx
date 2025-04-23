import SelectionDropdown from "~/components/Collapsible/SelectionDropdown";
import { FaFilter } from "react-icons/fa6";
import { TableColumn } from "react-data-table-component";
import { useTheme } from "~/context/theme-provider";
import { useEffect, useState } from "react";
import { cn } from "~/utils/helpers";
import { DashboardArea } from "~/layouts/DashboardArea";
import InDataTable from "~/components/table/InDataTable";
import { ContactModal } from "~/components/Modal/ContactModal";
import { LuFileSearch } from "react-icons/lu";
import ActionMenu from "~/components/table/ActionMenu";
import { ViewAssignmentModal } from "~/components/Modal/ViewAssignmentModal";
import { ViewExamModal } from "~/components/Modal/ViewExamModal";
import { ViewCapstoneModal } from "~/components/Modal/ViewCapstoneModal";
import { ViewPollModal } from "~/components/Modal/ViewPollModal";
import { ViewQuizModal } from "~/components/Modal/ViewQuizModal";
import { CourseServices } from "~/api/course";
import { fetchlistCourses } from "~/api/course/hooks";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

interface MerchantTableRow {
  id: number;
  avatar: string;
  sn: number;
  userid: number;
  firstname: string;
  lastname: string;
  totalAssignment: number;
  attemptedAssignment: number;
  totalQuiz: number;
  attemptedQuiz: number;
  totalCapstone: number;
  attemptedCapstone: number;
  totalExam: number;
  attemptedExam: number;
  totalPoll: number;
  attemptedPoll: number;
  score: string;
  status: string;
}

const StudentsManagement = () => {
  const { theme } = useTheme();
  const [tableData, setTableData] = useState<MerchantTableRow[]>([]);
  const { data: courseList } = fetchlistCourses();
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
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
  const [isQuizModal, setIsQuizModal] = useState({
    status: false,
    id: 0,
    student: 0,
  });
  const [isAssignment, setIsAssignment] = useState({
    status: false,
    id: 0,
    student: 0,
  });
  const [isExam, setIsExam] = useState({
    status: false,
    id: 0,
  });
  const [isCapstone, setisCapstone] = useState({
    status: false,
    id: 0,
  });
  const [isPollModal, setIsPollModal] = useState({
    status: false,
    id: 0,
  });

  const getMarkingResources = async () => {
    setLoading(true);
    try {
      const payload = {
        course_id: Number(selectedCourseId),
      };
      const res = await CourseServices.markingResources(payload);
      setTableData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourseId) {
      getMarkingResources();
    }
  }, [selectedCourseId]);

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

  const handleSelect = (option: { label: string; value: string | number }) => {
    setSelectedCourseId(Number(option.value));
  };

  const columns: TableColumn<MerchantTableRow>[] = [
    {
      name: "S/N",
      selector: (row: { sn: number }) => row.sn,
      cell: (_row, index: number) => index + 1,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row: { lastname: string; firstname: string }) => row.lastname,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          <div className="p-2 gap-1 flex justify-between items-center">
            <h2 className="font-DMSans text-[#000] text-[16px] font-semibold">
              {row.lastname} {row.firstname}{" "}
              <span className="text-[#6440FB]">(1 exam, 1 assignment)</span>
            </h2>
          </div>
        </div>
      ),
      width: "350px",
      sortable: true,
    },
    {
      name: "Assignments",
      selector: (row: MerchantTableRow) => row.totalAssignment,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          <div className="p-2 gap-1 flex justify-between items-center">
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.attemptedAssignment}
            </h2>
            <p className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              /
            </p>
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.totalAssignment}
            </h2>
          </div>
          <button
            onClick={() =>
              setIsAssignment({
                status: true,
                id: 30,
                student: row.userid,
              })
            }
            className="flex justify-center items-center gap-3 hover:border hover:border-[#6440FB] rounded-md p-1"
          >
            <p className="text-[#6440FB] font-DMSans text-[16px] font-semibold ">
              View
            </p>
            <LuFileSearch className="text-[#6440FB] size-4" />
          </button>
        </div>
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Exams",
      selector: (row: MerchantTableRow) => row.totalExam,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          <div className="p-2 gap-1 flex justify-between items-center">
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.attemptedExam}
            </h2>
            <p className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              /
            </p>
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.attemptedExam}
            </h2>
          </div>
          <button
            onClick={() =>
              setIsExam({
                status: true,
                id: row.id,
              })
            }
            className="flex justify-center items-center gap-3 hover:border hover:border-[#6440FB] rounded-md p-1"
          >
            <p className="text-[#6440FB] font-DMSans text-[16px] font-semibold ">
              View
            </p>
            <LuFileSearch className="text-[#6440FB] size-4" />
          </button>
        </div>
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Capstones",
      selector: (row: MerchantTableRow) => row.totalCapstone,

      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          <div className="p-2 gap-1 flex justify-between items-center">
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.attemptedCapstone}
            </h2>
            <p className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              /
            </p>
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.totalCapstone}
            </h2>
          </div>
          <button
            onClick={() =>
              setisCapstone({
                status: true,
                id: row.id,
              })
            }
            className="flex justify-center items-center gap-3 hover:border hover:border-[#6440FB] rounded-md p-1"
          >
            <p className="text-[#6440FB] font-DMSans text-[16px] font-semibold ">
              View
            </p>
            <LuFileSearch className="text-[#6440FB] size-4" />
          </button>
        </div>
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Quizzes",
      selector: (row: MerchantTableRow) => row.totalQuiz,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          <div className="p-2 gap-1 flex justify-between items-center">
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.attemptedQuiz}
            </h2>
            <p className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              /
            </p>
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.totalQuiz}
            </h2>
          </div>
          <button
            onClick={() =>
              setIsQuizModal({
                status: true,
                id: 30,
                student: row.userid,
              })
            }
            className="flex justify-center items-center gap-3 hover:border hover:border-[#6440FB] rounded-md p-1"
          >
            <p className="text-[#6440FB] font-DMSans text-[16px] font-semibold ">
              View
            </p>
            <LuFileSearch className="text-[#6440FB] size-4" />
          </button>
        </div>
      ),
      width: "200px",

      sortable: true,
    },
    {
      name: "Polls",
      selector: (row: MerchantTableRow) => row.totalPoll,
      cell: (row) => (
        <div className="flex justify-center items-center rounded-[4px]">
          <div className="p-2 gap-1 flex justify-between items-center">
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.attemptedPoll}
            </h2>
            <p className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              /
            </p>
            <h2 className="font-DMSans text-[#F01E00] text-[16px] font-semibold">
              {row.totalPoll}
            </h2>
          </div>
          <button
            onClick={() =>
              setIsPollModal({
                status: true,
                id: row.id,
              })
            }
            className="flex justify-center items-center gap-3 hover:border hover:border-[#6440FB] rounded-md p-1"
          >
            <p className="text-[#6440FB] font-DMSans text-[16px] font-semibold ">
              View
            </p>
            <LuFileSearch className="text-[#6440FB] size-4" />
          </button>
        </div>
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Aggregate",
      selector: (row: { score: string }) => row.score,
      cell: (row) => (
        <div className="flex justify-between items-center rounded-[4px]">
          <div className="p-2 gap-1 flex justify-between items-center">
            <h2 className="font-DMSans text-[16px] font-bold">0</h2>
            <p className="font-DMSans text-[16px] font-bold">/</p>
            <h2 className="text-[16px] font-DMSans font-bold">{row.score}</h2>
          </div>
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionMenu
          actions={[
            {
              label: "Contact",
              action: () =>
                setIscontact({
                  status: true,
                  id: row.id,
                }),
            },
            {
              label: "Transcript ",
              action: () =>
                setIscontact({
                  status: true,
                  id: row.id,
                }),
            },
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
    setIsAssignment({
      status: false,
      id: 0,
      student: 0,
    });
    setIsExam({
      status: false,
      id: 0,
    });
    setisCapstone({
      status: false,
      id: 0,
    });
    setIsPollModal({
      status: false,
      id: 0,
    });
    setIsQuizModal({
      status: false,
      id: 0,
      student: 0,
    });
  };

  return (
    <DashboardArea>
      {" "}
      <div>
        <div className="my-4">
          <h2 className="font-DMSans font-semibold text-[20px]">
            Students’ performance & scores{" "}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap justify-between items-center">
          <div className="w-full lg:w-[350px] mb-6">
            <SelectionDropdown
              options={options}
              // value={selectedOption}
              placeholder="Select Program"
              onSelect={handleSelect}
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
        <ViewAssignmentModal
          isOpen={isAssignment.status}
          id={isAssignment.id}
          student={isAssignment.student}
          closeModal={handleClose}
        />
        <ViewExamModal
          isOpen={isExam.status}
          id={isExam.id}
          closeModal={handleClose}
        />
        <ViewCapstoneModal
          isOpen={isCapstone.status}
          id={isCapstone.id}
          closeModal={handleClose}
        />
        <ViewPollModal
          isOpen={isPollModal.status}
          id={isPollModal.id}
          closeModal={handleClose}
        />
        <ViewQuizModal
          isOpen={isQuizModal.status}
          id={isQuizModal.id}
          student={isQuizModal.student}
          closeModal={handleClose}
        />
      </div>
    </DashboardArea>
  );
};

export default StudentsManagement;
