import { ColDef, ColGroupDef } from "ag-grid-community";
import axios from "axios";
import { useCallback } from "react";
import { useTargetTable } from "../contexts/DataGridProvider";
import { TableColumn, TableColumnGroup } from "../types/api/tableColumn";

import Data from "../data/sampleColumnDefs.json";

type ApiColumnDef = TableColumn | TableColumnGroup;

type Obj = {
  [prop: string]: any;
};

export const useApiTableColumnDef = () => {
  const { setAgColumnDef, setPinnedUnitData } = useTargetTable();

  const getAgColumnDef = useCallback((tableId: string) => {
    console.log("List Column-Definitions: ", tableId);
    axios
      .get<ApiColumnDef[]>(
        `http://hgaap02t.a.rd.honda.co.jp:7041/vbdb2-webservice/api/v2/tables/${tableId}/columnDefs`,
        {
          params: {
            field_mask: "cells",
            include: "hidden",
            user_id: "J0134484",
          },
        }
      )
      .then(async (res) => {
        console.log(res);
        const agColumnDef: (ColDef | ColGroupDef)[] = res.data.map(
          (lv1Props: ApiColumnDef, index: number) => {
            // if (index == 0) {
            //   if ("column_id" in lv1Props) {
            //     return {
            //       headerName: lv1Props.name,
            //       field: lv1Props.column_id,
            //       // hide: lv1Props.hidden,
            //       // headerCheckboxSelection: true,
            //       // checkboxSelection: true,
            //       // showDisabledCheckboxes: true,
            //       // pinned: "left",
            //       // lockPinned: true,
            //       // cellClass: "lock-pinned",
            //     };
            //   }
            // }
            if ("column_id" in lv1Props) {
              return {
                headerName: lv1Props.name,
                field: lv1Props.column_id,
                // hide: lv1Props.hidden,
              };
            }
            // else
            // return {
            //   headerName: lv1Props.name,
            //   groupId: lv1Props.group_id,
            //   children: lv1Props.children.map((lv2Props: ApiColumnDef) => {
            //     if ("column_id" in lv2Props) {
            //       return {
            //         headerName: lv2Props.name,
            //         field: lv2Props.column_id,
            //         // hide: lv2Props.hidden,
            //       };
            //     } else {
            //       return {
            //         headerName: lv2Props.name,
            //         groupId: lv2Props.group_id,
            //         children: lv2Props.children.map(
            //           (lv3Props: ApiColumnDef) => {
            //             if ("column_id" in lv3Props) {
            //               return {
            //                 headerName: lv3Props.name,
            //                 field: lv3Props.column_id,
            //                 // hide: lv3Props/.hidden,
            //               };
            //             }
            //           }
            //         ),
            //       };
            //     }
            //   }),
            // };
          }
        );
        console.log("aaa", agColumnDef);
        setAgColumnDef(agColumnDef);
        const pinnedUnitData: Obj = {};
        res.data.forEach((lv1Props: ApiColumnDef) => {
          if ("column_id" in lv1Props) {
            pinnedUnitData[lv1Props.column_id] = lv1Props.unit;
          } else {
            return lv1Props.children.forEach((lv2Props: ApiColumnDef) => {
              if ("column_id" in lv2Props) {
                pinnedUnitData[lv2Props.column_id] = lv2Props.unit;
              } else {
                lv1Props.children.forEach((lv3Props: ApiColumnDef) => {
                  if ("column_id" in lv3Props) {
                    pinnedUnitData[lv3Props.column_id] = lv3Props.unit;
                  }
                });
              }
            });
          }
        });
        setPinnedUnitData(pinnedUnitData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return {
    getAgColumnDef,
  };
};
