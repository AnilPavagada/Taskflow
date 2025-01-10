import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons
import TaskForm from "./TaskForm";

const Hero = ({ tasks }) => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false); // State to manage the form visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredTasks, setFilteredTasks] = useState(tasks || []); // State for filtered tasks

  const handleAddTaskClick = () => {
    setIsTaskFormOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskFormOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter tasks by task name
    const filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };
  return (
    <div
      className="flex flex-wrap md:flex-nowrap items-center justify-between bg-white shadow-lg rounded-lg px-4 py-4 w-[90%] max-w-[1500px] mx-auto  space-y-4 md:space-y-0 mt-20"
    >
      {/* Filter by Section */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Filter by: Category */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
          <label htmlFor="category" className="text-gray-600 text-sm font-medium sm:mr-2">
            Filter by:
          </label>
          <select
            id="category"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
          >
            <option value="">Category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        {/* Filter by: Due Date */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
          <label htmlFor="due-date" className="text-gray-600 text-sm font-medium sm:mr-2">
            
          </label>
          <select
            id="due-date"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
          >
            <option value="">Due Date</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="next-week">Next Week</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-6 relative w-full md:w-auto">
        <div className="relative w-full sm:w-[60%] md:w-[50%] lg:w-[40%]">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Add Task Button */}
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <button
          onClick={handleAddTaskClick}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full text-sm font-medium"
        >
          Add Task
        </button>
      </div>

      {/* Task Form Modal */}
      {isTaskFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <TaskForm onClose={handleCloseModal} />
        </div>
      )}
      
    </div>
  );
};

export default Hero;
