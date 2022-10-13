import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Card from "../../utils/Card";
import Table from "react-bootstrap/Table";
const RequiresApprovalFromApprover = (props) => {
  return (
    <Card>
      <div className="remList-single" style={{ marginBottom: "10px" }}>
        <h3 className="h3Field-class">
          Total Records:{" "}
          <span className="spanDta-field">
            {props.filterPendingActionDataUsingId.length}
          </span>
        </h3>
      </div>
      {props.filterPendingActionDataUsingId.length !== 0 && (
        <div style={{ marginBottom: "15px" }}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-outline-success"
            table="table-to-xls"
            filename={`${props.employeeId.value}-Report`}
            sheet="tablexls"
            buttonText="Download Report"
          />
        </div>
      )}
      <div className="div-horizontal">
        <Table
          striped
          bordered
          hover
          id="table-to-xls"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>Reimbursement Id</th>
              <th>Employee Id</th>
              <th>Employee Mail</th>
              <th>Expense Date</th>
              <th>Expense Category</th>
              <th>Amount To Be Refunded</th>
              <th>Invoice Attachment</th>
              <th>Invoice Date</th>
              <th>Expense Description</th>
              <th>Invoice No</th>
              <th>Vendor Name</th>
              <th>Employee Consent</th>
              <th>Paid To</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {props.filterPendingActionDataUsingId.map((id) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{props.adminData[id].UserSpecificId}</td>
                <td>{props.adminData[id].EmployeeMail}</td>
                <td>{props.adminData[id].ExpenseDate}</td>
                <td>{props.adminData[id].ExpenseCategory}</td>
                <td>{props.adminData[id].AmountToBeRefunded}</td>
                <td>
                  <a
                    download={props.adminData[id].Invoice}
                    href={props.adminData[id].Invoice}
                    title="Download pdf document"
                  >
                    Link
                  </a>
                  {/* <iframe src={adminData[id].Invoice}></iframe> */}
                </td>
                <td>{props.adminData[id].InvoiceDate}</td>
                <td>{props.adminData[id].ExpenseDescription}</td>
                <td>{props.adminData[id].InvoiceNo}</td>
                <td>{props.adminData[id].VendorName}</td>
                <td>{props.adminData[id].EmployeeConsent}</td>
                <td>{props.adminData[id].PaidTo}</td>
                <td>{props.adminData[id].Time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default RequiresApprovalFromApprover;
