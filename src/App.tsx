import React, { useState } from "react";
import SplitPane from "react-split-pane";

import ParametersPanel from "./ParametersPanel";
import Viewer from "./Viewer";
import ResultsPanel from "./ResultsPanel";
import Header from "./Header";

const App: React.FC = () => {
  const [params, setParams] = useState({
    type: "",
    header: "",
    joist: "",
    fastener: "",
    skew: 0,
    slope: 0,
  });

  const [results, setResults] = useState<any[]>([]);

  const search = () => {
    setResults([
      { model: "HUS26", cost: "Medium", load: "85%", material: "ZMAX®" },
      { model: "ABC123", cost: "High", load: "90%", material: "Galvanized" },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-sm text-gray-800 flex flex-col">
      <Header />

      {/* Vertical split: Left (Parameters) / Right (Viewer + Results) */}
      <SplitPane
        split="vertical"
        minSize={250}
        defaultSize={420}
        style={{ position: "relative", flex: 1 }}
      >
        {/* Left Panel */}
        <div className="p-4 overflow-auto h-full min-w-0">
          <ParametersPanel
            params={params}
            setParams={setParams}
            onSearch={search}
          />
        </div>

        {/* Right Panel: Horizontal split between Viewer and Results */}
        <SplitPane
          split="horizontal"
          minSize={150}
          defaultSize="68%"
          style={{ position: "relative", height: "100%" }}
        >
          {/* Viewer */}
          <div className="border-b border-gray-200 h-full w-full min-h-0 min-w-0 overflow-hidden flex">
            <Viewer params={params} results={results} />
          </div>

          {/* Results */}
          <div className="p-4 overflow-auto h-full min-w-0">
            <ResultsPanel results={results} />
          </div>
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default App;
