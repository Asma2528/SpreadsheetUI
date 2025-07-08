import React from "react";

const Toolbar = () => {
  return (
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <div className="text-sm text-gray-500">Workspace &gt; Folder 2 &gt; Spreadsheet 3</div>
      <div className="space-x-2">
        <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100">Import</button>
        <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100">Export</button>
        <button className="px-3 py-1 border rounded bg-white text-white bg-green-600 hover:bg-green-700">+ New Action</button>
      </div>
    </div>
  );
};

export default Toolbar;