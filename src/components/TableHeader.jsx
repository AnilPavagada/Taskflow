const TableHeader = () => {
  return (
    <div
      className="absolute flex items-center bg-white shadow-md rounded-lg px-4 py-2 w-full sm:w-[90%] md:w-[950px] h-[auto] md:h-[50px] top-[160px] left-[50%] transform -translate-x-1/2"
    >
      {/* Table Columns */}
      <div className="flex justify-between w-full">
        <span className="text-sm font-medium text-gray-700">Task Name</span>
        <span className="text-sm font-medium text-gray-700">Due on</span>
        {/* <span className="text-sm font-medium text-gray-700">Due Date</span> */}
        {/* <span className="text-sm font-medium text-gray-700">Priority</span> */}
        <span className="text-sm font-medium text-gray-700">Task Status</span>
        <span className="text-sm font-medium text-gray-700">Task Category</span>
      </div>
    </div>
  );
};

export default TableHeader;
