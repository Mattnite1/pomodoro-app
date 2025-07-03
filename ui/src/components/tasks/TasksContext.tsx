import axios from "axios";
import { getSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext("");


export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const currentSession = await getSession();
      try {
        const response = await axios.get('http://localhost:3333/tasks', {
          headers: {
            Authorization: "Bearer " + currentSession?.user?.refresh_token,
          },
        });

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (newTask: any) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (idToDelete: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== idToDelete));
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
