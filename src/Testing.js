import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useState, useEffect } from "react";
import realtimeDbUrl from "./server/dataBaseUrl";
const Testing = () => {
  const [data, setData] = useState();
  const [postsPerPage] = useState(6);
  const [lastkey, setLastKey] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [records, setRecords] = useState([]);
  const [totaRecords, setTotalRecords] = useState();

  useEffect(() => {
    getData();
  }, []);

  const fireBaseUrl = `${realtimeDbUrl}/ReimbursementRecords.json?orderBy="$key"&limitToFirst=${postsPerPage}`;

  const totalUrl = `${realtimeDbUrl}/ReimbursementRecords.json?shallow=true`;

  const getData = async () => {
    // setSpinner(true);
    const res = await axios.get(fireBaseUrl);
    const total = await axios.get(totalUrl);
    setData(res.data);

    console.log(res.headers);
    // setSpinner(false);
    let latestData = res.data;
    let totalData = total.data;
    // console.log("latest", latestData);
    if (latestData) {
      setRecords(Object.keys(latestData));
      setLastKey(Object.keys(latestData)[postsPerPage - 1]);
    }
    if (totalData) {
      const total = Object.keys(totalData).length;
      setPageCount(Math.ceil(total / postsPerPage));
    }
  };

  const handlePageClick = () => {
    const fireBaseUrl = `${realtimeDbUrl}/ReimbursementRecords.json?orderBy="$key"&startAt="${lastkey}"&limitToFirst=${postsPerPage}`;
    const getPaginatedData = async () => {
      const response = await axios.get(fireBaseUrl);
      setData(response.data);
      let paginateData = response.data;
      if (paginateData) {
        setRecords(Object.keys(paginateData));
        setLastKey(Object.keys(paginateData)[postsPerPage - 1]);
      }
    };
    setTimeout(() => {
      getPaginatedData();
    }, 200);
  };

  console.log("Last-KEY", lastkey);
  console.log(pageCount);

  return (
    <Fragment>
      <div className="container">
        {records.map((id, index) => (
          <div key={id} className="detailCardNew">
            <div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Index: <span className="spanDta-field">{index}</span>
                </h3>
              </div>
              <div className="remList-single">
                <h3 className="h3Field-class">
                  Reimbursement Id: <span className="spanDta-field">{id}</span>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={`previous`}
        nextLabel={`next`}
        breakLabel={`***`}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={`pagination justify-content-center`}
        pageClassName={`page-item`}
        pageLinkClassName={`page-link`}
        previousClassName={`page-item`}
        previousLinkClassName={`page-link`}
        nextClassName={`page-item`}
        nextLinkClassName={`page-link`}
        breakClassName={`page-item`}
        breakLinkClassName={`page-link`}
        activeClassName={`active`}
      />
    </Fragment>
  );
};

export default Testing;
