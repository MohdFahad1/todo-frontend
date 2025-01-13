import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const AddTaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      toast.error("Please fill all details");
      return;
    }
    try {
      await addTask({ title, description });
      setFormData({ title: "", description: "" });
    } catch (err) {
      setError(err);
      toast.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mb-6">
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
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default AddTaskForm;
