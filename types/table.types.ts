import { SortOrder } from "antd/lib/table/interface";

export type OrderByDef = {
  key: string | undefined;
  direction: SortOrder | undefined;
};

export type TableColumn = {
  key: string;
  title: string;
  permanentColumn?: boolean;
};
