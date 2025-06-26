import React, { useState } from "react";
import SplitPane from "react-split-pane";
import Viewer from "./Viewer";
import ParametersPanel from "./ParametersPanel";
import Viewer from "./Viewer"; // ← add this
import ResultsPanel from "./ResultsPanel"; // ← and this
import Header from "./Header";
import AppConfigurationModal from "./AppConfigurationModal";
import UserModal from "./UserModal";
import SlopeAndSkewCalculator from "./SlopeAndSkewCalculator";

const LeftPanel = () => (
  <div className="p-4 bg-yellow-100 h-full">Left Panel</div>
);
const TopRightPanel = () => (
  <div className="p-4 bg-blue-100 h-full">Top Right (Viewer)</div>
);
const BottomRightPanel = () => (
  <div className="p-4 bg-green-100 h-full">Bottom Right (Results)</div>
);

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-12 bg-gray-200">Header</div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize={300}
          className="split-pane-container flex min-h-0"
        >
          {/* Left panel */}
          <LeftPanel />

          {/* Right panel: MUST be flex column with full height */}
          <div className="flex flex-col h-full min-h-0">
            <SplitPane
              split="horizontal"
              minSize={100}
              defaultSize="60%"
              className="split-pane-container"
              style={{ height: "100%" }} // make sure SplitPane fills parent height
            >
              <Viewer params={params} results={sampleResults} />
              <ResultsPanel results={sampleResults} />
            </SplitPane>
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

export default App;
