import { ReactNode } from "react";

export type PaginationItemType =
  | "page"
  | "previous"
  | "next"
  | "first"
  | "last"
  | "ellipsis";

export type PaginationItemLabel = ReactNode | ((page?: number) => ReactNode);

export type PaginationItemLabels = Record<
  PaginationItemType,
  PaginationItemLabel
>;
