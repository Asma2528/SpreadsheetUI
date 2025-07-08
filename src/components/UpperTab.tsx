import { FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

const UpperTab = () => {
  return (
    <div className="flex justify-between items-center mx-2 h-[24] w-[343]">
      {/* Left side: Path + Dots */}
      <div className="flex items-center space-x-3 text-sm text-gray-500 ml-2 ">
        <img src="/green-icon.png" alt="icon" className="w-5 h-5  object-contain block" />
        <span className="hover:text-gray-800 cursor-pointer">Workspace</span>
     <IoIosArrowForward className="text-base"/>
        <span className="hover:text-gray-800 cursor-pointer">Folder 2</span>
       <IoIosArrowForward className="text-base" />
        <span className="text-black font-medium">Spreadsheet 3</span>
        <FiMoreHorizontal className="ml-2 text-gray-500 hover:text-gray-800 cursor-pointer" />
      </div>

      {/* Right side: Search, Bell, Avatar */}
      <div className="flex items-center space-x-4 w-[325]">
        {/* Search */}
        <div className="relative w-[125]">
          <input
            type="text"
            placeholder="Search within sheet"
            className="pl-8 pr-4  rounded bg-gray-100 text-sm text-gray-800 placeholder-gray-500"
          />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Notification Bell */}
        <div className="relative hover:cursor-pointer">
          <GoBell  className="text-black text-3xl" />
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full px-1">
            2
          </span>
        </div>

        {/* Avatar and Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/profile-pic.jpg"
            alt="profile"
            className="w-8 h-8 rounded-full  hover:cursor-pointer"
          />
          <div className="text-sm">
            <div className="text-black font-medium">John Doe</div>
            <div className="text-gray-500 text-xs">john.doe@companyname.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperTab;
