import { IDataRow } from "./datagrid";

export interface IButton { 
  label: string,
  disabled: boolean;
  onClick: () => void 
}

export interface ICheckbox { 
  checked: boolean;
  onChange: () => void
}

export interface ITable { 
  data: IDataRow[]; 
  selectedRows: IDataRow[];
  onRowSelect: (row: IDataRow) => void
}