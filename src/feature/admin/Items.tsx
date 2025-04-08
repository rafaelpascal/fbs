import { useDrag, useDrop } from "react-dnd";
import { RiDragMove2Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { RemoveItemModal } from "~/components/Modal/RemoveItemModal";
import { useState } from "react";

const DraggableItem = ({
  item,
  type,
  theme,
  index,
  moveItem,
  handleNewLesson,
  handleRemove,
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    accept: [
      "LESSON",
      "CAPSTONE",
      "ASSIGNMENT",
      "QUIZ",
      "EXAM",
      "CASESTUDY",
      "RESOURCES",
      "POLLS",
      "POLL",
    ],
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
    <div ref={drop} className="flex justify-between items-center gap-2 w-[90%]">
      <button ref={drag} className="p-2 rounded text-white">
        <RiDragMove2Fill
          className={`text-[30px] ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        />
      </button>
      <div
        className={`p-3 w-full shadow-md flex justify-between items-start mb-2 
        bg-gray-200
        `}
      >
        <div className="flex flex-col lg:flex-row gap-2">
          {item.title ? (
            <h2 className="font-semibold text-[18px] text-gray-700">
              {type}
              {item.index}: {item.title}
            </h2>
          ) : (
            <h2 className="font-semibold text-[18px] text-gray-700">
              {type}
              {item.lesson_number}: {item.lesson_title}
            </h2>
          )}
          <h2 className="font-semibold text-[18px] text-gray-700">
            {item.description}
          </h2>
        </div>
        <div className="flex justify-end gap-2">
          <p className="font-normal text-[18px]">{item.pages}</p>
          <button onClick={() => handleNewLesson(item)}>
            <FiEdit className="text-[30px] text-gray-700" />
          </button>
          <button onClick={() => setIsModalOpen(true)}>
            <MdOutlineCancel className="text-[30px] text-gray-700" />
          </button>
        </div>
      </div>
      <RemoveItemModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        id={item.id}
        message={`Are you sure you want to remove ${
          item.title || item.lesson_title
        }?`}
        onConfirm={() => {
          handleRemove(item.lessonid);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export { DraggableItem };
