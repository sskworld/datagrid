import { ITable } from "@/types/common";
import { Checkbox } from "./Checkbox";

export const Table: React.FC<ITable> = ({ data, selectedRows, onRowSelect }) => {
  return (
    <table className="datagrid">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Device</th>
          <th>Path</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.name}>
            <td>
              <Checkbox checked={selectedRows.includes(row)} onChange={() => onRowSelect(row)} />
            </td>
            <td>{row.name}</td>
            <td>{row.device}</td>
            <td>{row.path}</td>
            <td>
              {row.status === "available" && <span className="status-dot available"></span>}
              {row.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};