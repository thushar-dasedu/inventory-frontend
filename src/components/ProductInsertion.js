import React, { useEffect, useState } from "react";
import "./Product.css";
import Table from "react-bootstrap/Table";
import API from "../axios";
import { Link } from "react-router-dom";

const ProductInsertion = () => {
  const [productData, setProductData] = useState([]);
  const getProduct = async () => {
    const response = await API.get(`/product/get-all-product`,{
      headers:{
        'Authorization': 'basic '+ btoa('smith:smith123')
      }
    });
    setProductData(response.data);
  };
  useEffect(() => {
    
    getProduct();
  }, []);
  return (
    <div className="product-main">
        <div className="head">
        <h1>Product brand detail</h1>
      <button className='buton'><Link to={'/add-product-brand'}>New</Link></button></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Brand</th>
            <th> </th>
            
          </tr>
        </thead>
        <tbody>
          {productData.map((data) => {
            return (
              <tr>
                               
                
                  <td>{data.productId}</td>
                <td>{data.brandName}</td>
                <td className='action-td'>

                      <div className='action-btn space'>
                        <button><Link to={`/model-insertion/${data.productId}`}><i class="ri-add-box-fill"></i></Link></button>
                        <button  > <Link ><i class="ri-edit-2-fill"></i></Link></button> 
                      <button  > <i class="ri-delete-bin-6-fill"></i></button>
                      <button  > <Link to={`/product-list/${data.productId}`}> <i class="ri-eye-fill"></i></Link></button> 

                      </div>
                     
                    </td>
                 
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductInsertion;
