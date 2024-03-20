import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import API from '../axios';
import './Purchase.css';
import SearchBar from './SearchBar';
 
const Purchase = () => {
    const[searchId,setSearchId]=useState();
     const [inputData, setInputData] = useState({
        supplierId: "",
        purchaseDetailModels: [{
            modelId: "",
            unitPrice: "",
            quantity: "",
            discount: "",
            serialNumbers: []  
        }]
    });
    const navigate=useNavigate();
    const [containSerial, setContainSerial] = useState([]);

    useEffect(() => {
        setContainSerial(new Array(inputData.purchaseDetailModels.length).fill(false));
    }, [inputData.purchaseDetailModels.length]);
     
    const trackSerial =  async (modelId, index) => {
        try {
            const response = await API.get(`/product/check-serial-number/${modelId}`,{
                headers:{
                  'Authorization': 'basic '+ btoa('smith:smith123')
                }
              });
            const updatedContainSerial = [...containSerial];
            updatedContainSerial[index] = response.data;
            setContainSerial(updatedContainSerial);
        } catch (error) {
            console.log(error.response.data.message)
        }
    };

    const debouncedTrackSerial = debounce(trackSerial, 300);

    const handleInput = (e, index) => {
        const { name, value } = e.target;
    
        if (name === 'supplierId') {
            setInputData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'modelId' && value.trim() !== "") {
            setInputData(prevState => ({
                ...prevState,
                purchaseDetailModels: prevState.purchaseDetailModels.map((detail, i) => {
                    if (i === index) {
                        return {
                            ...detail,
                            [name]: value
                        };
                    }
                    return detail;
                })
            }));
            // Call trackSerial here if needed
        }
    
        // For other inputs like unitPrice, quantity, etc.
        const updatedPurchaseDetailModels = [...inputData.purchaseDetailModels];
        updatedPurchaseDetailModels[index][name] = value;
        setInputData(prevState => ({
            ...prevState,
            purchaseDetailModels: updatedPurchaseDetailModels
        }));
    };
    

   

    const addNewRow = () => {
        setInputData(prevState => ({
            ...prevState,
            purchaseDetailModels: [...prevState.purchaseDetailModels, {
                modelId: "",
                unitPrice: "",
                quantity: "",   
                discount: "",
                serialNumbers: []
            }]
        }));
    };
    const removeRow = (index) => {
        if (inputData.purchaseDetailModels.length === 1) {
            setInputData({
                purchaseDetailModels:[{
                    modelId:'',
                    unitPrice:'',
                    quantity:'',
                    discount:'',
                    serialNumbers: [] // Ensure the last row has an empty serialNumbers array
                }]
            })
            return; // Prevent deletion if there's only one row left
        }
        setInputData(prevState => ({
            ...prevState,
            purchaseDetailModels: prevState.purchaseDetailModels.filter((_, idx) => idx !== index)
        }));
    };
    const calculateDiscountAmount = (index) => {
        const { unitPrice, discount, quantity } = inputData.purchaseDetailModels[index];
        return ((unitPrice * discount) / 100) * quantity;
    };

    const calculateNetAmount = (index) => {
        const { unitPrice, quantity } = inputData.purchaseDetailModels[index];
        const discountAmount = calculateDiscountAmount(index);
        return (unitPrice * quantity) - discountAmount;
    };
    const handleSerialNumberChange = (e, index, serialIndex) => {
        const { value } = e.target;
        const purchaseDetailModels = [...inputData.purchaseDetailModels];
        purchaseDetailModels[index].serialNumbers[serialIndex] = value;
        setInputData({ ...inputData, purchaseDetailModels });
    };
    
      
    
    
     
    
    const submitData = async () => {
        if (!inputData.supplierId || !inputData.purchaseDetailModels.every(detail => detail.modelId && detail.quantity)) {
            alert("Please fill in all the fields.");
            return;
        }
     // Validate serial numbers
     const isSerialFilled = inputData.purchaseDetailModels.every((detail, index) => {
        if (containSerial[index]) {
            return detail.serialNumbers.length === parseInt(detail.quantity);
        }
        return true;
    });

    if (!isSerialFilled) {
        alert('Please fill in all serial numbers.');
        return;
    }
        // Update state
        try {
            const response = await API.post('/purchase-detail/add-purchase', inputData,{
                headers:{
                  'Authorization': 'basic '+ btoa('smith:smith123')
                }
              });
            console.log(response.data);
            
            setInputData({
                supplierId: "",
                purchaseDetailModels: [{
                    modelId: "",
                    unitPrice: "",
                    quantity: "",
                    discount: "",
                    serialNumbers: []
                }]
            });
    
           navigate('/purchase-reports')
        } catch (error) {
            console.log(error.response.data.message);
            alert('Failed to save data. Please try again.');
        }
    };
    

    return (
        <div className='purchase-main'>
            <div className="purchase-head">
                <Button className='purchase-button' variant="primary">
                    <Link to='/purchase-reports' className="text-white">Purchase Report</Link>
                </Button>
            </div>
            {/* <div className="purchase-body"> */}
                <Form.Group as={Row} controlId="supplierId"  >
                     
                 <SearchBar name="supplier"  setSearchId={setSearchId}/>
                    {}
                    
                    
                </Form.Group>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Model</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Discount Rate</th>
                            <th>Serial Numbers</th>
                            <th>Discount Amount</th>
                            <th>Net Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inputData.purchaseDetailModels.map((detail, index) => (
                            <tr key={index}>
                               
                                <td>
                                <SearchBar name="product"  setSearchId={setSearchId} />
                                
                                </td>
                                <td>
                                    <Form.Control type="number" name="unitPrice" value={detail.unitPrice} onChange={(e) => handleInput(e, index)} min='0' />
                                </td>
                                <td>
                                    <Form.Control type="number" name="quantity" value={detail.quantity} onChange={(e) => handleInput(e, index)} min='0' />
                                </td>
                                <td>
                                    <Form.Control type="number" name="discount" value={detail.discount} onChange={(e) => handleInput(e, index)} min='0' />
                                </td>
                                <td>
                                    <div className="serial-number-container">
                                        {containSerial[index] ? (
                                            <div className="serial-inputs">
                                                {[...Array(parseInt(detail.quantity || 0))].map((serialNumber, i) => (
                                                    <Form.Control key={i} type="text" placeholder={`Serial Number ${i + 1}`} value={serialNumber} onChange={(e) => handleSerialNumberChange( e,index, i)} />
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </td>
                                <td>{calculateDiscountAmount(index)}</td>
                                <td>{calculateNetAmount(index)}</td>
                                <td>
                                    <Button style={{border:"none",background:'none'}} onClick={() => removeRow(index)}><i className="ri-close-circle-fill"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Button onClick={addNewRow}  style={{border:'none',color:'black',marginTop:'1%',backgroundColor:'azure'}}><i className="ri-add-circle-line"></i>Add New Row</Button>
                
            {/* </div> */}
            <Button className='submit-btn' variant="primary" onClick={submitData}>Save</Button>
        </div>
    );
};
export default Purchase;
