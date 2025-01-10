import React from "react";

const EditForm = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-[120px] overflow-auto">
      {/* Modal Container */}
      <div
        className="bg-white rounded-[20px] w-[90%] max-w-[1026px] h-auto lg:h-[600px] relative flex flex-col lg:flex-row shadow-lg"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Left Section: Form */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Task</h2>
            <button
              className="text-gray-600 hover:text-gray-900 text-xl"
              onClick={() => console.log("Close modal")}
            >
              &times;
            </button>
          </div>

          {/* Task Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Task Title*</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Enter task title here..."
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description*</label>
            <textarea
              className="w-full border rounded-lg p-3 h-28 resize-none"
              placeholder="Spend 30 minutes on cardio and strength training exercises to stay active and healthy."
            ></textarea>
          </div>

          {/* Task Category, Due Date, and Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Task Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Task Category*</label>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg border text-center bg-gray-100 hover:bg-gray-200">
                  Work
                </button>
                <button className="flex-1 py-2 rounded-lg border text-center bg-purple-600 text-white hover:bg-purple-700">
                  Personal
                </button>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Due on*</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2 text-gray-600"
                defaultValue="2024-12-28"
              />
            </div>

            {/* Task Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Task Status*</label>
              <select className="w-full border rounded-lg p-2">
                <option>IN-PROGRESS</option>
                <option>COMPLETED</option>
                <option>PENDING</option>
              </select>
            </div>
          </div>

          {/* Attachment */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Attachment</label>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-gray-400">
                Drop your files here to{" "}
                <span className="text-blue-500 underline">Upload</span>
              </p>
              <div className="mt-2 relative inline-block">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Attachment"
                  className="h-16 w-16 rounded-lg"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  onClick={() => console.log("Remove attachment")}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex flex-col-reverse sm:flex-row justify-end gap-4 p-20">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Update
            </button>
          </div>
        </div>

        {/* Right Section: Activity */}
        <div className="w-full lg:w-[280px] bg-gray-100 border-t lg:border-t-0 lg:border-l border-gray-200 rounded-b-[20px] lg:rounded-r-[20px] p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Activity</h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600">
              <span className="block font-medium text-gray-800">Dec 27 at 1:15 pm:</span>
              You created this task.
            </li>
            <li className="text-sm text-gray-600">
              <span className="block font-medium text-gray-800">Dec 28 at 1:15 pm:</span>
              You changed the status from in-progress to complete.
            </li>
            <li className="text-sm text-gray-600">
              <span className="block font-medium text-gray-800">Dec 29 at 1:15 pm:</span>
              You uploaded a file.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
