import React from "react";
import "./Pagination.css";
import { useState } from "react";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [selectedPageNo, setSelectedPageNo] = useState();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPaginateItem = (number) => {
    setSelectedPageNo(number);
    paginate(number);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => onPaginateItem(number)}
              className={
                selectedPageNo === number ? "page-link focus" : "page-link"
              }
              style={{ cursor: "pointer" }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
