import Spreadsheet from "./components/Spreadsheet";
import UpperTab from "./components/UpperTab";
import MiddleTab from "./components/MiddleTab";



const App = () => {
  return (
    <div className="w-full h-full bg-white font-sans">
      <UpperTab />
       <MiddleTab />
      <Spreadsheet />

    </div>
  );
};

export default App;
