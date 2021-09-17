import React, { useState } from 'react'


//Takes Two Params data & the number of items per page
export const usePagination = (data, itemsPerPage) => {

  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  const previous = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  const jump = (page) => {
    setCurrentPage((currentPage) => {
      Math.min(Math.max(1, page), maxPage)
    })
  }

  const begin = (currentPage - 1) * itemsPerPage;
  const end = begin + itemsPerPage;
  const currentPageData = data.slice(begin, end);

  return { next, previous, jump, currentPage, currentPageData, maxPage }
}
