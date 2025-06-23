import React, { useState } from "react";
import TrussImg from "/Images/Truss.png";
import JoistImg from "/Images/Joist.png";
import MultiTrussImg from "/Images/Multi-Truss.png";

interface Parameters {
  connectionType: "Joist" | "Truss" | "Multi-Truss" | "";
  hangerType: string;
  downloadDuration: string;
  upliftDuration: string;
  jobId: string;
  quantity: number;
  memberType: string;
  lumberSpecies: string;
  width: string;
  depth: string;
  numberOfPlies: string;
  memberId: string;
  lumberFinishRoughSawn: boolean;
}

interface ParametersPanelProps {
  params: Parameters;
  setParams: React.Dispatch<React.SetStateAction<Parameters>>;
  onSearch: () => void;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  params,
  setParams,
  onSearch,
}) => {
  // Manage collapsible sections open/close state
  const [openSections, setOpenSections] = useState({
    connectionType: true,
    jobSettings: true,
    headerMember: true,
    joistMember: false, // initially closed
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Sample options for dropdowns (simplified)
  const hangerTypes = ["All Types", "Type A", "Type B"];
  const downloadDurations = ["Standard Term 1.00"];
  const upliftDurations = ["Short Term 1.15", "Medium Term 1.5"];
  const memberTypes = ["Solid Sawn", "Engineered"];
  const lumberSpecies = ["DF (Douglas Fir)", "SP (Spruce)"];
  const widths = ['2x (1 1/2")', '3x (2 1/2")'];
  const depths = ['6 (5 1/2")', '8 (7 1/4")'];
  const numberOfPlies = ["1", "2", "3"];

  return (
    <div className="text-xs font-sans">
      {/* INPUT Header */}
      <div className="uppercase font-bold text-gray-600 mb-2 tracking-wide">
        INPUT
      </div>

      {/* CONNECTION TYPE */}
      <section className="mb-4 border border-orange-300 rounded">
        <header
          className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
          onClick={() => toggleSection("connectionType")}
        >
          <span className="font-semibold uppercase text-orange-700 tracking-wide">
            Connection Type
          </span>
          <span className="text-orange-700 text-lg">
            {openSections.connectionType ? "▼" : "▶"}
          </span>
        </header>
        {openSections.connectionType && (
          <div className="p-3 grid grid-cols-3 gap-2">
            {[
              { key: "Joist", label: "Joist (Flush Top)", image: JoistImg },
              { key: "Truss", label: "Truss (Flush Bottom)", image: TrussImg },
              {
                key: "Multi-Truss",
                label: "Multi-Truss (Flush Bottom)",
                image: MultiTrussImg,
              },
            ].map((opt) => {
              const isSelected = params.connectionType === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() =>
                    setParams({ ...params, connectionType: opt.key as any })
                  }
                  className={`relative flex flex-col items-center justify-center rounded p-2 text-center transition
                            ${
                              isSelected
                                ? "border-2 border-orange-600 text-orange-900"
                                : "border border-gray-300 hover:border-orange-400"
                            }`}
                  style={{ backgroundColor: "#f4f4f4" }}
                >
                  <img src={opt.image} alt={opt.label} className="h-10 mb-1" />
                  <div className="text-[10px]">{opt.label}</div>
                  {isSelected && (
                    <span className="absolute top-1 right-1 text-orange-600 text-lg">
                      ✔
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* JOB SETTINGS */}
      <section className="mb-4 border border-orange-300 rounded">
        <header
          className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
          onClick={() => toggleSection("jobSettings")}
        >
          <span className="font-semibold uppercase text-orange-700 tracking-wide">
            Job Settings
          </span>
          <span className="text-orange-700 text-lg">
            {openSections.jobSettings ? "▼" : "▶"}
          </span>
        </header>
        {openSections.jobSettings && (
          <div className="p-3 grid grid-cols-2 gap-3">
            {/* Hanger Type */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1 flex items-center">
                Hanger Type
                <span
                  title="Choose hanger type"
                  className="ml-1 text-gray-400 cursor-help"
                >
                  ?
                </span>
              </span>
              <select
                value={params.hangerType}
                onChange={(e) =>
                  setParams({ ...params, hangerType: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {hangerTypes.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Download Duration (disabled) */}
            <label className="flex flex-col opacity-50">
              <span className="font-semibold mb-1 flex items-center">
                Download Duration
                <span
                  title="Download duration info"
                  className="ml-1 text-gray-400 cursor-help"
                >
                  ?
                </span>
              </span>
              <select
                disabled
                value={params.downloadDuration}
                className="border border-gray-300 rounded px-2 py-1 text-xs bg-gray-100 cursor-not-allowed"
              >
                {downloadDurations.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Uplift Duration */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1 flex items-center">
                Uplift Duration
                <span
                  title="Uplift duration info"
                  className="ml-1 text-gray-400 cursor-help"
                >
                  ?
                </span>
              </span>
              <select
                value={params.upliftDuration}
                onChange={(e) =>
                  setParams({ ...params, upliftDuration: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {upliftDurations.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Job ID */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Job ID</span>
              <input
                type="text"
                value={params.jobId}
                onChange={(e) =>
                  setParams({ ...params, jobId: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              />
            </label>

            {/* Quantity (full width) */}
            <label className="flex flex-col col-span-2">
              <span className="font-semibold mb-1">Quantity</span>
              <input
                type="number"
                min={1}
                value={params.quantity}
                onChange={(e) =>
                  setParams({ ...params, quantity: Number(e.target.value) })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              />
            </label>
          </div>
        )}
      </section>

      {/* HEADER (CARRYING MEMBER) */}
      <section className="mb-4 border border-orange-300 rounded">
        <header
          className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
          onClick={() => toggleSection("headerMember")}
        >
          <span className="font-semibold uppercase text-orange-700 tracking-wide">
            Header (Carrying Member)
          </span>
          <span className="text-orange-700 text-lg">
            {openSections.headerMember ? "▼" : "▶"}
          </span>
        </header>
        {openSections.headerMember && (
          <div className="p-3 grid grid-cols-2 gap-3">
            {/* Member Type */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1 flex items-center">
                Member Type
                <span
                  className="ml-1 text-gray-400 cursor-help"
                  title="Select member type"
                >
                  ?
                </span>
              </span>
              <select
                value={params.memberType}
                onChange={(e) =>
                  setParams({ ...params, memberType: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {memberTypes.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Lumber Species */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Lumber Species</span>
              <select
                value={params.lumberSpecies}
                onChange={(e) =>
                  setParams({ ...params, lumberSpecies: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {lumberSpecies.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Width */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Width</span>
              <select
                value={params.width}
                onChange={(e) =>
                  setParams({ ...params, width: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {widths.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Depth */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Depth</span>
              <select
                value={params.depth}
                onChange={(e) =>
                  setParams({ ...params, depth: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {depths.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Number of Plies */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Number of Plies</span>
              <select
                value={params.numberOfPlies}
                onChange={(e) =>
                  setParams({ ...params, numberOfPlies: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {numberOfPlies.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            {/* Member ID */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Member ID</span>
              <input
                type="text"
                value={params.memberId}
                onChange={(e) =>
                  setParams({ ...params, memberId: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              />
            </label>

            {/* Lumber Finish (checkbox) */}
            <label className="flex items-center col-span-2 mt-1 space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={params.lumberFinishRoughSawn}
                onChange={(e) =>
                  setParams({
                    ...params,
                    lumberFinishRoughSawn: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-xs">Rough Sawn</span>
              <span
                title="Rough Sawn finish info"
                className="text-gray-400 cursor-help text-xs"
              >
                ?
              </span>
            </label>
          </div>
        )}
      </section>

      {/* JOIST (CARRIED MEMBER) section can be added here similarly */}

      {/* Search button at bottom */}
      <button
        onClick={onSearch}
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default ParametersPanel;
