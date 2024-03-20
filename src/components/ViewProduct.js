import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import API from "../axios";
const ViewProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const getProductData = async () => {
    try {
      const response = await API.get(`/pro-model/view-products/${productId}`,{
        headers:{
          'Authorization': 'basic '+ btoa('smith:smith123')
        }
      });
      setProductData(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    getProductData();
  } );

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Model Id</th>
            <th>Product Brand Name</th>
            <th>Product Model Name</th>
            <th>Unit Price</th>
            <th>Tax Rate</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((data) => {
            return (
              <tr>
                <td>{data.modelId}</td>
                <td>{data.brandName}</td>
                <td>{data.productModelName}</td>
                <td>{data.unitPrice}</td>
                <td>{data.tax}</td>
                <td>{data.quantity}</td>
              </tr>
            );
          })}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewProduct;
