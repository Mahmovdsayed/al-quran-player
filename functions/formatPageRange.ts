/**
 * Formats a page range into a human-readable string.
 *
 * @param pages - A tuple containing the start and end page numbers.
 * @returns A formatted string indicating the page range.
 */
export const formatPageRange = (pages: [number, number]): string => {
  // Destructure the tuple into startPage and endPage
  const [startPage, endPage] = pages;

  // Return a string indicating a single page or a range of pages
  if (startPage === endPage) {
    return `Page: ${startPage}`;
  } else {
    return `Pages: ${startPage} to ${endPage}`;
  }
};
