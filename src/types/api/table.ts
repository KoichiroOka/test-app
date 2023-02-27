export interface Table {
  table_id: string;
  type: 'F' | 'T';
  name: string;
  group_id?: string;
  ancestors: string[];
  table_type?: string;
  children?: Table[];
}
