import React, { useState, useEffect } from "react";
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
  country: string; // new prop for country
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  params,
  setParams,
  onSearch,
  country,
}) => {
  // Manage collapsible sections open/close state
  const [openSections, setOpenSections] = useState({
    connectionType: true,
    jobSettings: true,
    headerMember: true,
    joistMember: true,
    hangerOptions: true, // initially closed
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Fixed hanger types for all countries
  const hangerTypes = [
    "All Types",
    "Face Mount",
    "Top Flange",
    "Concealed Flange",
  ];

  // Load Duration options based on country
  const usaLoadDurations = [
    "Dead (90)",
    "Floor (100)",
    "Snow (115)",
    "Roof (125)",
    "Quake/Wind (160)",
  ];
  const canadaLoadDurations = ["Standard Term 1.00"];

  // Determine options and disabled status dynamically
  const isCanada = country === "Canada";
  const isUSA = country === "USA";

  const loadDurationOptions = isUSA
    ? usaLoadDurations
    : isCanada
    ? canadaLoadDurations
    : usaLoadDurations; // fallback to USA options for other countries

  // Reset load duration if current value no longer valid for selected country
  useEffect(() => {
    if (!loadDurationOptions.includes(params.downloadDuration)) {
      setParams((prev) => ({
        ...prev,
        downloadDuration: loadDurationOptions[0],
      }));
    }
  }, [country]);

  // Other dropdown options
  const upliftDurations = isUSA
    ? ["Quake/Wind (160)", "Normal (100)"]
    : isCanada
    ? ["Standard Term 1.00", "Short Term 1.15"]
    : ["Short Term 1.15", "Medium Term 1.5"]; // fallback

  const memberTypes = ["Solid Sawn", "Engineered"];
  const lumberSpecies = ["DF (Douglas Fir)", "SP (Spruce)"];
  const widths = ['2x (1 1/2")', '3x (2 1/2")'];
  const depths = ['6 (5 1/2")', '8 (7 1/4")'];
  const numberOfPlies = ["1", "2", "3"];

  return (
    <div className="text-xs font-sans overflow-y-auto max-h-screen">
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
                {
                  key: "Truss",
                  label: "Truss (Flush Bottom)",
                  image: TrussImg,
                },
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
                    className={relative flex flex-col items-center justify-center rounded p-2 text-center transition
                            ${
                              isSelected
                                ? "border-2 border-orange-600 text-orange-900"
                                : "border border-gray-300 hover:border-orange-400"
                            }}
                    style={{ backgroundColor: "#f4f4f4" }}
                  >
                    <img
                      src={opt.image}
                      alt={opt.label}
                      className="h-10 mb-1"
                    />
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
              {/* Hanger Type - REMOVE '?' */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1 flex items-center">
                  Hanger Type
                  {/* Removed the '?' icon here */}
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

              {/* Load Duration (tooltip fix applied) */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1 flex items-center">
                  Load Duration
                  <span className="ml-1 text-gray-400 cursor-help relative group">
                    ?
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-1 w-72 bg-white border border-gray-400 rounded p-2 text-[10px] text-gray-900 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-50"
                      role="tooltip"
                    >
                      Duration of load adjustments as specified by the code are
                      as follows:
                      <br />
                      <b>"STANDARD TERM"</b> - (K~d~ = 1.00) design loads where
                      the condition exceeds short term, but is less than
                      long-term. For example snow, live loads and dead loads in
                      combination.
                    </div>
                  </span>
                </span>
                <select
                  disabled={isCanada}
                  value={params.downloadDuration}
                  onChange={(e) =>
                    setParams({ ...params, downloadDuration: e.target.value })
                  }
                  className={border border-gray-300 rounded px-2 py-1 text-xs ${
                    isCanada
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : ""
                  }}
                >
                  {loadDurationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              {/* Uplift Duration (tooltip fix applied) */}
              <label className="flex flex-col relative">
                <span className="font-semibold mb-1 flex items-center">
                  Uplift Duration
                  <span className="ml-1 text-gray-400 cursor-help relative group">
                    ?
                    <div
                      className="absolute z-50 top-full left-0 mt-1 w-[18rem] max-w-[90vw] 
                              bg-white border border-gray-400 rounded p-2 shadow-xl 
                              text-[10px] text-gray-900 
                              opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                      role="tooltip"
                    >
                      <div className="font-semibold mb-1">
                        Duration of load adjustments:
                      </div>
                      <div className="mb-1">
                        <b>"SHORT TERM"</b> – (
                        <i>
                          K<sub>d</sub> = 1.15
                        </i>
                        ): design loads where the condition is not expected to
                        last more than 7 days continuously or cumulatively.
                        Earthquake and wind loads are considered short term.
                      </div>
                      <div>
                        <b>"STANDARD TERM"</b> – (
                        <i>
                          K<sub>d</sub> = 1.00
                        </i>
                        ): loads exceeding short term but less than long term.
                        Example: snow, live loads, dead loads in combination.
                      </div>
                    </div>
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

              {/* Quantity */}
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
                  {["Solid Sawn", "Engineered"].map((opt) => (
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
                  {["DF (Douglas Fir)", "SP (Spruce)"].map((opt) => (
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
                  {['2x (1 1/2")', '3x (2 1/2")'].map((opt) => (
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
                  {['6 (5 1/2")', '8 (7 1/4")'].map((opt) => (
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
                  {["1", "2", "3"].map((opt) => (
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

        {/* JOIST (CARRIED MEMBER) */}
        <section className="mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("joistMember")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              Joist (Carried Member)
            </span>
            <span className="text-orange-700 text-lg">
              {openSections.joistMember ? "▼" : "▶"}
            </span>
          </header>
          {openSections.joistMember && (
            <div className="p-3 grid grid-cols-2 gap-3">
              <label className="flex flex-col">
                <span className="font-semibold mb-1">Member Type</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>Solid Sawn</option>
                  <option>Engineered</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">Lumber Species</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>DF (Douglas Fir)</option>
                  <option>SP (Spruce)</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">Width</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>2x (1 1/2")</option>
                  <option>3x (2 1/2")</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">Depth</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>6 (5 1/2")</option>
                  <option>8 (7 1/4")</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">Downloaded (ASD)</span>
                <input
                  type="number"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  value={0}
                />
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">Uplift (ASD)</span>
                <input
                  type="number"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  value={0}
                />
              </label>
              <label className="flex flex-col col-span-2">
                <span className="font-semibold mb-1">Member ID</span>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  value="Joist 1"
                />
              </label>
              <label className="flex items-center col-span-2 space-x-2 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4" />
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

        {/* HANGER OPTIONS */}
        <section className="mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("hangerOptions")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              Hanger Options
            </span>
            <span className="text-orange-700 text-lg">
              {openSections.hangerOptions ? "▼" : "▶"}
            </span>
          </header>
          {openSections.hangerOptions && (
            <div className="p-3 space-y-3">
              <div className="inline-block bg-orange-600 text-white text-xs px-4 py-1 rounded font-bold">
                Slope & Skew Calculator
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="font-semibold mb-1">Skew (Degrees)</span>
                  <input type="range" min={-45} max={45} defaultValue={0} />
                </label>
                <label className="flex flex-col">
                  <span className="font-semibold mb-1">Slope (Degrees)</span>
                  <input type="range" min={-45} max={45} defaultValue={0} />
                </label>
                <label className="flex flex-col">
                  <span className="font-semibold mb-1">
                    Top Flange Bend (Degrees)
                  </span>
                  <input type="range" min={0} max={30} defaultValue={0} />
                </label>
                <label className="flex flex-col">
                  <span className="font-semibold mb-1">
                    Top Flange Slope (Degrees)
                  </span>
                  <input type="range" min={-45} max={45} defaultValue={0} />
                </label>
                <label className="flex flex-col">
                  <span className="font-semibold mb-1">Offset Direction</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option>Centered (No Offset)</option>
                    <option>Left</option>
                    <option>Right</option>
                  </select>
                </label>
                <label className="flex flex-col">
                  <span className="font-semibold mb-1">
                    High, Low, Center Flush
                  </span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                    <option>Center</option>
                    <option>High</option>
                    <option>Low</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ParametersPanel;