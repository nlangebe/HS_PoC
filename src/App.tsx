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


// ✅ Datasets by Country
const usaResults = [
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

const canadianResults = [
  {
    id: "1",
    model: "LU26L",
    cost: "Lowest",
    load: "1235",
    material: "Steel",
    faceFasteners: `(6) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "2",
    model: "LUS26",
    cost: "+13.00%",
    load: "1765",
    material: "Steel",
    faceFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(4) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
  },
  {
    id: "3",
    model: "LUC26Z",
    cost: "+75.00%",
    load: "1235",
    material: "Steel",
    faceFasteners: `(6) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "4",
    model: "U26",
    cost: "+75.00%",
    load: "1870",
    material: "Steel",
    faceFasteners: `(6) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "5",
    model: "LB26",
    cost: "+212.00%",
    load: "1475",
    material: "Steel",
    faceFasteners: `(2) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(2) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "6",
    model: "LUS35",
    cost: "+5.00%",
    load: "1650",
    material: "Steel",
    faceFasteners: `(5) N12<br/>(0.162&quot; x 2&quot; HDG)`,
    joistFasteners: `(5) N12<br/>(0.162&quot; x 2&quot; HDG)`,
  },
  {
    id: "7",
    model: "LU28",
    cost: "+20.00%",
    load: "1800",
    material: "Steel",
    faceFasteners: `(6) 10HDG<br/>(0.148&quot; x 3&quot; HDG 10d Common)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "8",
    model: "LB28",
    cost: "+150.00%",
    load: "1400",
    material: "Steel",
    faceFasteners: `(3) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
    joistFasteners: `(3) N10<br/>(0.148&quot; x 1 1/2&quot; HDG)`,
  },
  {
    id: "9",
    model: "LUC30Z",
    cost: "+80.00%",
    load: "1350",
    material: "Steel",
    faceFasteners: `(6) N10<br/>(0.148&quot; x 1 3/4&quot; HDG)`,
    joistFasteners: `(4) N10<br/>(0.148&quot; x 1 3/4&quot; HDG)`,
  },
  {
    id: "10",
    model: "PF30B",
    cost: "+90.00%",
    load: "1250",
    material: "Steel",
    faceFasteners: `(2) 10HDG<br/>(0.148&quot; x 2 1/2&quot; HDG)`,
    joistFasteners: `(4) 10HDG<br/>(0.148&quot; x 2 1/2&quot; HDG)`,
  },
];

const otherResults = [
  {
    id: "1",
    model: "EU26",
    cost: "Baseline",
    load: "1000",
    material: "Stainless",
    faceFasteners: `(4) ESF<br/>(Ø4 x 40 mm)`,
    joistFasteners: `(4) ESF<br/>(Ø4 x 40 mm)`,
  },
  {
    id: "2",
    model: "EU27",
    cost: "+10.00%",
    load: "1100",
    material: "Stainless",
    faceFasteners: `(6) ESF<br/>(Ø5 x 45 mm)`,
    joistFasteners: `(6) ESF<br/>(Ø5 x 45 mm)`,
  },
  {
    id: "3",
    model: "EU28",
    cost: "+15.00%",
    load: "1200",
    material: "Galvanized Steel",
    faceFasteners: `(4) GSF<br/>(Ø4.5 x 50 mm)`,
    joistFasteners: `(4) GSF<br/>(Ø4.5 x 50 mm)`,
  },
  {
    id: "4",
    model: "EU29",
    cost: "+20.00%",
    load: "1300",
    material: "Galvanized Steel",
    faceFasteners: `(8) GSF<br/>(Ø5 x 55 mm)`,
    joistFasteners: `(8) GSF<br/>(Ø5 x 55 mm)`,
  },
  {
    id: "5",
    model: "EU30",
    cost: "+25.00%",
    load: "1400",
    material: "Stainless",
    faceFasteners: `(6) ESF<br/>(Ø6 x 60 mm)`,
    joistFasteners: `(6) ESF<br/>(Ø6 x 60 mm)`,
  },
  {
    id: "6",
    model: "EU31",
    cost: "+30.00%",
    load: "1500",
    material: "Stainless",
    faceFasteners: `(4) ESF<br/>(Ø5 x 65 mm)`,
    joistFasteners: `(4) ESF<br/>(Ø5 x 65 mm)`,
  },
  {
    id: "7",
    model: "EU32",
    cost: "+35.00%",
    load: "1600",
    material: "Galvanized Steel",
    faceFasteners: `(6) GSF<br/>(Ø5 x 70 mm)`,
    joistFasteners: `(6) GSF<br/>(Ø5 x 70 mm)`,
  },
  {
    id: "8",
    model: "EU33",
    cost: "+40.00%",
    load: "1700",
    material: "Galvanized Steel",
    faceFasteners: `(8) GSF<br/>(Ø6 x 75 mm)`,
    joistFasteners: `(8) GSF<br/>(Ø6 x 75 mm)`,
  },
  {
    id: "9",
    model: "EU34",
    cost: "+45.00%",
    load: "1800",
    material: "Stainless",
    faceFasteners: `(6) ESF<br/>(Ø7 x 80 mm)`,
    joistFasteners: `(6) ESF<br/>(Ø7 x 80 mm)`,
  },
  {
    id: "10",
    model: "EU35",
    cost: "+50.00%",
    load: "1900",
    material: "Stainless",
    faceFasteners: `(4) ESF<br/>(Ø7 x 85 mm)`,
    joistFasteners: `(4) ESF<br/>(Ø7 x 85 mm)`,
  },
];

// ✅ Dataset selection helper
const getResultsForCountry = (country: string) => {
  if (country === "USA") return usaResults;
  if (country === "Canada") return canadianResults;
  return otherResults; // All other countries (EU, UK, etc)
};

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

  const [results, setResults] = useState<any[]>(getResultsForCountry(country));
  const [showAppConfig, setShowAppConfig] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isSlopeModalOpen, setIsSlopeModalOpen] = useState(false);

  // Update country AND results immediately on country change inside modal
  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    setResults(getResultsForCountry(newCountry));
  };

  // Modal close only hides modal now
  const handleAppConfigClose = () => {
    setShowAppConfig(false);
  };

  const search = () => {
    setResults(getResultsForCountry(country));
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
                <Viewer params={params} results={results} />
              </div>
              <div className="flex flex-col flex-1 min-h-0">
                <ResultsPanel results={results} />
              </div>
            </SplitPane>
          </div>
        </SplitPane>
      </div>

      {showAppConfig && (
        <AppConfigurationModal
          onClose={handleAppConfigClose}
          countryOfUse={country}
          setCountryOfUse={handleCountryChange} // Immediate update on selection
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
