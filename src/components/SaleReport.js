import React, { useEffect, useState } from "react";
import API from "../axios";
import Pagination from "./Pagination";
import { Table, Container } from "react-bootstrap";

const SaleReport = () => {
  const [saleData, setSaleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const getSales = async () => {
    let response = await API.get("/sale-detail/get-sale",{
      headers:{
        'Authorization': 'basic '+ btoa('smith:smith123')
      }
    });
    setSaleData(response.data);
  };

  useEffect(() => {
    getSales();
  }, []);

  const currentRecords = saleData.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(saleData.length / recordsPerPage);

  return (
    <Container>
      <div className="head">
        <h1>Sales reports</h1>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Sale Detail id</th>
            <th>Sale id</th>
            <th>Customer name</th>
            <th>Sale date time</th>
            <th>Product model name</th>
            <th>Unit price</th>
            <th>Discount amount</th>
            <th>Net amount</th>
            <th>Tax amount</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((data) => {
            return (
              <tr key={data.saleDetailId}>
                <td>{data.saleDetailId}</td>
                <td>{data.saleId}</td>
                <td>{data.customerName}</td>
                <td>{data.saleDateTime}</td>
                <td>{data.productModelName}</td>
                <td>{data.unitPrice}</td>
                <td>{data.discountAmount}</td>
                <td>{data.netAmount}</td>
                <td>{data.taxAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="container mt-5">
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Container>
  );
};

export default SaleReport;
