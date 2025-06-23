import React, { useState } from "react";
import SplitPane from "react-split-pane";

import ParametersPanel from "./ParametersPanel";
import Viewer from "./Viewer";
import ResultsPanel from "./ResultsPanel";
import Header from "./Header";
import AppConfigurationModal from "./AppConfigurationModal";
import UserModal from "./UserModal"; // Make sure this file exists

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

  // Modal state
  const [showAppConfig, setShowAppConfig] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const search = () => {
    setResults([
      { model: "HUS26", cost: "Medium", load: "85%", material: "ZMAX®" },
      { model: "ABC123", cost: "High", load: "90%", material: "Galvanized" },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-sm text-gray-800 flex flex-col">
      {/* Header with modal triggers */}
      <Header
        onOpenConfig={() => setShowAppConfig(true)}
        onOpenUserModal={() => setShowUserModal(true)}
      />

      {/* Modals */}
      {showAppConfig && (
        <AppConfigurationModal onClose={() => setShowAppConfig(false)} />
      )}
      {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}

      {/* Main layout: Split panes */}
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

        {/* Right Panel: Viewer + Results */}
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
