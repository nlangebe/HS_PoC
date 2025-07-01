import React, { useState, useEffect } from "react";
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
  params: Parameters;
  setParams: React.Dispatch<React.SetStateAction<Parameters>>;
  onSearch: () => void;
  country: string;
  onOpenSlopeSkewModal: () => void;
  language: string;
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
  max = 0,
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

  const [openSections, setOpenSections] = useState({
    connectionType: true,
    jobSettings: true,
    headerMember: true,
    joistMember: true,
    hangerOptions: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const hangerTypes = [
    t("hangerTypes.allTypes"),
    t("hangerTypes.faceMount"),
    t("hangerTypes.topFlange"),
    t("hangerTypes.concealedFlange"),
  ];

  const usaLoadDurations = [
    t("loadDuration.dead90"),
    t("loadDuration.floor100"),
    t("loadDuration.snow115"),
    t("loadDuration.roof125"),
    t("loadDuration.quakeWind160"),
  ];
  const canadaLoadDurations = [t("loadDuration.standardTerm100")];

  const isCanada = country === "Canada";
  const isUSA = country === "USA";

  const loadDurationOptions = isUSA
    ? usaLoadDurations
    : isCanada
    ? canadaLoadDurations
    : usaLoadDurations;

  useEffect(() => {
    if (!loadDurationOptions.includes(params.downloadDuration)) {
      setParams((prev) => ({
        ...prev,
        downloadDuration: loadDurationOptions[0],
      }));
    }
  }, [country]);

  const upliftDurations = isUSA
    ? ["Quake/Wind (160)", "Normal (100)"]
    : isCanada
    ? ["Standard Term 1.00", "Short Term 1.15"]
    : ["Short Term 1.15", "Medium Term 1.5"];

  const memberTypes = ["Solid Sawn", "Engineered"];
  const lumberSpecies = [
    "DF (Douglas Fir)",
    "SP (Spruce)",
    "SP (Southern Pine)",
    "SPF(Spurce Pine Fir)",
  ];
  const widths = ['2x (1 1/2")', '3x (2 1/2")'];
  const depths = ['6 (5 1/2")', '8 (7 1/4")'];
  const numberOfPlies = ["1", "2", "3"];

  return (
    <div className="max-h-[calc(100vh+20px)] overflow-y-auto px-4 pb-20">
      <div className="text-xs font-sans">
        {/* Load Duration */}
        <label className="flex flex-col">
          <span className="font-semibold mb-1 flex items-center">
            {t("loadDuration.label")}
            <span className="ml-1 text-gray-400 cursor-help relative group">
              ?
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-1 w-72 bg-white border border-gray-400 rounded p-2 text-[10px] text-gray-900 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-50"
                role="tooltip"
              >
                {t("loadDuration.tooltip.standardTerm")}
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
              isCanada ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
            }`}
          >
            {loadDurationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {t(`loadDuration.options.${opt}`)}
              </option>
            ))}
          </select>
        </label>

        {/* Uplift Duration */}
        <label className="flex flex-col relative mt-4">
          <span className="font-semibold mb-1 flex items-center">
            {t("upliftDuration.label")}
            <span className="ml-1 text-gray-400 cursor-help relative group">
              ?
              <div
                className="absolute z-50 top-full left-0 mt-1 w-[18rem] max-w-[90vw] bg-white border border-gray-400 rounded p-2 shadow-xl text-[10px] text-gray-900 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                role="tooltip"
              >
                <div className="font-semibold mb-1">
                  {t("upliftDuration.tooltip.title")}
                </div>
                <div className="mb-1">
                  <b>{t("upliftDuration.tooltip.shortTerm.title")}</b> – (
                  <i>
                    K<sub>d</sub> = 1.15
                  </i>
                  ): {t("upliftDuration.tooltip.shortTerm.description")}
                </div>
                <div>
                  <b>{t("upliftDuration.tooltip.standardTerm.title")}</b> – (
                  <i>
                    K<sub>d</sub> = 1.00
                  </i>
                  ): {t("upliftDuration.tooltip.standardTerm.description")}
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
                {t(`upliftDuration.options.${opt}`)}
              </option>
            ))}
          </select>
        </label>

        {/* Job ID */}
        <label className="flex flex-col mt-4">
          <span className="font-semibold mb-1">{t("jobId.label")}</span>
          <input
            type="text"
            value={params.jobId || t("jobId.default")}
            onChange={(e) => setParams({ ...params, jobId: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </label>

        {/* Quantity */}
        <label className="flex flex-col mt-4">
          <span className="font-semibold mb-1">{t("quantity.label")}</span>
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

        {/* Header (Carrying Member) */}
        <section className="mt-8 mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("headerMember")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              {t("headerMember.title")}
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
                  {t("headerMember.memberType.label")}
                  <span
                    className="ml-1 text-gray-400 cursor-help"
                    title={t("headerMember.memberType.tooltip")}
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
                    "Solid Sawn",
                    "Glulam",
                    "Laminated Strand Lumber",
                    "Laminated Veneer Lumber",
                    "Parallel Strand Lumber",
                    "I-Joist",
                    "Floor Truss",
                    "Ledger",
                    "Masonry - Mid-Wall",
                    "Masonry - Top-of-Wall",
                    "Concrete",
                    "Structural Steel",
                    "Nailer",
                    "Wall, Sheathed Flush",
                    "Wall, Sheathed Gap",
                    "Wall, Drywall Flush",
                    "Wall, Drywall Flush @ Stud",
                    "Wall, Drywall Gap",
                  ].map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`headerMember.memberType.options.${opt}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Lumber Species */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("headerMember.lumberSpecies.label")}
                </span>
                <select
                  value={params.lumberSpecies}
                  onChange={(e) =>
                    setParams({ ...params, lumberSpecies: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {[
                    "DF (Douglas Fir)",
                    "SP (Spruce)",
                    "SP (Southern Pine)",
                    "SPF(Spurce Pine Fir)",
                  ].map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`headerMember.lumberSpecies.options.${opt}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Width */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("headerMember.width.label")}
                </span>
                <select
                  value={params.width}
                  onChange={(e) =>
                    setParams({ ...params, width: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {['2x (1 1/2")', '3x (2 1/2")'].map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`headerMember.width.options.${opt}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Depth */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("headerMember.depth.label")}
                </span>
                <select
                  value={params.depth}
                  onChange={(e) =>
                    setParams({ ...params, depth: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {['6 (5 1/2")', '8 (7 1/4")'].map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`headerMember.depth.options.${opt}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Number of Plies */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("headerMember.numberOfPlies.label")}
                </span>
                <select
                  value={params.numberOfPlies}
                  onChange={(e) =>
                    setParams({ ...params, numberOfPlies: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {["1", "2", "3"].map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`headerMember.numberOfPlies.options.${opt}`)}
                    </option>
                  ))}
                </select>
              </label>

              {/* Member ID */}
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("headerMember.memberId.label")}
                </span>
                <input
                  type="text"
                  value={params.memberId || t("headerMember.memberId.default")}
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
                <span className="text-xs">
                  {t("headerMember.lumberFinishRoughSawn.label")}
                </span>
                <span
                  title={t("headerMember.lumberFinishRoughSawn.tooltip")}
                  className="text-gray-400 cursor-help text-xs"
                >
                  ?
                </span>
              </label>
            </div>
          )}
        </section>

        {/* Joist (Carried Member) */}
        <section className="mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("joistMember")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              {t("joistMember.title")}
            </span>
            <span className="text-orange-700 text-lg">
              {openSections.joistMember ? "▼" : "▶"}
            </span>
          </header>
          {openSections.joistMember && (
            <div className="p-3 grid grid-cols-2 gap-3">
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("joistMember.memberType.label")}
                </span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>
                    {t("joistMember.memberType.options.solidSawn")}
                  </option>
                  <option>{t("joistMember.memberType.options.glulam")}</option>
                  <option>
                    {t("joistMember.memberType.options.laminatedStrandLumber")}
                  </option>
                  <option>
                    {t("joistMember.memberType.options.laminatedVeneerLumber")}
                  </option>
                  <option>
                    {t("joistMember.memberType.options.parallelStrandLumber")}
                  </option>
                  <option>{t("joistMember.memberType.options.iJoist")}</option>
                  <option>
                    {t("joistMember.memberType.options.floorTruss")}
                  </option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("joistMember.lumberSpecies.label")}
                </span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>{t("joistMember.lumberSpecies.options.df")}</option>
                  <option>{t("joistMember.lumberSpecies.options.sp")}</option>
                  <option>
                    {t("joistMember.lumberSpecies.options.spSouthernPine")}
                  </option>
                  <option>{t("joistMember.lumberSpecies.options.spf")}</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("joistMember.width.label")}
                </span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>{t("joistMember.width.options.2x")}</option>
                  <option>{t("joistMember.width.options.3x")}</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("joistMember.depth.label")}
                </span>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                  <option>{t("joistMember.depth.options.6")}</option>
                  <option>{t("joistMember.depth.options.8")}</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("joistMember.downloadedASD.label")}
                </span>
                <input
                  type="number"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  value={0}
                />
              </label>
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("joistMember.upliftASD.label")}
                </span>
                <input
                  type="number"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  value={0}
                />
              </label>
              <label className="flex flex-col col-span-2">
                <span className="font-semibold mb-1">
                  {t("joistMember.memberId.label")}
                </span>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  value={t("joistMember.memberId.default")}
                />
              </label>
              <label className="flex items-center col-span-2 space-x-2 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-xs">
                  {t("joistMember.lumberFinishRoughSawn.label")}
                </span>
                <span
                  title={t("joistMember.lumberFinishRoughSawn.tooltip")}
                  className="text-gray-400 cursor-help text-xs"
                >
                  ?
                </span>
              </label>
            </div>
          )}
        </section>

        {/* Connection Type */}
        <section className="mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("connectionType")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              {t("connectionType.title")}
            </span>
            <span className="text-orange-700 text-lg">
              {openSections.connectionType ? "▼" : "▶"}
            </span>
          </header>
          {openSections.connectionType && (
            <div className="p-3">
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("connectionType.label")}
                </span>
                <select
                  value={params.connectionType}
                  onChange={(e) =>
                    setParams({ ...params, connectionType: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {["Joist", "Truss", "Multi-Truss"].map((type) => (
                    <option key={type} value={type}>
                      {t(`connectionType.options.${type}`)}
                    </option>
                  ))}
                </select>
              </label>
              <div className="mt-2 flex justify-center">
                {params.connectionType === "Joist" && (
                  <img src={JoistImg} alt={t("connectionType.options.Joist")} />
                )}
                {params.connectionType === "Truss" && (
                  <img src={TrussImg} alt={t("connectionType.options.Truss")} />
                )}
                {params.connectionType === "Multi-Truss" && (
                  <img
                    src={MultiTrussImg}
                    alt={t("connectionType.options.Multi-Truss")}
                  />
                )}
              </div>
            </div>
          )}
        </section>

        {/* Hanger Options */}
        <section className="mb-4 border border-orange-300 rounded">
          <header
            className="flex justify-between items-center bg-orange-100 px-3 py-1 cursor-pointer select-none"
            onClick={() => toggleSection("hangerOptions")}
          >
            <span className="font-semibold uppercase text-orange-700 tracking-wide">
              {t("hangerOptions.title")}
            </span>
            <span className="text-orange-700 text-lg">
              {openSections.hangerOptions ? "▼" : "▶"}
            </span>
          </header>
          {openSections.hangerOptions && (
            <div className="p-3">
              <label className="flex flex-col">
                <span className="font-semibold mb-1">
                  {t("hangerOptions.hangerType.label")}
                </span>
                <select
                  value={params.hangerType}
                  onChange={(e) =>
                    setParams({ ...params, hangerType: e.target.value })
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                >
                  {hangerTypes.map((type) => (
                    <option key={type} value={type}>
                      {t(`hangerOptions.hangerType.options.${type}`)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-4 flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={params.includeJobSummary}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      includeJobSummary: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-xs">
                  {t("hangerOptions.includeJobSummary.label")}
                </span>
              </label>

              <button
                onClick={onSearch}
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded"
              >
                {t("hangerOptions.searchButton")}
              </button>
            </div>
          )}
        </section>

        {/* Button for Slope & Skew Modal */}
        <div className="mb-6">
          <button
            onClick={onOpenSlopeSkewModal}
            className="w-full border border-orange-400 text-orange-700 text-sm py-2 rounded hover:bg-orange-50"
          >
            {t("buttons.slopeSkewModal")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParametersPanel;
