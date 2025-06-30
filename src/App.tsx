import React, { useState } from "react";
import SplitPane from "react-split-pane";
import "./index.css";
import ParametersPanel from "./ParametersPanel";
import Viewer from "./Viewer";
import ResultsPanel from "./ResultsPanel";
import Header from "./Header";
import AppConfigurationModal from "./AppConfigurationModal";
import UserModal from "./UserModal";
import SlopeAndSkewCalculator from "./SlopeAndSkewCalculator";

// ✅ Mocked Data results
const sampleResults = [
  {
    id: "1",
    model: "LU26",
    cost: "Lowest",
    load: "590 / 540",
    material: "Steel",
    faceFasteners: `(6) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "2",
    model: "LU26",
    cost: "+2.00%",
    load: "640 / 540",
    material: "Steel",
    faceFasteners: `(6) 16HDG<br/>(0.162&quot; x 3 1/2&quot; HDG 16d Common)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "3",
    model: "LU26",
    cost: "+3.00%",
    load: "575 / 540",
    material: "Steel",
    faceFasteners: `(6) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "4",
    model: "LUS26",
    cost: "+10.00%",
    load: "780 / 765",
    material: "Steel",
    faceFasteners: `(4) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
    joistFasteners: `(3) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
  },
  {
    id: "5",
    model: "LUS26",
    cost: "+12.00%",
    load: "695 / 765",
    material: "Steel",
    faceFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(3) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
  },
  {
    id: "6",
    model: "LUS26",
    cost: "+13.00%",
    load: "810 / 1105",
    material: "Steel",
    faceFasteners: `(4) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
    joistFasteners: `(4) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
  },
  {
    id: "7",
    model: "LUS26",
    cost: "+15.00%",
    load: "795 / 1105",
    material: "Steel",
    faceFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(4) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
  },
  {
    id: "8",
    model: "PF26B",
    cost: "+61.00%",
    load: "900 / 470",
    material: "Steel",
    faceFasteners: `(2) 0.148&quot; x 2 1/2&quot;<br/>(HDG)`,
    joistFasteners: `(4) 0.148&quot; x 2 1/2&quot;<br/>(HDG)`,
  },
  {
    id: "9",
    model: "LUC26Z",
    cost: "+68.00%",
    load: "715 / 730",
    material: "Steel",
    faceFasteners: `(6) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "10",
    model: "PF26B",
    cost: "+78.00%",
    load: "1200 / 625",
    material: "Steel",
    faceFasteners: `(2) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
    joistFasteners: `(4) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
  },
];

const App: React.FC = () => {
  const [country, setCountry] = useState("USA");
  const [language, setLanguage] = useState("English");

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
  const [isSlopeModalOpen, setIsSlopeModalOpen] = useState(false);

  const search = () => {
    setResults([
      { model: "HUS26", cost: "Medium", load: "85%", material: "ZMAX®" },
      { model: "ABC123", cost: "High", load: "90%", material: "Galvanized" },
    ]);
  };

  return (
    <div className="App h-screen flex flex-col">
      <Header
        country={country}
        language={language}
        onOpenConfig={() => setShowAppConfig(true)}
        onOpenUserModal={() => setShowUserModal(true)}
      />

      <div className="flex-1 min-h-0">
        <SplitPane
          split="vertical"
          defaultSize={450}
          allowResize={true}
          style={{ position: "relative", height: "100%" }}
        >
          <div className="p-4 h-full min-w-0">
            <ParametersPanel
              params={params}
              setParams={setParams}
              onSearch={search}
              country={country}
              onOpenSlopeSkewModal={() => setIsSlopeModalOpen(true)}
            />
          </div>

          <div className="flex flex-col flex-1 min-h-0 min-w-0">
            <SplitPane
              split="horizontal"
              defaultSize="71%"
              style={{ position: "relative", flex: 1, minHeight: 0 }}
            >
              <div style={{ height: "100%" }}>
                <Viewer params={params} results={sampleResults} />
              </div>
              <div className="flex flex-col flex-1 min-h-0">
                <ResultsPanel results={sampleResults} />
              </div>
            </SplitPane>
          </div>
        </SplitPane>
      </div>

      {showAppConfig && (
        <AppConfigurationModal
          onClose={() => setShowAppConfig(false)}
          countryOfUse={country}
          setCountryOfUse={setCountry}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}

      <SlopeAndSkewCalculator
        isOpen={isSlopeModalOpen}
        onClose={() => setIsSlopeModalOpen(false)}
        onCalculate={() => alert("Calculation triggered!")}
      />
    </div>
  );
};

export default App;
