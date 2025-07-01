import React, { useState } from "react";
import TrussImg from "/Images/Truss.png";
import JoistImg from "/Images/Joist.png";
import MultiTrussImg from "/Images/Multi-Truss.png";
import { useTranslation } from "react-i18next";

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
  skew?: number;
  slope?: number;
  topFlangeBend?: number;
  topFlangeSlope?: number;
  offsetDirection?: string;
  highLowCenter?: string;
}

interface ParametersPanelProps {
  params: any;
  setParams: any;
  onSearch: () => void;
  country: string;
  onOpenSlopeSkewModal: () => void;
  language?: string;
}

interface SkewSlopeSliderProps {
  title: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (v: number) => void;
  marks?: number[];
}

const SkewSlopeSlider: React.FC<SkewSlopeSliderProps> = ({
  title,
  min = 0,
  max = 100,
  value,
  onChange,
  marks = [],
}) => {
  const markPosition = (mark: number) => ((mark - min) / (max - min)) * 100;
  const { t } = useTranslation();

  return (
    <label className="flex flex-col w-full select-none">
      <span className="font-semibold mb-1 text-sm">{t(title)}</span>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-grow"
          list={`${title.replace(/\s+/g, "")}Marks`}
        />

        <output className="w-14 text-right text-xs font-mono tabular-nums">
          {value}°
        </output>
      </div>

      {marks.length > 0 && (
        <>
          <div className="relative w-full flex justify-between text-xs text-gray-600 mt-1 select-none">
            <span>{min}</span>
            <span className="absolute left-1/2 -translate-x-1/2">0</span>
            <span>{max}</span>
          </div>

          <div className="relative w-full mt-[-14px] h-2 pointer-events-none">
            {marks.map((mark) => (
              <div
                key={mark}
                className="absolute top-0 w-px h-3 bg-gray-400"
                style={{ left: `${markPosition(mark)}%` }}
              />
            ))}
          </div>

          <datalist id={`${title.replace(/\s+/g, "")}Marks`}>
            {marks.map((m) => (
              <option key={m} value={m} label={m.toString()} />
            ))}
          </datalist>
        </>
      )}
    </label>
  );
};

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  params,
  setParams,
  onSearch,
  country,
  onOpenSlopeSkewModal,
}) => {
  const { t } = useTranslation();

  // Manage collapsible sections open/close state
  const [openSections, setOpenSections] = useState({
    connectionType: true,
    jobSettings: true,
    headerMember: true,
    joistMember: true,
    hangerOptions: false, // initially closed
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Fixed hanger types for all countries
  const hangerTypes = [
    t("parametersPanel.hangerTypes.allTypes"),
    t("parametersPanel.hangerTypes.faceMount"),
    t("parametersPanel.hangerTypes.topFlange"),
    t("parametersPanel.hangerTypes.concealedFlange"),
  ];

  // Load Duration options based on country
  const usaLoadDurations = [
    t("parametersPanel.loadDurations.dead90"),
    t("parametersPanel.loadDurations.floor100"),
    t("parametersPanel.loadDurations.snow115"),
    t("parametersPanel.loadDurations.roof125"),
    t("parametersPanel.loadDurations.quakeWind160"),
  ];
  const canadaLoadDurations = [
    t("parametersPanel.loadDurations.standardTerm1"),
  ];

  // Determine options and disabled status dynamically
  const isCanada = country === "Canada";
  const isUSA = country === "USA";

  const loadDurationOptions = isUSA
    ? usaLoadDurations
    : isCanada
    ? canadaLoadDurations
    : usaLoadDurations; // fallback to USA options for other countries

  const upliftDurations = isUSA
    ? [
        t("parametersPanel.upliftDurations.quakeWind160"),
        t("parametersPanel.upliftDurations.normal100"),
      ]
    : isCanada
    ? [
        t("parametersPanel.upliftDurations.standardTerm1"),
        t("parametersPanel.upliftDurations.shortTerm115"),
      ]
    : [
        t("parametersPanel.upliftDurations.shortTerm115"),
        t("parametersPanel.upliftDurations.mediumTerm15"),
      ];

  return (
    <div className="max-h-[calc(100vh+20px)] overflow-y-auto px-4 pb-20">
      <div className="text-xs font-sans">
        {/* INPUT Header */}
        <div className="uppercase font-bold text-gray-600 mb-2 tracking-wide">
          {t("parametersPanel.inputHeader")}
        </div>

        {/* CONNECTION TYPE */}
        <section className="mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("connectionType")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              {t("parametersPanel.sections.connectionType")}
            </span>
            <span className="text-orange-700 text-lg">
              {openSections.connectionType ? "▼" : "▶"}
            </span>
          </header>
          {openSections.connectionType && (
            <div className="p-3 grid grid-cols-3 gap-2">
              {[
                {
                  key: "Joist",
                  label: t("parametersPanel.connectionOptions.joist"),
                  image: JoistImg,
                },
                {
                  key: "Truss",
                  label: t("parametersPanel.connectionOptions.truss"),
                  image: TrussImg,
                },
                {
                  key: "Multi-Truss",
                  label: t("parametersPanel.connectionOptions.multiTruss"),
                  image: MultiTrussImg,
                },
              ].map((opt) => {
                const isSelected = params.connectionType === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() =>
                      setParams({ ...params, connectionType: opt.key })
                    }
                    className={`relative flex flex-col items-center justify-center rounded p-2 text-center transition ${
                      isSelected
                        ? "border-2 border-orange-600 text-orange-900"
                        : "border border-gray-300 hover:border-orange-400"
                    }`}
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
              {t("parametersPanel.sections.jobSettings")}
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
                  {t("parametersPanel.labels.hangerType")}
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

              {/* Load Duration */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1 flex items-center">
                  {t("parametersPanel.labels.loadDuration")}
                  <span className="ml-1 text-gray-400 cursor-help relative group">
                    ?
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-1 w-72 bg-white border border-gray-400 rounded p-2 text-[10px] text-gray-900 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-50"
                      role="tooltip"
                    >
                      {t("parametersPanel.tooltips.loadDuration")}
                    </div>
                  </span>
                </span>
                <select
                  disabled={isCanada}
                  value={params.downloadDuration}
                  onChange={(e) =>
                    setParams({ ...params, downloadDuration: e.target.value })
                  }
                  className={`border border-gray-300 rounded px-2 py-1 text-xs ${
                    isCanada
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loadDurationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              {/* Uplift Duration */}
              <label className="flex flex-col relative">
                <span className="font-semibold mb-1 flex items-center">
                  {t("parametersPanel.labels.upliftDuration")}
                  <span className="ml-1 text-gray-400 cursor-help relative group">
                    ?
                    <div
                      className="absolute z-50 top-full left-0 mt-1 w-[18rem] max-w-[90vw] bg-white border border-gray-400 rounded p-2 shadow-xl text-[10px] text-gray-900 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                      role="tooltip"
                    >
                      {t("parametersPanel.tooltips.upliftDuration")}
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
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.jobId")}
                </span>
                <input
                  type="text"
                  value={params.jobId || "Job 1"} // "Job 1" as default placeholder
                  onChange={(e) =>
                    setParams({ ...params, jobId: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                />
              </label>

              {/* Quantity */}
              <label className="flex flex-col col-span-2">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.quantity")}
                </span>
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
              {t("parametersPanel.sections.headerMember")}
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
                  {t("parametersPanel.labels.memberType")}
                  <span
                    className="ml-1 text-gray-400 cursor-help"
                    title={t("parametersPanel.tooltips.memberType")}
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
                  {[
                    "solidSawn",
                    "glulam",
                    "laminatedStrandLumber",
                    "laminatedVeneerLumber",
                    "parallelStrandLumber",
                    "iJoist",
                    "floorTruss",
                    "ledger",
                    "masonryMidWall",
                    "masonryTopOfWall",
                    "concrete",
                    "structuralSteel",
                    "nailer",
                    "wallSheathedFlush",
                    "wallSheathedGap",
                    "wallDrywallFlush",
                    "wallDrywallFlushStud",
                    "wallDrywallGap",
                  ].map((key) => (
                    <option
                      key={key}
                      value={t(`parametersPanel.memberTypes.${key}`)}
                    >
                      {t(`parametersPanel.memberTypes.${key}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Lumber Species */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.lumberSpecies")}
                </span>
                <select
                  value={params.lumberSpecies}
                  onChange={(e) =>
                    setParams({ ...params, lumberSpecies: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {["df", "sp", "spSouthernPine", "spf"].map((key) => (
                    <option
                      key={key}
                      value={t(`parametersPanel.lumberSpecies.${key}`)}
                    >
                      {t(`parametersPanel.lumberSpecies.${key}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Width */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.width")}
                </span>
                <select
                  value={params.width}
                  onChange={(e) =>
                    setParams({ ...params, width: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {["2x", "3x"].map((key) => (
                    <option
                      key={key}
                      value={t(`parametersPanel.widths.${key}`)}
                    >
                      {t(`parametersPanel.widths.${key}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Depth */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.depth")}
                </span>
                <select
                  value={params.depth}
                  onChange={(e) =>
                    setParams({ ...params, depth: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {["6", "8"].map((key) => (
                    <option
                      key={key}
                      value={t(`parametersPanel.depths.${key}`)}
                    >
                      {t(`parametersPanel.depths.${key}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Number of Plies */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.numberOfPlies")}
                </span>
                <select
                  value={params.numberOfPlies}
                  onChange={(e) =>
                    setParams({ ...params, numberOfPlies: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {["1", "2", "3"].map((key) => (
                    <option key={key} value={key}>
                      {t(`parametersPanel.numberOfPlies.${key}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Member ID */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.memberId")}
                </span>
                <input
                  type="text"
                  value={params.memberId || "Joist 1"}
                  onChange={(e) =>
                    setParams({ ...params, memberId: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                />
              </label>

              {/* Rough Sawn Lumber */}
              <label className="flex items-center gap-2 col-span-2 mt-2">
                <input
                  type="checkbox"
                  checked={params.lumberFinishRoughSawn}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      lumberFinishRoughSawn: e.target.checked,
                    })
                  }
                />
                <span className="text-xs">
                  {t("parametersPanel.labels.roughSawnLumber")}
                </span>
              </label>
            </div>
          )}
        </section>

        {/* JOIST MEMBER (when connectionType is Joist) */}
        {params.connectionType === "Joist" && (
          <section className="mb-4 border border-orange-300 rounded">
            <header
              className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
              onClick={() => toggleSection("joistMember")}
            >
              <span className="font-semibold uppercase text-orange-700 tracking-wide">
                {t("parametersPanel.sections.joistMember")}
              </span>
              <span className="text-orange-700 text-lg">
                {openSections.joistMember ? "▼" : "▶"}
              </span>
            </header>
            {openSections.joistMember && (
              <div className="p-3 grid grid-cols-1 gap-4">
                {/* Slope and Skew button */}
                <button
                  onClick={onOpenSlopeSkewModal}
                  className="rounded bg-orange-400 hover:bg-orange-500 text-white px-2 py-1 w-full"
                >
                  {t("parametersPanel.labels.slopeSkewButton")}
                </button>

                {/* Slope */}
                <SkewSlopeSlider
                  title="parametersPanel.labels.slope"
                  min={-45}
                  max={45}
                  value={params.slope ?? 0}
                  onChange={(v) => setParams({ ...params, slope: v })}
                  marks={[-45, -30, -15, 0, 15, 30, 45]}
                />

                {/* Skew */}
                <SkewSlopeSlider
                  title="parametersPanel.labels.skew"
                  min={-45}
                  max={45}
                  value={params.skew ?? 0}
                  onChange={(v) => setParams({ ...params, skew: v })}
                  marks={[-45, -30, -15, 0, 15, 30, 45]}
                />
              </div>
            )}
          </section>
        )}

        {/* HANGER OPTIONS */}
        <section className="mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("hangerOptions")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              {t("parametersPanel.sections.hangerOptions")}
            </span>
            <span className="text-orange-700 text-lg">
              {openSections.hangerOptions ? "▼" : "▶"}
            </span>
          </header>
          {openSections.hangerOptions && (
            <div className="p-3 grid grid-cols-1 gap-3">
              {/* Top Flange Bend */}
              <SkewSlopeSlider
                title="parametersPanel.labels.topFlangeBend"
                min={-45}
                max={45}
                value={params.topFlangeBend ?? 0}
                onChange={(v) => setParams({ ...params, topFlangeBend: v })}
                marks={[-45, -30, -15, 0, 15, 30, 45]}
              />

              {/* Top Flange Slope */}
              <SkewSlopeSlider
                title="parametersPanel.labels.topFlangeSlope"
                min={-45}
                max={45}
                value={params.topFlangeSlope ?? 0}
                onChange={(v) => setParams({ ...params, topFlangeSlope: v })}
                marks={[-45, -30, -15, 0, 15, 30, 45]}
              />

              {/* Offset Direction */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.offsetDirection")}
                </span>
                <select
                  value={params.offsetDirection ?? ""}
                  onChange={(e) =>
                    setParams({ ...params, offsetDirection: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  <option value="">
                    {t(
                      "parametersPanel.offsetDirectionOptions.centeredNoOffset"
                    )}
                  </option>
                  <option value="Left">
                    {t("parametersPanel.offsetDirectionOptions.rightFlushLeft")}
                  </option>
                  <option value="Right">
                    {t("parametersPanel.offsetDirectionOptions.leftFlushRight")}
                  </option>
                </select>
              </label>

              {/* High-Low Center */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("parametersPanel.labels.highLowCenter")}
                </span>
                <select
                  value={params.highLowCenter ?? ""}
                  onChange={(e) =>
                    setParams({ ...params, highLowCenter: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  <option value="Center">
                    {t("parametersPanel.highLowCenterOptions.center")}
                  </option>
                  <option value="High">
                    {t("parametersPanel.highLowCenterOptions.high")}
                  </option>
                  <option value="Low">
                    {t("parametersPanel.highLowCenterOptions.low")}
                  </option>
                </select>
              </label>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ParametersPanel;
