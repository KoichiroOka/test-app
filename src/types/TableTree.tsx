export interface TableTree {
  groupId: 'E' | 'F' | 'A' | 'C';
  data?: GridList[];
}

interface GridList {
  id?: string;
  name: string;
  isDataGrid: boolean;
  children?: GridList[];
}
