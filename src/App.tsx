import React from "react";
import Spreadsheet from "./components/Spreadsheet";
import UpperTab from "./components/UpperTab";
import LowerTab from "./components/LowerTab";
import MiddleTab from "./components/MiddleTab";



const App = () => {
  return (
    <div className="w-full h-full font-sans bg-white bg-white font-sans">
      <UpperTab />
       <MiddleTab />
       <LowerTab />
      <Spreadsheet />

    </div>
  );
};

export default App;
