import React, { useState } from 'react';
import Checkbox from './Checkbox';
import { DataRow } from '../types/datagrid';

const sampleData: DataRow[] = [
  { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
  { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
  { name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
  { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
  { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' },
];

const Datagrid: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<DataRow[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? sampleData.filter(row => row.status === 'available') : []);
  };

  const handleRowSelect = (row: DataRow) => {
    setSelectedRows(prev =>
      prev.includes(row) ? prev.filter(r => r !== row) : [...prev, row]
    );
  };

  const isDownloadEnabled = selectedRows.length > 0 && selectedRows.every(row => row.status === 'available');

  return (
    <div>
      <h1>Datagrid</h1>
      <table border="1">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selectedRows.length === sampleData.length}
                indeterminate={selectedRows.length > 0 && selectedRows.length < sampleData.length}
                onChange={handleSelectAll}
              />
              {selectedRows.length > 0 ? `${selectedRows.length} Selected` : 'None Selected'}
            </th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map(row => (
            <tr key={row.name}>
              <td>
                <Checkbox
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.device}</td>
              <td>{row.path}</td>
              <td>
                {row.status === 'available' && <span style={{ color: 'green' }}>● </span>}
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={!isDownloadEnabled} onClick={() => alert(JSON.stringify(selectedRows, null, 2))}>
        Download Selected
      </button>
    </div>
  );
};

export default Datagrid;
