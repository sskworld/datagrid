export interface IDataRow {
  name: string;
  device: string;
  path: string;
  status: 'available' | 'scheduled';
};
