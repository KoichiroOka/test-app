import { useCallback, useState } from "react";
import axios from "axios";
import { Table } from "../types/api/table";
import { TableTree } from "../types/TableTree";

export const useApiTableList = () => {
  const [gridList, setGridList] = useState<TableTree>({ groupId: "F" });

  const [loading, setLoading] = useState(false);

  const getGridList = useCallback((groupId: "E" | "F" | "A" | "C") => {
    console.log("List Group-Items: ", groupId);
    setLoading(true);
    axios
      .get<Table[]>("xxx")
      .then(async (res) => {
        const data: TableTree = {
          groupId: groupId,
          data: res.data.map((lv1Props) => {
            return {
              id: lv1Props.table_id,
              name: lv1Props.name,
              isDataGrid: lv1Props.type === "T",
              children: lv1Props.children?.map((lv2Props) => {
                return {
                  id: lv2Props.table_id,
                  name: lv2Props.name,
                  isDataGrid: lv2Props.type === "T",
                  children: lv2Props.children?.map((lv3Props) => {
                    return {
                      id: lv3Props.table_id,
                      name: lv3Props.name,
                      isDataGrid: lv3Props.type === "T",
                      children: lv3Props.children?.map((lv4Props) => {
                        return {
                          id: lv4Props.table_id,
                          name: lv4Props.name,
                          isDataGrid: lv4Props.type === "T",
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          }),
        };
        setGridList(data);
      })
      .catch(() => {
        console.log("ERROR");
      })
      .finally(() => setLoading(false));
  }, []);

  return { getGridList, gridList, loading };
};
