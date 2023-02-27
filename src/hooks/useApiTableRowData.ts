import axios from "axios";
import { useCallback, useState } from "react";
import { TableRowData } from "../types/api/tableRowData";

type Obj = {
  [prop: string]: any;
};

export const useApiTableRowData = () => {
  const [agRowData, setAgRowData] = useState<Obj[]>([]);
  const [loading, setLoading] = useState(false);

  const getAgRowData = useCallback((tableId: string) => {
    console.log("List Row-Data: ", tableId);
    setLoading(true);
    axios
      .get<TableRowData[]>("xxx")
      .then(async (res) => {
        const data = res.data.map((props: TableRowData) => {
          let data: Obj = {};
          props.row.map((props) => {
            data[props.column_id] = props.value;
          });
          return data;
        });
        console.log("this is", data);
        setAgRowData(data);
      })
      .catch((err) => {
        setAgRowData([]);
        console.log("err");
      })
      .finally(() => setLoading(false));
  }, []);
  return {
    getAgRowData,
    agRowData,
    loading,
  };
};
