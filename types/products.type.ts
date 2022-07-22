import { SearchParamDef } from "../hooks/useSearchParams";

export type Product = {
  id: number;
  name: string;
  category: string;
  support: string;
  startDate: string;
  lastDate: string;
  status: string;
};

export type GetProductsParam = SearchParamDef;
