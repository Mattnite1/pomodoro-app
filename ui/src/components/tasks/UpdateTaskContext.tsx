import { getSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UpdateTaskContent = createContext("");

export const useUpdateTaskContext = () => useContext(UpdateTaskContent);

export const TaskProvider = ({ children }) => {
  const [isChecked, setChecked] = useState(true);

  useEffect(() => {
    const updateTask = async () => {
      const currentSession = await getSession();
      setChecked(() => !isChecked);
      try {
        const response = await axios.patch(
          `http://localhost:3333/tasks/${taskId}`,
          { inProgress: !isChecked },
          {
            headers: {
              Authorization: "Bearer " + currentSession?.user?.refresh_token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    updateTask();
  }, []);

  return (
    <UpdateTaskContent.Provider value={{ isChecked, updateTask }}>
      {children}
    </UpdateTaskContent.Provider>
  );
};
