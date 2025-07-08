import { useState, useRef } from "react";
import { FiEdit3 } from "react-icons/fi";
import { spreadsheetData } from "../data/spreadsheetData";
import LowermostTab from "./LowermostTab";
import { FaAngleDown, FaCalendarAlt, FaGlobe } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbUserFilled } from "react-icons/tb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const columns = [
  { header: "#", key: "index" },
  { header: "Job Request", key: "jobRequest" },
  { header: "Submitted", key: "submitted" },
  { header: "Status", key: "status" },
  { header: "Submitter", key: "submitter" },
  { header: "URL", key: "url" },
  { header: "Assigned", key: "assigned" },
  { header: "Priority", key: "priority" },
  { header: "Due Date", key: "dueDate" },
  { header: "Est. Value", key: "estValue" },
];

const defaultColumnWidths = {
  index: 32,
  jobRequest: 265,
  submitted: 124,
  status: 124,
  submitter: 124,
  url: 124,
  assigned: 124,
  priority: 125,
  dueDate: 124,
  estValue: 124,
};

const Spreadsheet = () => {
  const [data, setData] = useState(() => {
    const blank = {
      jobRequest: "",
      submitted: "",
      status: "",
      submitter: "",
      url: "",
      assigned: "",
      priority: "",
      dueDate: "",
      estValue: "",
    };
    return [
      ...spreadsheetData.slice(0, 5),
      ...Array.from({ length: 995 }, () => ({ ...blank })),
    ];
  });

  const [activeCell, setActiveCell] = useState({ row: -1, col: -1 });
  const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key)
  );
  const inputRefs = useRef({});

  const handleChange = (rowIdx, key, value) => {
    setData((prev) => {
      const updated = [...prev];
      updated[rowIdx] = { ...updated[rowIdx], [key]: value };
      return updated;
    });
  };

  const handleKeyDown = (e, rowIdx, colIdx) => {
    const visibleCols = columns.filter((col) =>
      visibleColumns.includes(col.key)
    );
    const totalCols = visibleCols.length - 1;

    if (e.key === "ArrowRight" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      const nextCol = colIdx + 1 > totalCols ? 0 : colIdx + 1;
      const nextIndex = `${rowIdx}-${nextCol}`;
      inputRefs.current[nextIndex]?.focus();
      setActiveCell({ row: rowIdx, col: nextCol });
    } else if (e.key === "ArrowLeft" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      const prevCol = colIdx - 1 < 0 ? totalCols : colIdx - 1;
      const prevIndex = `${rowIdx}-${prevCol}`;
      inputRefs.current[prevIndex]?.focus();
      setActiveCell({ row: rowIdx, col: prevCol });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const downIndex = `${rowIdx + 1}-${colIdx}`;
      inputRefs.current[downIndex]?.focus();
      setActiveCell({ row: rowIdx + 1, col: colIdx });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const upIndex = `${rowIdx - 1}-${colIdx}`;
      inputRefs.current[upIndex]?.focus();
      setActiveCell({ row: rowIdx - 1, col: colIdx });
    }
  };

  const handleMouseDown = (e, key) => {
    const startX = e.clientX;
    const startWidth = columnWidths[key];

    const handleMouseMove = (e) => {
      const newWidth = Math.max(32, startWidth + (e.clientX - startX));
      setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const toggleColumnVisibility = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const visibleCols = columns.filter((col) => visibleColumns.includes(col.key));

  return (
    <div className="flex flex-col h-[90vh] text-sm">
      <div className="flex flex-wrap gap-2 px-4 py-2 border-b bg-gray-50">
        {columns.map((col) => (
          <label key={col.key} className="flex items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={visibleColumns.includes(col.key)}
              onChange={() => toggleColumnVisibility(col.key)}
            />
            {col.header}
          </label>
        ))}
      </div>

      <div className="overflow-auto flex-1">
        <table className="w-full border border-collapse">
          <thead className="bg-gray-100 select-none">
            <tr>
              {visibleCols.map((col) => (
                <th
                  key={col.key}
                  className="p-2 border border-gray-200 text-left relative group"
                  style={{ width: columnWidths[col.key] }}
                >
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      {col.key === "jobRequest" && (
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-gray-500"
                        />
                      )}
                      {col.key === "submitted" && (
                        <FaCalendarAlt className="text-gray-500" />
                      )}
                      {col.key === "status" && (
                        <IoIosArrowDropdownCircle className="text-gray-500" />
                      )}
                      {col.key === "submitter" && (
                        <TbUserFilled className="text-gray-500" />
                      )}
                      {col.key === "url" && (
                        <FaGlobe className="text-gray-500" />
                      )}
                      <span>{col.header}</span>
                    </span>

                    {[
                      "jobRequest",
                      "submitted",
                      "status",
                      "submitter",
                      "url",
                    ].includes(col.key) && (
                      <FaAngleDown className="text-xs text-gray-500" />
                    )}
                  </div>

                  <div
                    onMouseDown={(e) => handleMouseDown(e, col.key)}
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent group-hover:bg-gray-300"
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {visibleCols.map((col, colIndex) => {
                  const key = col.key;
                  const id = `${rowIndex}-${colIndex}`;
                  const isActive =
                    activeCell.row === rowIndex && activeCell.col === colIndex;

                  let alignmentClass = "text-left text-black";
                  let extraClass = "";

                  if (key === "index") {
                    alignmentClass = "text-center text-gray-700";
                  } else if (
                    key === "submitted" ||
                    key === "dueDate" ||
                    key === "estValue"
                  ) {
                    alignmentClass = "text-right text-black";
                  } else if (key === "status") {
                    alignmentClass = "text-center font-medium";
                    const status = row[key]?.toLowerCase();
                    if (status === "in-process")
                      extraClass =
                        "bg-yellow-100 text-yellow-800 rounded rounded-2xl px-2 py-1";
                    else if (status === "need to start")
                      extraClass =
                        "bg-blue-100 text-blue-800 rounded-2xl px-2 py-1";
                    else if (status === "complete")
                      extraClass =
                        "bg-green-100 text-green-800 rounded-2xl px-2 py-1";
                    else if (status === "blocked")
                      extraClass =
                        "bg-red-100 text-red-800 rounded-2xl px-2 py-1";
                  } else if (key === "url") {
                    extraClass = "underline";
                  } else if (key === "assigned") {
                    extraClass = "";
                  } else if (key === "priority") {
                    alignmentClass = "text-center";
                    const prio = row[key]?.toLowerCase();
                    if (prio === "medium") extraClass = "text-yellow-600";
                    else if (prio === "high") extraClass = "text-red-600";
                    else if (prio === "low") extraClass = "text-blue-600";
                  } else if (key === "estValue") {
                    extraClass =
                      "flex justify-end items-center gap-1 text-black";
                  }

                  const cellClass = `relative p-1 border border-gray-200 h-[32px] bg-white ${
                    isActive ? "ring-2 ring-green-500" : ""
                  }`;

                  if (key === "index") {
                    return (
                      <td
                        key={key}
                        className={`${cellClass} ${alignmentClass}`}
                      >
                        {rowIndex + 1}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={key}
                      className={`relative h-[32px] bg-white ${alignmentClass} ${key === "assigned" ? "assigned-cell" : "border border-gray-200"} ${isActive ? "ring-2 ring-green-500" : ""} p-1 overflow-hidden whitespace-nowrap truncate`}
                    >
                      {key === "estValue" ? (
                        <span className={`${extraClass} truncate`}>
                          {row[key]}
                          <span className="text-gray-500 ml-1"></span>
                        </span>
                      ) : key === "status" ? (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium truncate inline-block 
        ${extraClass} bg-opacity-80 border border-gray-300`}
                        >
                          {row[key]}
                        </span>
                      ) : key === "priority" ? (
                        <span className={`${extraClass} font-bold truncate`}>
                          {row[key]}
                        </span>
                      ) : (
                        <input
                          type="text"
                          value={row[key] || ""}
                          onChange={(e) =>
                            handleChange(rowIndex, key, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, rowIndex, colIndex)
                          }
                          onFocus={() =>
                            setActiveCell({ row: rowIndex, col: colIndex })
                          }
                          ref={(el) => (inputRefs.current[id] = el)}
                          className={`w-full bg-transparent px-1 py-0.5 outline-none truncate ${extraClass}`}
                          autoComplete="off"
                        />
                      )}
                      {isActive && (
                        <FiEdit3 className="absolute right-1 top-1/2 -translate-y-1/2 text-green-600 text-xs pointer-events-none" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
        <LowermostTab />
      </div>
    </div>
  );
};

export default Spreadsheet;
