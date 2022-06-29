import React, { ElementType, Fragment, ReactNode } from "react";
import { usePagination } from "./hooks/usePagination";
import { PaginationItem, PaginationItemProps } from "./PaginationItem";
import { PaginationItemLabels, PaginationItemType } from "./types";

export interface PaginationProps {
  /**
   * Component to use for pagination.
   */
  as?: ElementType;
  /**
   * The total number of pages.
   */
  count: number;
  /**
   * The current page.
   */
  page?: number;
  /**
   * The total number of items per page.
   */
  pageSize?: number;
  /**
   * Handler when a page is changed.
   */
  onChange: (page: number) => void;
  /**
   * Number of visibile pages before and after current page.
   */
  siblingCount?: number;
  /**
   * If `true`, hide next page button.
   */
  hideNextButton?: boolean;
  /**
   * If `true`, hide previous page button.
   */
  hidePrevButton?: boolean;
  /**
   * If `true`, show first page button.
   */
  showFirstButton?: boolean;
  /**
   * If `true`, show last page button.
   */
  showLastButton?: boolean;
  /**
   * Override or extend styles applied to component
   */
  className?: string;
  /**
   * Render custom item component.
   */
  renderItem?: (props: PaginationItemProps) => ReactNode;
  /**
   * Pagination item labels.
   */
  itemLabels?: Partial<PaginationItemLabels>;
  /**
   * Function to provide a user-friendly value for `aria-label`.
   */
  getItemAriaLabel?: (type: PaginationItemType, page?: number) => string;
  /**
   * Additional props for custom component set in `as` prop.
   */
  [prop: string]: any;
}

const defaultProps: Partial<PaginationProps> = {
  as: "div",
  page: 1,
  pageSize: 10,
  getItemAriaLabel: (type, page) => {
    return type === "page" ? `Page ${String(page)}` : type;
  },
  renderItem: (item) => {
    return <PaginationItem {...item} />;
  },
};

export const Pagination: React.FC<PaginationProps> = ({
  as: Tag = defaultProps.as!,
  count,
  page = defaultProps.page!,
  pageSize = defaultProps.pageSize,
  siblingCount,
  hideNextButton,
  hidePrevButton,
  showFirstButton,
  showLastButton,
  onChange,
  className,
  itemLabels,
  getItemAriaLabel = defaultProps.getItemAriaLabel!,
  renderItem = defaultProps.renderItem!,
  ...props
}) => {
  const { pagesWithEllipsis: pages } = usePagination(page, count, siblingCount);

  const defaultItemLabels: PaginationItemLabels = {
    previous: "<",
    next: ">",
    first: "<<",
    last: ">>",
    ellipsis: "...",
    page: (page) => String(page),
  };

  const getItemProps = (
    type: PaginationItemType,
    page?: number,
    active?: boolean
  ) => {
    let label = itemLabels?.[type] ?? defaultItemLabels[type];
    label = typeof label === "function" ? label(page) : label;

    return {
      type,
      label,
      "aria-label": getItemAriaLabel(type, page),
      "aria-current": active ? "true" : "false",
    };
  };

  return (
    <>
      {pages.length > 1 ? (
        <Tag className={`pages ${className ?? ""}`.trim()} {...props}>
          {showFirstButton &&
            renderItem({
              ...getItemProps("first"),
              onClick: () => onChange(1),
              disabled: page === 1,
            })}

          {!hidePrevButton &&
            renderItem({
              ...getItemProps("previous"),
              onClick: () => onChange(page - 1),
              disabled: page === 1,
            })}

          {pages.map((pageLabel, index) => {
            return (
              <Fragment key={index}>
                {typeof pageLabel === "string"
                  ? renderItem({
                      ...getItemProps("ellipsis"),
                    })
                  : renderItem({
                      ...getItemProps("page", pageLabel),
                      active: page === pageLabel,
                      onClick: () => onChange(pageLabel),
                    })}
              </Fragment>
            );
          })}

          {!hideNextButton &&
            renderItem({
              ...getItemProps("next"),
              onClick: () => onChange(page + 1),
              disabled: page === count,
            })}

          {showLastButton &&
            renderItem({
              ...getItemProps("last"),
              onClick: () => onChange(count),
              disabled: page === count,
            })}
        </Tag>
      ) : null}
    </>
  );
};
