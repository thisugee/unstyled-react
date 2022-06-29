import React, { ElementType, ReactNode } from "react";
import { PaginationItemType } from "./types";

export interface PaginationItemProps {
  /**
   * The type of pagination item.
   */
  type: PaginationItemType;
  /**
   * Component to use for pagination item.
   */
  as?: ElementType;
  /**
   * The pagination item label.
   */
  label?: ReactNode;
  /**
   * If `true`, pagination item is active.
   */
  active?: boolean;
  /**
   * If `true`, pagination is disabled.
   */
  disabled?: boolean;
  /**
   * Handler when a pagination item is clicked.
   */
  onClick?: () => void;
  /**
   * Override or extend styles applied to component
   */
  className?: string;
  /**
   * Additional props for custom component set in `as` prop.
   */
  [prop: string]: any;
}

const defaultProps: Partial<PaginationItemProps> = {
  as: "button",
};

export const PaginationItem: React.FC<PaginationItemProps> = ({
  as: Tag = defaultProps.as!,
  label,
  type,
  active,
  disabled,
  onClick,
  className,
  children,
  ...props
}) => {
  return label || children ? (
    <Tag
      className={`${type} ${active ?? ""} ${className ?? ""}`.trim()}
      disabled={disabled || type === "ellipsis"}
      onClick={onClick}
      {...props}
    >
      {label ?? children}
    </Tag>
  ) : null;
};
