import React, { useState } from "react";

type DataRow = {
  name: string;
  device: string;
  path: string;
  status: string;
};

const sampleData: DataRow[] = [
  { name: "smss.exe", device: "Stark", path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe", status: "scheduled" },
  { name: "netsh.exe", device: "Targaryen", path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe", status: "available" },
  { name: "uxtheme.dll", device: "Lanniester", path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll", status: "available" },
  { name: "cryptbase.dll", device: "Martell", path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll", status: "scheduled" },
  { name: "7za.exe", device: "Baratheon", path: "\\Device\\HarddiskVolume1\\temp\\7za.exe", status: "scheduled" },
];

const Datagrid: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<DataRow[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sampleData.filter(row => row.status === "available"));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (row: DataRow) => {
    setSelectedRows(prev =>
      prev.includes(row) ? prev.filter(r => r !== row) : [...prev, row]
    );
  };

  const isDownloadEnabled =
    selectedRows.length > 0 && selectedRows.every(row => row.status === "available");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Datagrid</h1>
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedRows.length === sampleData.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">
                  {selectedRows.length > 0 ? `${selectedRows.length} Selected` : "None Selected"}
                </span>
              </div>
            </th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Device</th>
            <th className="p-3 text-left">Path</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map(row => (
            <tr
              key={row.name}
              className="border-t border-gray-200 hover:bg-gray-100 transition"
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                  className="w-4 h-4"
                />
              </td>
              <td className="p-3">{row.name}</td>
              <td className="p-3">{row.device}</td>
              <td className="p-3">{row.path}</td>
              <td className="p-3 flex items-center space-x-2">
                {row.status === "available" && (
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                )}
                <span className="capitalize">{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className={`mt-4 px-4 py-2 rounded-lg text-white font-medium ${
          isDownloadEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isDownloadEnabled}
        onClick={() => alert(JSON.stringify(selectedRows, null, 2))}
      >
        Download Selected
      </button>
    </div>
  );
};

export default Datagrid;
