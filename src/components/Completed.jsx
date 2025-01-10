import React from "react";

const Completed = () => {
  return (
    <div
      className="bg-green-200 rounded-lg shadow-lg p-4"
      style={{
        width: "1329px", // Default width for larger screens
        height: "49px",  // Default height
        top: "922px",    // Default top position
        left: "33px",    // Default left position
        position: "absolute", // Absolute positioning for custom placement
        gap: "0px",      // No gap
        opacity: "1",    // Full opacity
      }}
    >
      <h2 className="text-lg font-bold mb-4">Completed (3)</h2>
    </div>
  );
};

export default Completed;
