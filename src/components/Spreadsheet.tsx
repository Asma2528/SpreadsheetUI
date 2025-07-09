// Spreadsheet.tsx
import { useState, useRef } from "react";
import { FiEdit3, FiRefreshCw, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { FaAngleDown, FaCalendarAlt, FaGlobe } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbUserFilled, TbArrowsSplit } from "react-icons/tb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { spreadsheetData } from "../data/spreadsheetData";
import LowerTab from "./LowerTab";
import { useEffect } from "react";
import { MdOutlineLegendToggle } from "react-icons/md";
type SpreadsheetRow = {
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: string;
  empty?: string;
  [key: string]: string | undefined;
};

type ColumnKey =
  | "index"
  | "jobRequest"
  | "submitted"
  | "status"
  | "submitter"
  | "url"
  | "assigned"
  | "priority"
  | "dueDate"
  | "estValue"
  | string;

const defaultColumns: { header: string; key: ColumnKey }[] = [
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

const emptyColumnKey = "empty";
const emptyColumn = { header: "", key: emptyColumnKey };

defaultColumns.push(emptyColumn);

const defaultColumnWidths: Record<string, number> = {
  jobRequest: 265,
  submitted: 124,
  status: 124,
  submitter: 124,
  url: 124,
  assigned: 124,
  priority: 125,
  dueDate: 124,
  estValue: 124,
  empty: 124,
};

const Spreadsheet = () => {
  const [columns, setColumns] = useState(defaultColumns);
  const [visibleColumns, setVisibleColumns] = useState<Set<ColumnKey>>(
    new Set(defaultColumns.map((col) => col.key))
  );
  const [data, setData] = useState<SpreadsheetRow[]>(() => {
    const blank: SpreadsheetRow = {
      jobRequest: "",
      submitted: "",
      status: "",
      submitter: "",
      url: "",
      assigned: "",
      priority: "",
      dueDate: "",
      estValue: "",
      empty: "",
    };
    return [
      ...spreadsheetData.slice(0, 5),
      ...Array.from({ length: 995 }, () => ({ ...blank })),
    ];
  });

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [activeCell, setActiveCell] = useState({ row: -1, col: -1 });
  const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
  const [toggleOpen, setToggleOpen] = useState(false);

  const handleChange = (
    rowIdx: number,
    key: keyof SpreadsheetRow,
    value: string
  ) => {
    setData((prev) => {
      const updated = [...prev];
      updated[rowIdx] = { ...updated[rowIdx], [key]: value };
      return updated;
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIdx: number,
    colIdx: number
  ) => {
    const totalCols = columns.length - 1;

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

  const handleMouseDown = (e: React.MouseEvent, key: ColumnKey) => {
    const startX = e.clientX;
    const startWidth = columnWidths[key];

    const handleMouseMove = (e: MouseEvent) => {
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

  const handleColumnToggle = (key: ColumnKey) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const handlePlusClick = () => {
    const newKey = `newCol${columns.length}`;
    setColumns([...columns, { header: "New Column", key: newKey }]);
    setVisibleColumns((prev) => new Set(prev).add(newKey));
    setData((prev) => prev.map((row) => ({ ...row, [newKey]: "" })));
    setColumnWidths((prev) => ({ ...prev, [newKey]: 124 }));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-between items-center text-sm w-full border-t border-gray-300 ">
        <div className="relative flex flex-row">
          <div
            className="w-[47px] h-10 flex justify-center items-center cursor-pointer"
            onClick={() => setToggleOpen(!toggleOpen)}
          >
            <MdOutlineLegendToggle className="text-xl text-gray-700" />
          </div>

          {toggleOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-8 left-0 z-50 w-56 max-h-64 overflow-auto bg-white border border-gray-300 rounded shadow-lg p-2 space-y-1 text-sm"
            >
              <div className="font-semibold text-gray-600 border-b pb-1 mb-1">
                Toggle Columns
              </div>
              {[...columns].map((col) =>
                col.key === "index" || col.key === "empty" ? null : (
                  <label
                    key={col.key}
                    className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.has(col.key)}
                      onChange={() => handleColumnToggle(col.key)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700 truncate">{col.header}</span>
                  </label>
                )
              )}
            </div>
          )}

          {/* Left Toggle + Overview */}
          <div
            className="flex bg-gray-200 py-1  my-0"
            style={{ width: 268 + 125 + 125 + 125 + 37 }}
          >
            <div
              className="flex items-center bg-gray-100 px-2 py-1 my-0.5 ml-1 rounded-sm relative cursor-pointer hover:bg-gray-300"
              // jobRequest + submitted + status + submitter
            >
              <img
                src="/public/download.png"
                alt="icon"
                className="w-4 h-4 mr-1"
              />
              <span className="text-gray-600 text-xs">
                Q3 Financial Overview
              </span>
              <FiRefreshCw className="absolute rotate-90 -right-6 text-red-500 text-sm" />
            </div>
          </div>
        </div>  

        {/* Right Controls */}
        <div className="flex m-0 gap-x-[0.5px] items-center mr-2">
          <div className="w-[130px] bg-[#D2E0D4] px-2 py-2.5 justify-center cursor-pointer hover:bg-[#b0c5b7] flex items-center">
            <TbArrowsSplit className="text-gray-400 rotate-90" />
            <span className="text-gray-800 font-semibold text-sm px-1">
              ABC
            </span>
            <FiMoreHorizontal className="text-gray-400 text-sm" />
          </div>

          <div className="w-[260px] bg-[#DCCFFC] justify-center px-2 py-2.5  cursor-pointer hover:bg-[#c3b0f5] flex items-center">
            <TbArrowsSplit className="text-white rotate-90" />
            <span className="text-gray-800 font-semibold text-sm px-1">
              Answer a question
            </span>
            <FiMoreHorizontal className="text-gray-400 text-sm" />
          </div>

          <div className="w-[130px] bg-[#FAC2AF] justify-center px-2 py-2.5 cursor-pointer hover:bg-[#e9a995] flex items-center">
            <TbArrowsSplit className="text-white rotate-90" />
            <span className="text-gray-800 font-semibold text-sm px-1">
              Extract
            </span>
            <FiMoreHorizontal className="text-gray-400 text-sm" />
          </div>

          <div
            className="flex items-center justify-center w-[130px] bg-[#e6e6e6] px-2 py-3 cursor-pointer hover:bg-[#cfcfcf] mr-2"
            onClick={handlePlusClick}
          >
            <FiPlus className="text-gray-700 text-center  text-base" />
          </div>
        </div>
      </div>

      <div className="flex flex-col h-[90vh] text-sm">
        <div className="overflow-auto flex-1">
          <table className="w-full border border-collapse">
            <thead className="bg-gray-100 select-none">
              <tr>
                {columns.map((col) => {
                  if (!visibleColumns.has(col.key)) return null;

                  return (
                    <th
                      key={col.key}
                      className={`p-2 text-left relative group border-white border-[0.5px] ${
                        col.key === "assigned"
                          ? "bg-[#E8F0E9]"
                          : col.key === "priority" || col.key === "dueDate"
                          ? "bg-[#EAE3FC]"
                          : col.key === "estValue"
                          ? "bg-[#FFE9E0]"
                          : "bg-gray-100"
                      }`}
                      style={{
                        width:
                          col.key === "index"
                            ? 30
                            : columnWidths[
                                col.key as keyof typeof columnWidths
                              ] || 124,
                      }}
                    >
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="flex items-center gap-1">
                          {col.key === "jobRequest" && (
                            <FontAwesomeIcon icon={faBriefcase} />
                          )}
                          {col.key === "submitted" && <FaCalendarAlt />}
                          {col.key === "status" && <IoIosArrowDropdownCircle />}
                          {col.key === "submitter" && <TbUserFilled />}
                          {col.key === "assigned" && (
                            <img
                              src="/public/assigned-icon.png"
                              className="w-5 h-5"
                            />
                          )}
                          {col.key === "url" && <FaGlobe />}
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

                      {col.key !== "index" && (
                        <div
                          onMouseDown={(e) => handleMouseDown(e, col.key)}
                          className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent group-hover:bg-gray-300"
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => {
                    if (!visibleColumns.has(col.key)) return null;

                    const key = col.key;
                    if (key === emptyColumnKey) {
                      return (
                        <td key={key} className=" border border-gray-200"></td>
                      );
                    }

                    const id = `${rowIndex}-${colIndex}`;
                    const isActive =
                      activeCell.row === rowIndex &&
                      activeCell.col === colIndex;

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
                      if (key === "estValue") {
                        extraClass =
                          "flex justify-end items-center gap-1 text-black";
                      }
                    } else if (key === "status") {
                      alignmentClass = "text-center font-medium";
                      const status = row[key]?.toLowerCase();
                      if (status === "in-process")
                        extraClass =
                          "bg-yellow-100 text-yellow-800 rounded-2xl px-2 py-1";
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
                    } else if (key === "priority") {
                      alignmentClass = "text-center";
                      const prio = row[key]?.toLowerCase();
                      if (prio === "medium") extraClass = "text-yellow-600";
                      else if (prio === "high") extraClass = "text-red-600";
                      else if (prio === "low") extraClass = "text-blue-600";
                    }

                    const cellClass = `relative p-1 h-[32px] bg-white ${
                      key === "assigned"
                        ? "assigned-cell"
                        : "border border-gray-200"
                    } ${alignmentClass} ${
                      isActive ? "ring-2 ring-green-500" : ""
                    } overflow-hidden whitespace-nowrap truncate`;

                    if (key === "index") {
                      return (
                        <td key={key} className={cellClass}>
                          {rowIndex + 1}
                        </td>
                      );
                    }

                    return (
                      <td key={key} className={cellClass}>
                        {key === "estValue" ? (
                          row[key] ? (
                            <span
                              className={`${extraClass} truncate flex items-center`}
                            >
                              {row[key].replace("₹", "").trim()}
                              <span className="text-gray-500 ml-1">₹</span>
                            </span>
                          ) : (
                            <span className={`${extraClass} truncate`}></span>
                          )
                        ) : key === "status" ? (
                          row[key] ? (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium truncate inline-block 
                            ${extraClass} bg-opacity-80 border border-gray-300`}
                            >
                              {row[key]}
                            </span>
                          ) : null
                        ) : key === "priority" ? (
                          <span className={`${extraClass} font-bold truncate`}>
                            {row[key]}
                          </span>
                        ) : (
                          <input
                            type="text"
                            value={row[key] || ""}
                            onChange={(e) =>
                              handleChange(
                                rowIndex,
                                key as keyof SpreadsheetRow,
                                e.target.value
                              )
                            }
                            onKeyDown={(e) =>
                              handleKeyDown(e, rowIndex, colIndex)
                            }
                            onFocus={() =>
                              setActiveCell({ row: rowIndex, col: colIndex })
                            }
                            ref={(el) => {
                              inputRefs.current[id] = el;
                            }}
                            className={`w-full bg-transparent px-1 py-0.5 outline-none truncate ${extraClass}`}
                            autoComplete="off"
                          />
                        )}
                        {isActive &&
                          !["status", "priority", "estValue"].includes(key) && (
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

        {/* Sticky Bottom Tab */}
        <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
          <LowerTab />
        </div>
      </div>
    </>
  );
};

export default Spreadsheet;
