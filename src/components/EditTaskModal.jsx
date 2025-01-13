import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const EditTaskModal = ({ task, onClose }) => {
  const { updateTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
  });
  const [error, setError] = useState("");

  const { title, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !description) {
      setError("Please fill in all fields.");
      toast.error("Please fill all fields.");
      return;
    }
    try {
      await updateTask(task._id, { title, description });
      onClose();
    } catch (err) {
      setError(err);
      toast.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl">Edit Task</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Task title"
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <Input
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Task description"
              type="text"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
