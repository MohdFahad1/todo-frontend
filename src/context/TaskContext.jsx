import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";
import { notifySuccess, notifyError } from "../utils/toast";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/tasks");
      if (response.data.tasks) {
        setTasks(response.data.tasks);
      } else {
        setTasks(response.data);
      }
      setError("");
    } catch (err) {
      console.error("Error fetching tasks:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to fetch tasks.";
      setError(errorMessage);
      notifyError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, filter]);

  const addTask = async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData);
      setTasks([...tasks, response.data]);
      notifySuccess("Task added successfully!");
    } catch (err) {
      console.error("Error adding task:", err);
      const errorMessage = err.response?.data?.message || "Failed to add task.";
      setError(errorMessage);
      notifyError(errorMessage);
      throw err;
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const response = await api.put(`/tasks/${id}`, updatedData);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      notifySuccess("Task updated successfully!");
    } catch (err) {
      console.error("Error updating task:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update task.";
      setError(errorMessage);
      notifyError(errorMessage);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      notifySuccess("Task deleted successfully!");
    } catch (err) {
      console.error("Error deleting task:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to delete task.";
      setError(errorMessage);
      notifyError(errorMessage);
      throw err;
    }
  };

  const shareTask = async (id, email) => {
    try {
      const response = await api.post(`/tasks/${id}/share`, { email });
      setTasks(
        tasks.map((task) => (task._id === id ? response.data.task : task))
      );
      notifySuccess("Task shared successfully!");
    } catch (err) {
      console.error("Error sharing task:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to share task.";
      setError(errorMessage);
      notifyError(errorMessage);
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        filter,
        setFilter,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        shareTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
