import { useDrag, useDrop } from "react-dnd";
import { RiDragMove2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

const DraggableItem = ({ item, type, theme, index, moveItem }: any) => {
  if (!item?.id) return null;

  const [, drag] = useDrag({
    type,
    item: {
      id: item.id,
      index,
      moduleId: item.moduleId,
      category: item.category,
    },
  });

  const [, drop] = useDrop({
    accept: ["LESSON", "CAPSTONE", "ASSIGNMENT", "QUIZ", "EXAM"],
    hover: (draggedItem: any) => {
      if (
        draggedItem.index !== index ||
        draggedItem.category !== item.category
      ) {
        moveItem(draggedItem.id, index, draggedItem.moduleId, item.category);
        draggedItem = { ...draggedItem, index, category: item.category };
      }
    },
  });

  return (
    <div ref={drop} className="flex justify-between items-center gap-2">
      <button ref={drag} className="p-2 rounded text-white">
        <RiDragMove2Fill
          className={`text-[30px] ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        />
      </button>
      <div
        className={`p-3 w-full shadow-md flex justify-between items-start mb-2 ${
          theme === "dark"
            ? "bg-transparent border border-gray-400"
            : "bg-gray-200"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-2">
          <h2 className="font-semibold text-[18px] text-red-500">
            {item.title}:
          </h2>
          <h2 className="font-semibold text-[18px]">{item.description}</h2>
        </div>
        <div className="flex justify-end gap-2">
          <p className="font-normal text-[18px]">{item.pages}</p>
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

export { DraggableItem };
