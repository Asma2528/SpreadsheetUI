import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const tabList = ["All Orders", "Pending", "Reviewed", "Arrived", "+"];

const LowermostTab = () => {
  const [active, setActive] = useState("All Orders");

  return (
    <div className="w-full border-t border-gray-300 bg-white">
      <div className="flex">
        {tabList.map((tab) => {
          const isActive = active === tab;
          const isAllOrders = tab === "All Orders";

          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`
                px-4 py-2 text-sm font-medium flex items-center justify-center
                ${
                  isAllOrders && isActive
                    ? "text-green-900 bg-green-50 border-t-4 border-green-800"
                    : ""
                }
                ${
                  !isAllOrders && isActive
                    ? "text-green-900 border-t-4 border-green-800"
                    : ""
                }
                ${
                  !isActive
                    ? "text-gray-500 hover:text-green-900 hover:bg-green-50"
                    : ""
                }
              `}
            >
              {tab === "+" ? <AiOutlinePlus size={16} /> : tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LowermostTab;
