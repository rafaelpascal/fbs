import React from "react";
import { NewAssignmentModal } from "~/components/Modal/NewAssignmentModal";
import { NewCapstoneModal } from "~/components/Modal/NewCapstoneModal";
import { NewExamModal } from "~/components/Modal/NewExamModal";
import { NewLessonModal } from "~/components/Modal/NewLessonModal";
import { NewModuleModal } from "~/components/Modal/NewModuleModal";
import { NewQuizModal } from "~/components/Modal/NewQuizModal";
import { NewResourcesModel } from "~/components/Modal/NewResourcesModel";
import { NewCaseStudyModel } from "~/components/Modal/NewCaseStudyModel";
import { NewPollModal } from "~/components/Modal/NewPollModal";

interface ModalContainerProps {
  modals: {
    newPoll: any;
    newModule: any;
    newLesson: any;
    newCapstone: any;
    newAssignment: any;
    newQuiz: any;
    newExam: any;
    newResources: any;
    newCaseStudy: any;
  };
  handleClose: () => void;
  addModule: () => void;
  addLesson: () => void;
  addResources: () => void;
  addCaseStudy: () => void;
  addCapstone: () => void;
  addAssignment: () => void;
  addQuiz: () => void;
  addExam: () => void;
  addPoll: () => void;
  moduleObj: any;
  setModuleObj: React.Dispatch<React.SetStateAction<any>>;
  setLessonObj: React.Dispatch<React.SetStateAction<any>>;
  setResourcesObj: React.Dispatch<React.SetStateAction<any>>;
  setCaseStudyObj: React.Dispatch<React.SetStateAction<any>>;
  setCapstoneObj: React.Dispatch<React.SetStateAction<any>>;
  setAssignmentObj: React.Dispatch<React.SetStateAction<any>>;
  setQuizObj: React.Dispatch<React.SetStateAction<any>>;
  setExamObj: React.Dispatch<React.SetStateAction<any>>;
  setPollObj: React.Dispatch<React.SetStateAction<any>>;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  modals,
  handleClose,
  addModule,
  addLesson,
  addCapstone,
  addResources,
  addCaseStudy,
  addAssignment,
  addQuiz,
  addExam,
  addPoll,
  moduleObj,
  setModuleObj,
  setLessonObj,
  setCapstoneObj,
  setAssignmentObj,
  setResourcesObj,
  setCaseStudyObj,
  setQuizObj,
  setPollObj,
  setExamObj,
}) => {
  return (
    <>
      <NewModuleModal
        moduleNumber={modals.newModule.number}
        initialModuleId={modals.newModule.courseId}
        isOpen={modals.newModule.status}
        closeModal={handleClose}
        handlecreate={addModule}
        moduleData={moduleObj}
        setModuleData={setModuleObj}
      />
      <NewLessonModal
        lessonNumber={modals.newLesson.number}
        moduleId={modals.newLesson.module}
        lessonId={modals.newLesson.lessonId}
        isOpen={modals.newLesson.status}
        closeModal={handleClose}
        handlecreate={addLesson}
        moduleData={moduleObj}
        setModuleData={setLessonObj}
      />

      <NewResourcesModel
        moduleId={modals.newResources.module}
        isOpen={modals.newResources.status}
        closeModal={handleClose}
        handlecreate={addResources}
        moduleData={moduleObj}
        setModuleData={setResourcesObj}
      />
      <NewCaseStudyModel
        moduleId={modals.newCaseStudy.module}
        isOpen={modals.newCaseStudy.status}
        closeModal={handleClose}
        handlecreate={addCaseStudy}
        moduleData={moduleObj}
        setModuleData={setCaseStudyObj}
      />

      <NewCapstoneModal
        moduleId={modals.newCapstone.module}
        lessonId={modals.newCapstone.lesson}
        isOpen={modals.newCapstone.status}
        closeModal={handleClose}
        handlecreate={addCapstone}
        moduleData={moduleObj}
        setModuleData={setCapstoneObj}
      />
      <NewAssignmentModal
        moduleId={modals.newAssignment.module}
        lessonId={modals.newAssignment.lesson}
        isOpen={modals.newAssignment.status}
        closeModal={handleClose}
        handlecreate={addAssignment}
        moduleData={moduleObj}
        setModuleData={setAssignmentObj}
      />
      <NewQuizModal
        moduleId={modals.newQuiz.module}
        lessonId={modals.newQuiz.lesson}
        isOpen={modals.newQuiz.status}
        closeModal={handleClose}
        handlecreate={addQuiz}
        moduleData={moduleObj}
        setModuleData={setQuizObj}
      />
      <NewExamModal
        moduleId={modals.newExam.module}
        lessonId={modals.newExam.lesson}
        isOpen={modals.newExam.status}
        closeModal={handleClose}
        handlecreate={addExam}
        moduleData={moduleObj}
        setModuleData={setExamObj}
      />
      <NewPollModal
        moduleId={modals.newPoll.module}
        lessonId={modals.newPoll.lesson}
        isOpen={modals.newPoll.status}
        closeModal={handleClose}
        handlecreate={addPoll}
        moduleData={moduleObj}
        setModuleData={setPollObj}
      />
    </>
  );
};

export default ModalContainer;
