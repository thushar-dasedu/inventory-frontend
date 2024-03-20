import React, {   useState } from 'react'
import API from '../axios'

const Sale = () => {
    const data={
        customerId:"",
        saleDetailModels:[
            {
                productModelId:"",
                serialNumber:"",
                quantity:"",
                discount:""
            }
        ]
    }
 
    const [inputData,setInputData]=useState(data);
    const[productData,setProductData]=useState({});
    const handleInput=(e,index)=>{
        const {name,value}=e.target;
       if(name==='customerId'){
        setInputData(prevState=>({
            ...prevState,[name]:value
        }))
       } const updatedValue=  [...inputData.saleDetailModels]
       updatedValue[index][name]=value;
       setInputData(prevState=>({
        ...prevState,saleDetailModels:updatedValue
       }))

        setInputData( prevState=>({
            ...prevState,[name]:value
        })
        
         )
    
     }
 const addNew=()=>{
    setInputData(prevState=>({
        ...prevState,saleDetailModels:[...prevState.saleDetailModels,{
            productModelId:"",
            serialNumber:"",
            quantity:"",
            discount:""
        
        }]
    }))
 }
  function handleSubmit(e){
    e.preventDefault();
  }
    
 const getUnitPrice=async()=>{
    const response=await API.get(`/pro-model/get-by/${inputData.productModelId}`,{
        headers:{
          'Authorization': 'basic '+ btoa('smith:smith123')
        }
      });
  setProductData(response.data);
 }

  return (
    <div>
        <div className="head">
            <h1> Sales Info</h1>
        </div>
        <div className="sale-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="customerId">Customer Id</label>
                <input type="number"  name='customerId' />
                <div className="sale-body">
                     <table>
                        <tr>
                            <th>
                                product Id 
                            </th>
                            <th>unit Price</th>
                            <th>quantity</th>
                            <th>discount</th>
                            <th>serial number</th>

                        
                        </tr>
                        <tbody>
                        {inputData.saleDetailModels.map((data,index)=> (
                            <tr key={index}>
                            <td>
                                <input type="number" name="productModelId"   id="productModelId" value={data.productModelId}  onChange={(e)=>handleInput(e,index)}/>
                            </td>
                            <td><input type="number"  value={productData.unitPrice} /></td>
                            <td><input type="number" name="quantiry" id="quantity" value={data.quantity} onChange={(e)=>handleInput(e,index)}/></td>
                            <td><input type="number" name="discount" id="discount" value={data.discount} onChange={(e)=>handleInput(e,index)}/></td>
                            <td><input type="number" name="serialNumber" id="serialNumber" value={data.serialNumber}  onChange={(e)=>handleInput(e,index)}/></td>
                        </tr>
                        )     )}    
                        </tbody>
                        {/* <button  type='submit'>submit</button> */}
                     </table>
                     <button onClick={addNew}>New row</button>
                </div>
               
            </form>
        </div>
         </div>
  )
}

export default Sale