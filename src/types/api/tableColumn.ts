export interface TableColumn {
  column_id: string;
  name: string;
  type: string;
  unit: string;
  property: string;
  hidden: boolean;
}

export interface TableColumnGroup {
  group_id: string;
  name: string;
  children: (TableColumn | TableColumnGroup)[];
}
