import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../axios';

const ProductModelInsertion = () => {
    const { productId } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [productData, setProductData] = useState({
        productId: "",
        brandName: "",
        containSerialNumber: ""
    });

    const [modelData, setModelData] = useState({
        productId: productId,
        productModelName: "",
        unitPrice: "",
        tax: "",
        quantity: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/product/get-product-by/${productId}`,{
                    headers:{
                      'Authorization': 'basic '+ btoa('smith:smith123')
                    }
                  });
                setProductData(response.data);
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        };
        fetchData();
    }, [productId]);

    const handleData = (e) => {
        setModelData({ ...modelData, [e.target.name]: e.target.value });
    };

    const submitData = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/pro-model/add-product-model', modelData,{
                headers:{
                  'Authorization': 'basic '+ btoa('smith:smith123')
                }
              });
            console.log(response.data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <div>
                <h2 className="h2">Add Product Brand</h2>
            </div>

            <div className="customer-form">
                <form>
                    <div className="mb-3">
                        <label htmlFor="productId" className="form-label">
                            Product Id
                        </label>
                        <input
                            type="text"
                            id="productId"
                            className="form-control"
                            name='productId'
                            value={productData.productId}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="brandName" className="form-label">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            id="brandName"
                            className="form-control"
                            name='brandName'
                            value={productData.brandName}
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productModelName" className="form-label">
                            Model Name
                        </label>
                        <input
                            type="text"
                            id="productModelName"
                            className="form-control"
                            name='productModelName'
                            value={modelData.productModelName}
                            onChange={handleData}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="unitPrice" className="form-label">
                            Unit Price
                        </label>
                        <input
                            type="number"
                            id="unitPrice"
                            className="form-control"
                            name='unitPrice'
                            value={modelData.unitPrice}
                            onChange={handleData}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tax" className="form-label">
                            Tax(%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            id="tax"
                            className="form-control"
                            name='tax'
                            value={modelData.tax}
                            onChange={handleData}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                            Quantity
                        </label>
                        <input
                            type="number"
                            min="0"
                            id="quantity"
                            className="form-control"
                            name='quantity'
                            value={modelData.quantity}
                            onChange={handleData}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={submitData}>
                        Save
                    </button>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default ProductModelInsertion;
