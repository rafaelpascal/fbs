import React, { createContext, useContext } from "react";

interface LectureContextProps {
  markLessonComplete: (lessonId: string) => void;
}

const LectureContext = createContext<LectureContextProps | undefined>(
  undefined
);

// Provide the context
export const LectureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const markLessonComplete = (lessonId: string) => {
    console.log("Marking lesson complete:", lessonId);
    // Handle completion logic here
  };

  return (
    <LectureContext.Provider value={{ markLessonComplete }}>
      {children}
    </LectureContext.Provider>
  );
};

// Hook for easy access
export const useLecture = () => {
  const context = useContext(LectureContext);
  if (!context) {
    throw new Error("useLecture must be used within a LectureProvider");
  }
  return context;
};
