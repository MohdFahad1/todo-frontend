import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Button } from "@/components/ui/button";
import EditTaskModal from "./EditTaskModal";
import ShareTaskModal from "./ShareTaskModal";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const toggleStatus = () => {
    updateTask(task._id, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
  };

  const isShared = task.sharedWith && task.sharedWith.length > 0;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task._id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200 rounded">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex">
            <h3
              className={`text-xl ${
                task.status === "Completed" ? "line-through text-green-500" : ""
              }`}
            >
              {task.title}
            </h3>
            {isShared && (
              <span className="ml-2 flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                Shared
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-700">{task.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={toggleStatus}>
          {task.status === "Pending"
            ? "Mark as Complete"
            : "Mark as Incomplete"}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsShareModalOpen(true)}
        >
          Share
        </Button>
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>

      {isEditModalOpen && (
        <EditTaskModal task={task} onClose={() => setIsEditModalOpen(false)} />
      )}

      {isShareModalOpen && (
        <ShareTaskModal
          taskId={task._id}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskItem;
