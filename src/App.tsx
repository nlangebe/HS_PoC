import React, { useState } from "react";
import SplitPane from "react-split-pane";

import ParametersPanel from "./ParametersPanel";
import Viewer from "./Viewer";
import ResultsPanel from "./ResultsPanel";
import Header from "./Header";
import AppConfigurationModal from "./AppConfigurationModal";
import UserModal from "./UserModal";

// ✅ Import modal and image
import SlopeAndSkewCalculator from "./SlopeAndSkewCalculator";

const App: React.FC = () => {
  const [country, setCountry] = useState("USA");
  const [language, setLanguage] = useState("English"); // New language state

  const [params, setParams] = useState({
    type: "",
    header: "",
    joist: "",
    fastener: "",
    skew: 0,
    slope: 0,
    hangerType: "All Types",
    downloadDuration: "Dead (90)",
    upliftDuration: "",
    jobId: "",
    quantity: 1,
    memberType: "",
    lumberSpecies: "",
    width: "",
    depth: "",
    numberOfPlies: "",
    memberId: "",
    lumberFinishRoughSawn: false,
  });

  const [results, setResults] = useState<any[]>([]);
  const [showAppConfig, setShowAppConfig] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // ✅ Modal state
  const [isSlopeModalOpen, setIsSlopeModalOpen] = useState(false);

  const search = () => {
    setResults([
      { model: "HUS26", cost: "Medium", load: "85%", material: "ZMAX®" },
      { model: "ABC123", cost: "High", load: "90%", material: "Galvanized" },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-sm text-gray-800 flex flex-col">
      <Header
        country={country}
        language={language} // Pass language to Header
        onOpenConfig={() => setShowAppConfig(true)}
        onOpenUserModal={() => setShowUserModal(true)}
      />

      {showAppConfig && (
        <AppConfigurationModal
          onClose={() => setShowAppConfig(false)}
          countryOfUse={country} // Pass current country
          setCountryOfUse={setCountry} // Pass country setter
          language={language} // Pass current language
          setLanguage={setLanguage} // Pass language setter
        />
      )}

      {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}

      <SplitPane
        split="vertical"
        minSize={250}
        defaultSize={520}
        style={{ position: "relative", flex: 1 }}
      >
        <div className="p-4 overflow-auto h-full min-w-0">
          <ParametersPanel
            params={params}
            setParams={setParams}
            onSearch={search}
            country={country}
            // ✅ Pass open modal callback
            onOpenSlopeSkewModal={() => setIsSlopeModalOpen(true)}
          />
        </div>

        <SplitPane
          split="horizontal"
          minSize={150}
          defaultSize="68%"
          style={{ position: "relative", height: "100%" }}
        >
          <div className="border-b border-gray-200 h-full w-full min-h-0 min-w-0 overflow-hidden flex">
            <Viewer params={params} results={results} />
          </div>
          <div className="p-4 overflow-auto h-full min-w-0">
            <ResultsPanel results={results} />
          </div>
        </SplitPane>
      </SplitPane>

      {/* ✅ Modal rendering */}
      <SlopeAndSkewCalculator
        isOpen={isSlopeModalOpen}
        onClose={() => setIsSlopeModalOpen(false)}
        onCalculate={() => alert("Calculation triggered!")}
      />
    </div>
  );
};

export default App;
