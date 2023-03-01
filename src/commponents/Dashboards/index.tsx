import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo } from "react";
import { useTargetTable } from "../../contexts/DataGridProvider";
import { useApiTableColumnDef } from "../../hooks/useApiTableColumnDef";
import { useApiTableRowData } from "../../hooks/useApiTableRowData";

export const Dashboards = () => {
  const { agColumnDef, targetTable, pinnedUnitData } = useTargetTable();
  const { getAgColumnDef } = useApiTableColumnDef();
  const { agRowData, getAgRowData, loading } = useApiTableRowData();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      columnGroupShow: "open",
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  useEffect(() => {
    getAgColumnDef("692");
    // getAgRowData("692");
  }, []);

  const onTest = () => {
    getAgRowData("692");
  };

  return (
    <>
      <button onClick={onTest}>test</button>
      <div className="ag-theme-alpine">
        {loading ? (
          <>loading</>
        ) : (
          // <AgGridReact
          //   rowData={agRowData}
          //   columnDefs={agColumnDef}
          //   defaultColDef={defaultColDef}
          //   rowSelection={"multiple"}
          //   pinnedTopRowData={[pinnedUnitData]}
          // ></AgGridReact>
          <>
            <ul>
              {agRowData.map((obj, index) => {
                return (
                  <li key={index}>
                    <p>{index}</p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
