import axios from "axios";
import { useCallback, useState } from "react";
import { TableRowData } from "../types/api/tableRowData";

interface Obj {
  [key: string]: any;
}

export const useApiTableRowData = () => {
  const [agRowData, setAgRowData] = useState<Obj[]>([]);
  const [loading, setLoading] = useState(false);

  const getAgRowData = useCallback(async (tableId: string) => {
    console.log("List Row-Data: ", tableId);

    let pageNum = 1;
    setAgRowData([]);
    setLoading(true);

    while (pageNum > 0) {
      try {
        const res = await axios.get<TableRowData[]>(
          `http://hgaap02t.a.rd.honda.co.jp:7041/vbdb2-webservice/api/v2/tables/${tableId}/rows`,
          {
            params: {
              field_mask: "cells",
              user_id: "J0134484",
              page: pageNum,
            },
          }
        );

        console.log(pageNum, res.headers["link"]);

        const nextLink = res.headers["link"];

        if (typeof nextLink === "undefined") {
          pageNum = 0;
        } else {
          pageNum++;
        }

        const data = res.data.map((props: TableRowData) => {
          let data: Obj = {};
          props.cells.map((props) => {
            data[props.column_id] = props.value;
          });
          return data;
        });

        setAgRowData((prev) => [...prev, ...data]);
        console.log(agRowData);
      } catch (err) {
        console.log(err);
      } finally {
        pageNum > 0 || setLoading(false);
      }
    }
  }, []);

  return {
    getAgRowData,
    agRowData,
    loading,
  };
};
