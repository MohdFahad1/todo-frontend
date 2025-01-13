import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const ShareTaskModal = ({ taskId, onClose }) => {
  const { shareTask } = useContext(TaskContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    try {
      await shareTask(taskId, email);
      setSuccess("Task shared successfully!");
      setEmail("");
    } catch (err) {
      setError(err);
      toast.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl">Share Task</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              User's Email
            </label>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter collaborator's email"
              type="email"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Share</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareTaskModal;
