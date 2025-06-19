import React from "react";

interface Result {
  model: string;
  cost: string;
  load: string;
  material: string;
}

interface ResultsPanelProps {
  results: Result[];
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="border rounded p-2 text-gray-500 italic">
        Table placeholder (Model, Cost, Load, Material)
      </div>
    );
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-1">Model</th>
          <th className="border border-gray-300 p-1">Cost</th>
          <th className="border border-gray-300 p-1">Load</th>
          <th className="border border-gray-300 p-1">Material</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, i) => (
          <tr key={i} className="text-center">
            <td className="border border-gray-300 p-1">{r.model}</td>
            <td className="border border-gray-300 p-1">{r.cost}</td>
            <td className="border border-gray-300 p-1">{r.load}</td>
            <td className="border border-gray-300 p-1">{r.material}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsPanel;
