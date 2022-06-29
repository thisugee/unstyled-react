import React from "react";

type ReturnType = {
  pages: number[];
  pagesWithEllipsis: (string | number)[];
};

export function usePagination(
  page: number,
  count: number,
  siblingCount = 1
): ReturnType {
  const pages = React.useMemo(() => {
    const left = page - siblingCount;
    const right = page + siblingCount;
    const pages = [];
    const pagesWithEllipsis = [];

    for (let page = 1; page <= count; page++) {
      if (page === 1 || page === count || (page >= left && page <= right)) {
        pages.push(page);
      }
    }

    let lastIterated;
    for (const page of pages) {
      if (lastIterated) {
        if (page - lastIterated === 2) {
          pagesWithEllipsis.push(lastIterated + 1);
        } else if (page - lastIterated !== 1) {
          pagesWithEllipsis.push("...");
        }
      }
      pagesWithEllipsis.push(page);
      lastIterated = page;
    }

    return { pages, pagesWithEllipsis };
  }, [page, count, siblingCount]);

  return { ...pages };
}
