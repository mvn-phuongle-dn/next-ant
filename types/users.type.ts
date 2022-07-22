import { SearchParamDef } from "../hooks/useSearchParams";

export type User = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  age?: number;
  avatar?: string;
};

export type GetUsersParam = SearchParamDef;
