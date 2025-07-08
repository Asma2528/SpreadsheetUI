import { FaRegShareSquare } from "react-icons/fa";
import CustomExportIcon from "./CustomExportIcon"; // Assuming you have a custom export icon component
import { GoFilter } from "react-icons/go";
import { TbArrowsSort } from "react-icons/tb";
import { VscEyeClosed } from "react-icons/vsc";
import { TbArrowsSplit } from "react-icons/tb";
import { TbArrowsMoveVertical } from "react-icons/tb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const MiddleTab = () => {
  return (
    <div className="flex w-[45] justify-between items-center px-2 py-1 border-y border-gray-200 text-sm mb-2">
      {/* Left Side */}
      <div className="flex items-center space-x-2 text-black">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
          <span>Tool bar</span>
          <FontAwesomeIcon icon={faAnglesRight} size="sm" />
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2 rounded" />

        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
          <VscEyeClosed className="text-xl" />
          <span>Hide fields</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
          <TbArrowsSort className="text-xl" />
          <span>Sort</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
          <GoFilter className="text-black text-base" />
          <span>Filter</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
          <span className="text-lg -mr-2">[</span>
          <TbArrowsMoveVertical className="mt-1 text-lg" />
          <span>Cell view</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-2">
        {/* Import */}
        <button className="flex items-center gap-0 border border-gray-300 px-2 py-2 bg-white text-black text-sm rounded hover:bg-gray-100">
          <CustomExportIcon rotation={90} />
          Import
        </button>

        {/* Export */}
        <button className="flex items-center gap-0 border border-gray-300 px-2 py-2 bg-white text-black text-sm rounded hover:bg-gray-100">
          <CustomExportIcon rotation={270} />
          Export
        </button>

        {/* Share */}
        <button className="flex items-center gap-1 border border-gray-300 px-3 py-2 bg-white text-black text-sm rounded hover:bg-gray-100">
          <FaRegShareSquare className="text-black w-4 h-4" />
          Share
        </button>

        {/* New Action */}
        <button className="flex items-center gap-1 px-3 py-2 bg-green-700 text-white text-sm rounded hover:bg-green-800">
          <TbArrowsSplit className="rotate-90" />
          <span>New Action</span>
        </button>
      </div>
    </div>
  );
};

export default MiddleTab;
