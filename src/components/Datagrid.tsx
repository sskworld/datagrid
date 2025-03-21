import { IDataRow } from "@/types/datagrid";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./common/Checkbox";
import { Button } from "./common/Button";
import { Table } from "./common/Table";

const sampleData: IDataRow[] = [
  { name: "smss.exe", device: "Stark", path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe", status: "scheduled" },
  { name: "netsh.exe", device: "Targaryen", path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe", status: "available" },
  { name: "uxtheme.dll", device: "Lanniester", path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll", status: "available" },
  { name: "cryptbase.dll", device: "Martell", path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll", status: "scheduled" },
  { name: "7za.exe", device: "Baratheon", path: "\\Device\\HarddiskVolume1\\temp\\7za.exe", status: "scheduled" },
];

const Datagrid: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<IDataRow[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    setSelectAll(selectedRows.length === sampleData.length);
  }, [selectedRows]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sampleData);
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (row: IDataRow) => {
    setSelectedRows(prev =>
      prev.includes(row) ? prev.filter(r => r !== row) : [...prev, row]
    );
  };

  const isDownloadEnabled: boolean =
    selectedRows.length > 0 && selectedRows.some(row => row.status === "available");

  const handleDownload = () => {
    const availableItems: string = selectedRows
      .filter(row => row.status === "available")
      .map(({ name, device, path }) => `Name: ${name}, Device: ${device}, Path: ${path}`)
      .join("\n");

    if (availableItems) {
      alert(`Downloaded Items:\n${availableItems}`);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Datagrid</h1>
      <div className="controls">
        <div className="select-all">
          <Checkbox checked={selectAll} onChange={handleSelectAll} />
          <span>{selectedRows.length > 0 ? `${selectedRows.length} Selected` : "None Selected"}</span>
        </div>
        <Button label="Download Selected" disabled={!isDownloadEnabled} onClick={handleDownload} />
      </div>
      <Table data={sampleData} selectedRows={selectedRows} onRowSelect={handleRowSelect} />
    </div>
  );
};

export default Datagrid;
