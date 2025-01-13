import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import toast from "react-hot-toast";

const TaskList = () => {
  const { tasks, loading, error, filter } = useContext(TaskContext);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  if (loading) return <p>Loading tasks...</p>;
  if (error) {
    toast.error(error);
  }
  if (filteredTasks.length === 0) return <p>No tasks available.</p>;

  return (
    <div className="flex flex-col gap-2">
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
