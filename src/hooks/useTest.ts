import axios from "axios";
import { useCallback, useState } from "react";
import { TableRowData } from "../types/api/tableRowData";

export const useTest = () => {
  // const [nextPage, setNextPage] = useState(0);
  const getAgRowData = useCallback(async () => {
    let pageNum: number = 0;
    do {
      await axios
        .get<TableRowData[]>(
          `http://hgaap02t.a.rd.honda.co.jp:7041/vbdb2-webservice/api/v2/tables/692/rows`,
          {
            params: {
              field_mask: "cells",
              user_id: "J0134484",
              page: pageNum,
            },
          }
        )
        .then(async (res) => {
          const nextLink = res.headers["link"];
          const nextPage: string =
            typeof nextLink === "undefined"
              ? "finished"
              : nextLink.match(/(page=)\d+/)[0].match(/\d+/g)[0];
          console.log(
            "page = ",
            pageNum + 1,
            "link: ",
            res.headers["link"],
            "nextPage: ",
            nextPage
          );
        })
        .catch((err) => {
          console.log(err);
        });
      pageNum++;
    } while (pageNum < 26);
  }, []);
  return {
    getAgRowData,
  };
};
