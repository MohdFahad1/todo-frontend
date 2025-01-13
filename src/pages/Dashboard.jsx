import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { filter, setFilter } = useContext(TaskContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <header className="flex items-center justify-between w-full max-w-2xl mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </header>

      <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <p className="mb-2 text-gray-700">Welcome, {currentUser?.name}!</p>
          <p className="text-gray-500">Email: {currentUser?.email}</p>
        </div>

        <AddTaskForm />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <div className="flex gap-2">
            {["All", "Pending", "Completed"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "primary" : "outline"}
                onClick={() => setFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
