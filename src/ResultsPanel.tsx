import React, { useState } from "react";

interface Result {
  id: string;
  model: string;
  cost: string;
  load: string;
  material: string;
  faceFasteners: string;
  joistFasteners: string;
}

interface JobItem extends Result {
  jobId: string;
  quantity: number;
}

interface ResultsPanelProps {
  results: Result[];
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<"output" | "joblist">("output");
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [jobList, setJobList] = useState<JobItem[]>([]);

  const handleAddToJobList = () => {
    const selected = results.find((r) => r.id === selectedRowId);
    if (selected) {
      setJobList([
        ...jobList,
        {
          ...selected,
          jobId: `Job ${jobList.length + 1}`,
          quantity: 1,
        },
      ]);
      setActiveTab("joblist");
    }
  };

  return (
    <div className="mt-2 border border-gray-300 rounded text-xs">
      {/* Tabs */}
      <div className="flex bg-gray-200 text-sm uppercase font-semibold">
        {["output", "joblist"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "output" | "joblist")}
            className={`px-4 py-2 ${
              activeTab === tab ? "bg-white border-b-2 border-orange-500" : ""
            }`}
          >
            {tab === "output" ? "Output" : `Job List (${jobList.length})`}
          </button>
        ))}
      </div>

      {/* OUTPUT TAB */}
      {activeTab === "output" && (
        <div className="p-2 overflow-x-auto">
          {results.length === 0 ? (
            <div className="text-gray-500 italic p-4">
              No results found – placeholder for connector table
            </div>
          ) : (
            <>
              <button
                onClick={handleAddToJobList}
                className="mb-2 bg-orange-600 text-white px-4 py-1 rounded text-xs hover:bg-orange-700"
                disabled={!selectedRowId}
              >
                Add to Job list
              </button>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-orange-200 text-left">
                    <th></th>
                    <th>Model</th>
                    <th>Cost</th>
                    <th>Load</th>
                    <th>Material</th>
                    <th>Face Fasteners</th>
                    <th>Joist Fasteners</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row) => (
                    <tr key={row.id} className="border-t">
                      <td>
                        <input
                          type="radio"
                          checked={selectedRowId === row.id}
                          onChange={() => setSelectedRowId(row.id)}
                        />
                      </td>
                      <td className="text-orange-800 underline">{row.model}</td>
                      <td>{row.cost}</td>
                      <td>{row.load}</td>
                      <td>{row.material}</td>
                      <td
                        dangerouslySetInnerHTML={{ __html: row.faceFasteners }}
                      />
                      <td
                        dangerouslySetInnerHTML={{ __html: row.joistFasteners }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      {/* JOB LIST TAB */}
      {activeTab === "joblist" && (
        <div className="p-2 overflow-x-auto">
          {jobList.length === 0 ? (
            <div className="text-gray-500 italic p-4">No job added yet</div>
          ) : (
            <>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-orange-200">
                    <th>Edit</th>
                    <th>Job</th>
                    <th>Model</th>
                    <th>Quantity</th>
                    <th>Face Fasteners</th>
                    <th>Joist Fasteners</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {jobList.map((job) => (
                    <tr key={job.id} className="border-t">
                      <td>
                        <div className="flex flex-col gap-1">
                          <button className="bg-[#5b3a00] text-white px-2 py-1 rounded">
                            Edit
                          </button>
                          <button className="bg-[#5b3a00] text-white px-2 py-1 rounded">
                            Duplicate
                          </button>
                        </div>
                      </td>
                      <td>{job.jobId}</td>
                      <td className="text-orange-800 underline">{job.model}</td>
                      <td>{job.quantity}</td>
                      <td
                        dangerouslySetInnerHTML={{ __html: job.faceFasteners }}
                      />
                      <td
                        dangerouslySetInnerHTML={{ __html: job.joistFasteners }}
                      />
                      <td>
                        <button
                          onClick={() =>
                            setJobList(jobList.filter((j) => j.id !== job.id))
                          }
                          className="text-red-600"
                          title="Remove"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Fastener Totals */}
              <div className="mt-2 bg-orange-200 p-2 font-semibold">
                Fastener Totals
                <div className="text-xs mt-1">
                  (4) N10 (0.148" x 1 1/2" HDG)
                  <br />
                  (6) 10HDG (0.148" x 3" HDG 10d Common)
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
