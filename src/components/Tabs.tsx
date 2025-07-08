import React, { useState } from "react";

const tabList = ["All Orders", "Pending", "Reviewed", "Arrived"];

const Tabs = () => {
  const [active, setActive] = useState("All Orders");
  return (
    <div className="flex gap-4 mb-4 text-sm">
      {tabList.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-3 py-1 rounded-t border-b-2 transition-all duration-150 ${
            active === tab ? "border-green-500 font-semibold" : "border-transparent text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;