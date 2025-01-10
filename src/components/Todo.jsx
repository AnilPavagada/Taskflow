import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Todo = () => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({
    name: "",
    status: "todo",
    category: "",
    dueDate: "",
  });
  const [visibleDropdown, setVisibleDropdown] = useState(null); // State to track which dropdown is open
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State for EditForm visibility
  const [taskToEdit, setTaskToEdit] = useState(null); // State to store task being edited
  const [selectedTasks, setSelectedTasks] = useState([]);// State to store selected tasks
  const [visibleStatusDropdown, setVisibleStatusDropdown] = useState([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [taskList, updateTaskList] = useState([]);
  // Function to toggle dropdown visibility
  const toggleDropdown = (taskId) => {
    setVisibleDropdown((prev) => (prev === taskId ? null : taskId));
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setVisibleDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);






  // Fetch tasks from Firestore
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

  // Mutation for adding tasks
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
  // Mutation for deleting tasks
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      await deleteDoc(doc(db, "tasks", taskId));
    },
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    onError: (error) => console.error("Error deleting task:", error),
  });

  // Mutation for updating tasks
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const taskRef = doc(db, "tasks", updatedTask.id);
      await updateDoc(taskRef, updatedTask);
    },
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    onError: (error) => console.error("Error updating task:", error),
  });
  // Handle adding new tasks
  const handleAddTask = (e) => {
    e.preventDefault();
    addTaskMutation.mutate(newTask);
    setNewTask({ name: "", status: "todo", category: "", dueDate: "" });
  };
  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    deleteTaskMutation.mutate(taskId);
  };

  // Handle editing a task (open EditForm)
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditFormOpen(true);
  };

  // Handle saving an edited task
  const handleSaveEdit = (updatedTask) => {
    updateTaskMutation.mutate(updatedTask);
    setIsEditFormOpen(false);
    setTaskToEdit(null);
  };

  // Handle task selection
  const handleTaskSelection = (taskId) => {
    // Toggle task selection state
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(taskId)
        ? prevSelectedTasks.filter((id) => id !== taskId)
        : [...prevSelectedTasks, taskId]
    );
  };

  // Handle marking selected tasks as a new status
  const handleStatusChangeForSelected = (status) => {
    selectedTasks.forEach((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        updateTaskMutation.mutate({ ...task, status });
      }
    });
    setSelectedTasks([]); // Clear selected tasks after update
  };

  // Handle delete for selected tasks
  const handleDeleteSelectedTasks = () => {
    selectedTasks.forEach((taskId) => {
      deleteTaskMutation.mutate(taskId);
    });
    setSelectedTasks([]); // Clear selected tasks after deletion
  };



  const taskCount = (status) => tasks.filter((task) => task.status === status).length;
  // Render loading and error states
  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks. Please try again later.</div>;

  const toggleStatusDropdown = (id) => {
    setVisibleStatusDropdown((prev) => (prev === id ? null : id));
  };


  const updateTaskStatus = (id, newStatus) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTaskMutation.mutate({ ...task, status: newStatus });
    }
    setVisibleStatusDropdown(null); // Close dropdown
  };
  const handleNewTaskSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const newTaskData = {
      ...newTask,
      id: Date.now(), // Generate unique ID
    };

    // Add the new task to the taskList array
    updateTaskList((prevTaskList) => [...prevTaskList, newTaskData]);

    // Reset the form fields
    setNewTask({ name: "", status: "todo", category: "", dueDate: "" });

    // Close the modal
    setIsAddTaskModalOpen(false);
  };


  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg max-w-[1200px] mx-auto my-8">
      <h1 className="text-2xl font-bold mb-20 text-gray-800"></h1>



      <table className="table-auto w-full text-left border-collapse mb-4">

      </table>

      {/* Selected Tasks Info */}
      {/* Added section to display actions for selected tasks */}
      {/*selectedTasks*/}
      {selectedTasks.length > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-black p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Task Count */}
          <span className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm text-center">
            {selectedTasks.length} Task{selectedTasks.length > 1 ? "s" : ""} Selected
          </span>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center space-x-4">
            <button
              onClick={() => setSelectedTasks([])}
              className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700 transition duration-300"
              title="Deselect All"
            >
              ✖
            </button>
            <button
              onClick={() => handleStatusChangeForSelected("todo")}
              className="bg-pink-300 text-white py-2 px-4 rounded shadow-md hover:bg-pink-400 transition duration-300"
            >
              Set To-Do
            </button>
            <button
              onClick={() => handleStatusChangeForSelected("in-progress")}
              className="bg-[#85D9F1] text-white py-2 px-4 rounded shadow-md hover:bg-blue-400 transition duration-300"
            >
              Set In-Progress
            </button>
            <button
              onClick={() => handleStatusChangeForSelected("completed")}
              className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 transition duration-300"
            >
              Set Completed
            </button>
            <button
              onClick={handleDeleteSelectedTasks}
              className="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {/* Task Lists */}
      <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4 overflow-auto">
        {[
          { title: "To-Do", status: "todo", bgColor: "bg-pink-300" },
          { title: "In-Progress", status: "in-progress", bgColor: "bg-[#85D9F1]" },
          { title: "Completed", status: "completed", bgColor: "bg-green-500" },
        ].map(({ title, status, bgColor }) => (
          <div
            key={status}
            className="rounded-lg shadow-md overflow-hidden flex-1 min-w-[280px] max-w-full sm:max-w-sm md:min-w-[300px]"
          >
            {/* Header Section */}
            <div
              className={`${bgColor} text-white px-4 sm:px-6 py-3 text-lg sm:text-xl font-bold flex justify-between items-center`}
            >
              <span>{title} ({taskCount(status)})</span>
              {status === "todo" && (
                <button
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="bg-white text-pink-500 px-2 sm:px-4 py-1 sm:py-2 rounded shadow hover:bg-pink-100 text-sm sm:text-base"
                >
                  + Add Task
                </button>
              )}
            </div>

            {/* Tasks Section */}
            <div className="p-4 sm:p-6 overflow-y-auto h-[300px] sm:h-[400px]">
              <table className="table-auto w-full text-left border-collapse">
                <tbody>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <tr
                        key={task.id}
                        className="hover:bg-gray-50 bg-gray-100 rounded-lg"
                      >
                        {/* Checkbox */}
                        <td className="p-4 flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleTaskSelection(task.id)}
                          />
                          <button
                            onClick={() => handleTaskSelection(task.id)}
                            className={`w-6 h-6 flex items-center justify-center rounded-full border ${task.status === "completed"
                                ? "bg-green-500 text-white"
                                : "bg-gray-300"
                              }`}
                          >
                            {task.status === "completed" ? "✓" : ""}
                          </button>
                        </td>

                        {/* Task Name */}
                        <td
                          className={`p-4 text-black ${task.status === "completed" ? "line-through text-gray-500" : ""
                            }`}
                        >
                          {task.name || "Untitled"}
                        </td>

                        {/* Due Date */}
                        <td className="p-4 text-right sm:text-left">{task.dueDate}</td>

                        {/* Task Status */}
                        <td className="p-4 capitalize relative">
                          <button
                            onClick={() => toggleStatusDropdown(task.id)}
                            className="capitalize hover:underline"
                          >
                            {task.status}
                          </button>
                          {visibleStatusDropdown === task.id && (
                            <div className="absolute bg-white shadow-md rounded-md z-10">
                              {["todo", "in-progress", "completed"].map((statusOption) => (
                                <button
                                  key={statusOption}
                                  onClick={() => updateTaskStatus(task.id, statusOption)}
                                  className="block px-4 py-2 hover:bg-gray-200 capitalize"
                                >
                                  {statusOption}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Task Category */}
                        <td className="p-4">
                          {task.category || "Uncategorized"}
                        </td>

                        {/* Menu Options */}
                        <td className="p-4 text-right relative">
                          <button
                            onClick={() => toggleDropdown(task.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ⋮
                          </button>
                          {visibleDropdown === task.id && (
                            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md z-10 w-28">
                              <button
                                onClick={() => handleEditTask(task)}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>


      {isAddTaskModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-[600px] w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Task Name"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  required
                  className="border p-2 rounded w-full"
                />
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                >
                  <option value="todo">To-Do</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <input
                  type="text"
                  placeholder="Category"
                  value={newTask.category}
                  onChange={(e) =>
                    setNewTask({ ...newTask, category: e.target.value })
                  }
                  required
                  className="border p-2 rounded w-full"
                />
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  required
                  className="border p-2 rounded w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                  Add Task
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsAddTaskModalOpen(false)}
              className="mt-4 text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}




      {/* Edit Task Form */}
      {isEditFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(taskToEdit);
            }}
            className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Task</h2>

            <div className="grid gap-4">
              {/* Task Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Task Name*</label>
                <input
                  type="text"
                  value={taskToEdit.name}
                  onChange={(e) =>
                    setTaskToEdit({ ...taskToEdit, name: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter task name"
                />
              </div>

              {/* Task Status */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Task Status*</label>
                <select
                  value={taskToEdit.status}
                  onChange={(e) =>
                    setTaskToEdit({ ...taskToEdit, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="todo">To-Do</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Task Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Task Category*</label>
                <input
                  type="text"
                  value={taskToEdit.category}
                  onChange={(e) =>
                    setTaskToEdit({ ...taskToEdit, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter task category"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Due Date*</label>
                <input
                  type="date"
                  value={taskToEdit.dueDate}
                  onChange={(e) =>
                    setTaskToEdit({ ...taskToEdit, dueDate: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditFormOpen(false)}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Todo;
