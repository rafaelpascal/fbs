import { useDrag, useDrop } from "react-dnd";
import { RiDragMove2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import cn from "classnames";

const ItemTypes = {
  LESSON: "lesson",
  CAPSTONE: "capstone",
};

const LessonItem = ({ lesson, theme, index, moveLesson }: any) => {
  if (!lesson?.id) {
    return null;
  }

  const [, drag] = useDrag({
    type: ItemTypes.LESSON,
    item: { id: lesson?.id || "", index },
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.LESSON, ItemTypes.CAPSTONE],
    hover: (item: any) => {
      if (item.index !== index) {
        moveLesson(item.id, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop} className="flex justify-between items-center gap-2">
      <button ref={drag} className="p-2 rounded text-white">
        <RiDragMove2Fill
          className={cn(
            "text-[30px]",
            theme === "dark" ? "text-[#fff]" : "text-[#333]"
          )}
        />
      </button>
      <div
        className={cn(
          "p-3 w-full shadow-md flex flex-row justify-between items-start mb-2",
          theme === "dark"
            ? "bg-transparent border-[0.5px] border-[#ddd]"
            : "bg-[#B3B3B3]/10"
        )}
      >
        <div className="flex  flex-col lg:flex-row justify-start items-start gap-2">
          <h2 className="font-DMSans font-semibold text-[18px] text-[#FF5050]">
            {lesson.title}:
          </h2>
          <h2 className="font-DMSans font-semibold text-[18px]">
            {lesson.description}
          </h2>
        </div>

        <div className="flex justify-end items-end gap-2">
          <p className="font-DMSans mr-10 font-normal text-[18px]">
            {lesson.pages}
          </p>
          <button>
            <FiEdit className="text-[30px]" />
          </button>
          <button>
            <MdOutlineCancel className="text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CapstoneItem = ({ capstone, theme, index, moveLesson }: any) => {
  if (!capstone?.id) {
    return null;
  }

  const [, drag] = useDrag({
    type: ItemTypes.CAPSTONE,
    item: { id: capstone?.id || "", index },
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.LESSON, ItemTypes.CAPSTONE],
    hover: (item: any) => {
      if (item.index !== index) {
        moveLesson(item.id, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop} className="flex justify-between items-center gap-2">
      <button ref={drag} className="p-2 rounded text-white">
        <RiDragMove2Fill
          className={cn(
            "text-[30px]",
            theme === "dark" ? "text-[#fff]" : "text-[#333]"
          )}
        />
      </button>
      <div
        className={cn(
          "p-3 w-full shadow-md flex flex-row justify-between items-start mb-2",
          theme === "dark"
            ? "bg-transparent border-[0.5px] border-[#ddd]"
            : "bg-[#B3B3B3]/10"
        )}
      >
        <div className="flex justify-start items-start gap-2">
          <h2 className="font-DMSans font-semibold text-[18px] text-[#FF5050]">
            {capstone.title}:
          </h2>
          <h2 className="font-DMSans font-semibold text-[18px]">
            {capstone.description}
          </h2>
        </div>

        <div className="flex justify-end items-end gap-2">
          <p className="font-DMSans mr-10 font-normal text-[18px]">
            {capstone.pages}
          </p>
          <button>
            <FiEdit className="text-[30px]" />
          </button>
          <button>
            <MdOutlineCancel className="text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Assignment = ({ capstone, theme, index, moveLesson }: any) => {
  if (!capstone?.id) {
    return null;
  }

  const [, drag] = useDrag({
    type: ItemTypes.CAPSTONE,
    item: { id: capstone?.id || "", index },
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.LESSON, ItemTypes.CAPSTONE],
    hover: (item: any) => {
      if (item.index !== index) {
        moveLesson(item.id, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop} className="flex justify-between items-center gap-2">
      <button ref={drag} className="p-2 rounded text-white">
        <RiDragMove2Fill
          className={cn(
            "text-[30px]",
            theme === "dark" ? "text-[#fff]" : "text-[#333]"
          )}
        />
      </button>
      <div
        className={cn(
          "p-3 w-full shadow-md flex flex-row justify-between items-start mb-2",
          theme === "dark"
            ? "bg-transparent border-[0.5px] border-[#ddd]"
            : "bg-[#B3B3B3]/10"
        )}
      >
        <div className="flex justify-start items-start gap-2">
          <h2 className="font-DMSans font-semibold text-[18px] text-[#FF5050]">
            {capstone.title}:
          </h2>
          <h2 className="font-DMSans font-semibold text-[18px]">
            {capstone.description}
          </h2>
        </div>

        <div className="flex justify-end items-end gap-2">
          <p className="font-DMSans mr-10 font-normal text-[18px]">
            {capstone.pages}
          </p>
          <button>
            <FiEdit className="text-[30px]" />
          </button>
          <button>
            <MdOutlineCancel className="text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizItems = ({ capstone, theme, index, moveLesson }: any) => {
  if (!capstone?.id) {
    return null;
  }

  const [, drag] = useDrag({
    type: ItemTypes.CAPSTONE,
    item: { id: capstone?.id || "", index },
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.LESSON, ItemTypes.CAPSTONE],
    hover: (item: any) => {
      if (item.index !== index) {
        moveLesson(item.id, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={drop} className="flex justify-between items-center gap-2">
      <button ref={drag} className="p-2 rounded text-white">
        <RiDragMove2Fill
          className={cn(
            "text-[30px]",
            theme === "dark" ? "text-[#fff]" : "text-[#333]"
          )}
        />
      </button>
      <div
        className={cn(
          "p-3 w-full shadow-md flex flex-row justify-between items-start mb-2",
          theme === "dark"
            ? "bg-transparent border-[0.5px] border-[#ddd]"
            : "bg-[#B3B3B3]/10"
        )}
      >
        <div className="flex justify-start items-start gap-2">
          <h2 className="font-DMSans font-semibold text-[18px] text-[#FF5050]">
            {capstone.title}:
          </h2>
          <h2 className="font-DMSans font-semibold text-[18px]">
            {capstone.description}
          </h2>
        </div>

        <div className="flex justify-end items-end gap-2">
          <p className="font-DMSans mr-10 font-normal text-[18px]">
            {capstone.pages}
          </p>
          <button>
            <FiEdit className="text-[30px]" />
          </button>
          <button>
            <MdOutlineCancel className="text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { LessonItem, CapstoneItem, Assignment, QuizItems, ItemTypes };
