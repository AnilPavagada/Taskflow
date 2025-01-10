import React, { useState } from "react";
import { addTask } from "../services/firestoreService"; // Corrected import
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TaskForm = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({
    name: "",
    status: "todo",
    category: "",
    dueDate: "",
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    addTaskMutation.mutate(newTask);
    setNewTask({ name: "", status: "todo", category: "", dueDate: "" });
  };

  const addTaskMutation = useMutation({
    mutationFn: async (task) => {
      const taskWithDate = {
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      };
      await addDoc(collection(db, "tasks"), taskWithDate);
    },
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    onError: (error) => console.error("Error adding task:", error),
  });

  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dueDate: data.dueDate?.toDate
            ? data.dueDate.toDate().toLocaleDateString()
            : data.dueDate || "No due date",
        };
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewTask({ ...newTask, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (!newTask.name || !newTask.status || !newTask.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Prepare the task data for Firestore
      const task = {
        ...newTask,
        dueDate: new Date(newTask.dueDate), // Convert due date to a Date object
        createdAt: new Date(), // Add creation timestamp
      };

      // Save the task to Firestore
      await addTask(task); // Corrected function call

      alert("Task created successfully!");

      // Reset the form after successful submission
      setNewTask({
        name: "",
        description: "",
        category: "Work",
        dueDate: "",
        status: "",
        attachment: null,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "
      onClick={onClose} // Close modal on background click
    >
     <div
  style={{ marginTop: "800px" }} // Moves the modal down by 100px
  className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[400px] md:w-[500px] lg:w-[600px] transform transition-all"
  onClick={(e) => e.stopPropagation()} // Prevent closing modal on click inside modal
>

        <h2 className="text-xl font-bold mb-4">Create Task</h2>
        <form
          onSubmit={handleAddTask}
          className="bg-white shadow-md rounded-lg p-6 mt-8 max-w-[1200px] mx-auto"
        >
          {/* Task Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Task title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter description"
              maxLength="300"
            ></textarea>
          </div>

          {/* Task Category */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Task Category</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`px-4 py-2 border rounded ${
                  newTask.category === "Work" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                onClick={(e) => setNewTask({ ...newTask, category: "Work" })}
              >
                Work
              </button>
              <button
                type="button"
                className={`px-4 py-2 border rounded ${
                  newTask.category === "Personal" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => setNewTask({ ...newTask, category: "Personal" })}
              >
                Personal
              </button>
            </div>
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Due On</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Task Status */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Task Status</label>
            <select
              name="status"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="" disabled>
                Choose
              </option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Attachments */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Attachment</label>
            <div className="border border-gray-300 rounded p-4 text-center">
              <p className="text-gray-500">Drop your files here or</p>
              <label
                htmlFor="file-upload"
                className="text-purple-500 cursor-pointer underline"
              >
                Update
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={onClose} // Close the modal
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
