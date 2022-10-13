import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <React.Fragment>
      <ReactPaginate
        previousLabel={`previous`}
        nextLabel={`next`}
        breakLabel={`***`}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName={`pagination justify-content-center`}
        pageClassName={`page-item`}
        pageLinkClassName={` page-link`}
        previousClassName={`page-item`}
        previousLinkClassName={`page-link`}
        nextClassName={`page-item`}
        nextLinkClassName={`page-link`}
        breakClassName={`page-item`}
        breakLinkClassName={`page-link`}
        activeClassName={`active`}
        disabledClassName={"d"}
      />
    </React.Fragment>
  );
};

export default Pagination;
