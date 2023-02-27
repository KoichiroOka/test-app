import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { Table } from "../types/api/table";

type TableContextType = {
  targetTable: Table | null;
  agColumnDef: (ColDef | ColGroupDef)[];
  pinnedUnitData: any;
  setTargetTable: Dispatch<SetStateAction<Table | null>>;
  setAgColumnDef: Dispatch<SetStateAction<(ColDef | ColGroupDef)[]>>;
  setPinnedUnitData: Dispatch<SetStateAction<any>>;
};

const TargetTableContext = createContext<TableContextType>(
  {} as TableContextType
);

type Props = {
  children: ReactNode;
  groupId: string;
};

export const DataGridProvider = (props: Props) => {
  const { children } = props;

  const [targetTable, setTargetTable] = useState<Table | null>({
    table_id: "",
    name: "",
    type: "T",
    ancestors: [],
  });

  const [agColumnDef, setAgColumnDef] = useState<(ColDef | ColGroupDef)[]>([]);

  const [pinnedUnitData, setPinnedUnitData] = useState<any>();

  return (
    <TargetTableContext.Provider
      value={{
        targetTable,
        agColumnDef,
        pinnedUnitData,
        setTargetTable,
        setAgColumnDef,
        setPinnedUnitData,
      }}
    >
      {children}
    </TargetTableContext.Provider>
  );
};

export const useTargetTable = (): TableContextType =>
  useContext(TargetTableContext);
