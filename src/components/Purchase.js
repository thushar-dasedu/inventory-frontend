import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash'; // Import debounce function from lodash library
import API from '../axios';
import './Purchase.css';

const Purchase = () => {
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

    const [containSerial, setContainSerial] = useState(false);

    const trackSerial = async (modelId) => {
        try{
            const response = await API.get(`/product/check-serial-number/${modelId}`);
            console.log(response.data);
            setContainSerial(response.data);
        }catch(error){
            console.log(error.response.data.message)
        }
        
    }

    // Debounce trackSerial function to limit API calls
    const debouncedTrackSerial = debounce(trackSerial, 300); // 300 milliseconds debounce delay

    const handleInput = (e, index) => {
        const { name, value } = e.target;

        if (name === 'supplierId') {
            setInputData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'modelId') {
            // Call debouncedTrackSerial instead of trackSerial
            debouncedTrackSerial(value);
            const updatedPurchaseDetailModels = [...inputData.purchaseDetailModels];
            updatedPurchaseDetailModels[index][name] = value;
            setInputData(prevState => ({
                ...prevState,
                purchaseDetailModels: updatedPurchaseDetailModels
            }));
        } else {
            const updatedPurchaseDetailModels = [...inputData.purchaseDetailModels];
            updatedPurchaseDetailModels[index][name] = value;
            setInputData(prevState => ({
                ...prevState,
                purchaseDetailModels: updatedPurchaseDetailModels
            }));
        }
    };

 


    const addSerialNumber = (index, serialNumber) => {
        const updatedPurchaseDetailModels = [...inputData.purchaseDetailModels];
        updatedPurchaseDetailModels[index].serialNumbers.push(serialNumber);
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
                serialNumbers: [] // Ensure new rows have an empty serialNumbers array
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

    const submitData = async () => {
        try {
            const response = await API.post('/purchase-detail/add-purchase', inputData);
            console.log(response.data);
            setInputData({
                supplierId:"",
                purchaseDetailModels:[{
                    modelId:"",
                    unitPrice:"",
                    quantity:"",
                    discount:"",
                    serialNumbers: []
                }]
            })
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    return (
        <div className='purchase-main'>
            <div className="purchase-head">
                <Button className='purchase-button' variant="primary">
                    <Link to='/purchase-reports' className="text-white">Purchase Report</Link>
                </Button>
            </div>
            <div className="purchase-body">
                <Form.Group controlId="supplierId">
                    <Form.Label>Supplier Id</Form.Label>
                    <Form.Control type="number" name="supplierId" value={inputData.supplierId} onChange={(e) => handleInput(e, 0)} className='input-tag' disabled={false} min="0"/>
                </Form.Group>
                <table>
                    <thead>
                        <tr>
                            <th>Product Model</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Discount Rate</th>
                            <th>Serial Numbers</th>
                            <th>Discount Amount</th>
                            <th>Net Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inputData.purchaseDetailModels.map((detail, index) => (
                            <tr key={index}>
                                <td>
                                    <Form.Control type="number" name="modelId" value={detail.modelId} onChange={(e) => handleInput(e, index)} />
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
                                    {containSerial && containSerial[index] && containSerial[index] === true ? (
                                        detail.serialNumbers.map((serialNumber, serialIndex) => (
                                            <div key={serialIndex}>
                                                <Form.Control type="text" value={serialNumber} onChange={(e) => {
                                                    const newSerialNumber = e.target.value;
                                                    addSerialNumber(index, newSerialNumber);
                                                }} />
                                            </div>
                                        ))
                                    ) : null}
                                </td>
                                <td>{calculateDiscountAmount(index)}</td>
                                <td>{calculateNetAmount(index)}</td>
                                <td>
                                    <Button style={{border:"none",background:'none'}} onClick={() => removeRow(index)}><i class="ri-close-circle-fill"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button onClick={addNewRow}  style={{border:'none',color:'black',marginTop:'1%',backgroundColor:'azure'}}><i className="ri-add-circle-line"></i>Add New Row</Button>
            </div>
            <Button className='submit-btn' variant="primary" onClick={submitData}>Save</Button>
        </div>
    );
};

export default Purchase;
