import { FiRefreshCw, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { TbArrowsSplit } from "react-icons/tb";

const LowerTab = () => {
  return (
    <div className="flex justify-between items-center px-2 text-sm w-full border-t border-gray-300">
      {/* Left Box */}
      <div className="flex bg-gray-200  w-[640px] py-1 ml-[32px] my-0">
        <div className="flex items-center bg-gray-100 px-2 py-1 my-0.5 ml-6 rounded-sm relative">
          <img src="/public/download.png" alt="icon" className="w-4 h-4 mr-1" />
          <span className="text-gray-600 text-xs">Q3 Financial Overview</span>
          <FiRefreshCw className="absolute rotate-90 -right-6 text-red-500 text-sm" />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex gap-0.5 items-center">
        {/* ABC */}
        <div className="flex items-center w-[124px] bg-[#D2E0D4] px-2 py-1.5 justify-center rounded-sm cursor-pointer hover:bg-[#b0c5b7]">
          <TbArrowsSplit className="text-gray-400 rotate-90" />
          <span className="text-gray-800 font-semibold text-sm px-1">ABC</span>
          <FiMoreHorizontal className="text-gray-400 text-sm" />
        </div>

        {/* Answer a question */}
        <div className="flex items-center w-[251px] bg-[#DCCFFC] justify-center px-2 py-1.5 rounded-sm cursor-pointer hover:bg-[#c3b0f5]">
          <TbArrowsSplit className="text-white rotate-90" />
          <span className="text-gray-800 font-semibold text-sm px-1">
            Answer a question
          </span>
          <FiMoreHorizontal className="text-gray-400 text-sm" />
        </div>

        {/* Extract */}
        <div className="flex items-center w-[124px] bg-[#FAC2AF] justify-center px-2 py-1.5 rounded-sm cursor-pointer hover:bg-[#e9a995]">
          <TbArrowsSplit className="text-white rotate-90" />
          <span className="text-gray-800 font-semibold text-sm px-1">
            Extract
          </span>
          <FiMoreHorizontal className="text-gray-400 text-sm" />
        </div>

        {/* Plus */}
        <div className="flex items-center justify-center w-[124px] bg-[#e6e6e6] px-2 py-2 mr-2 rounded-sm cursor-pointer hover:bg-[#cfcfcf]">
          <FiPlus className="text-gray-700 text-center text-base" />
        </div>
      </div>
    </div>
  );
};

export default LowerTab;
