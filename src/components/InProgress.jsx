import React from "react";

const InProgress = () => {
  return (
    <div
      className="bg-blue-200 rounded-lg shadow-lg p-4"
      style={{
        width: "1330px", // Custom width
        height: "206px", // Custom height
        top: "670px", // Custom top position
        left: "33px", // Custom left position
        position: "absolute", // Positioning relative to the parent container
        gap: "0px", // No gap
        opacity: "1", // Set opacity to visible (1)
      }}
    >
      <h2 className="text-lg font-bold mb-4">In-Progress (3)</h2>
      <div className="text-center text-gray-600">No Tasks In Progress</div>
    </div>
  );
};

export default InProgress;
