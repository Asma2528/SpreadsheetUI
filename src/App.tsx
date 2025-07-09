import Spreadsheet from "./components/Spreadsheet";
import UpperTab from "./components/UpperTab";
import MiddleTab from "./components/MiddleTab";

const App = () => {
  return (
    <div className="w-full max-w-screen overflow-x-hidden">
      <UpperTab />
      <MiddleTab />
      <Spreadsheet />
    </div>
  );
};

export default App;
