import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-semibold tracking-tight">
          Hanger Selector International
        </div>
        <div className="flex gap-4 items-center">
          <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
            <option>🇬🇧 English</option>
            <option>🇫🇷 Français</option>
            <option>🇩🇪 Deutsch</option>
          </select>
          <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
            <option>Country of Use</option>
            <option>France</option>
            <option>Germany</option>
            <option>USA</option>
          </select>
        </div>
      </header>

      {/* Content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Panel - Parameters */}
        <div className="bg-white rounded-xl shadow p-4 space-y-4 col-span-1">
          <div className="text-lg font-medium border-b pb-2">
            Input Parameters
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Member Type
            </label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Solid Sawn</option>
              <option>LVL</option>
              <option>I-Joist</option>
              <option>Glulam</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Skew (°)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="e.g. 45"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Applied Load (kN)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="e.g. 15.0"
            />
          </div>

          <button className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition">
            Search Products
          </button>
        </div>

        {/* Right Panel - Visualization and Result */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-4 h-60 flex items-center justify-center">
            <div className="text-gray-500">[3D Visual Placeholder]</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-lg font-medium border-b pb-2 mb-4">
              Results
            </div>
            <div className="text-gray-500">
              Matching hangers will be displayed here.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
