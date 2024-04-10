import React from 'react'
import { useProductContext } from '../../context/ProductContext'

const Cart = () => {
  const {cart}=useProductContext();
  


  return (
    <div>
     {
      cart.map(item=>(
        <>
        {/* <p>{item.brandName}</p>
        <p>{item.productModelName}</p>
        <p>{item.unitPrice}</p>
        <div className="img">
          <img src={`http://localhost:8080/pro-model/fileSystem/${item.name}`} alt="" />
        </div> */}


        <div className="cart-container">
          <div className="product-listo">
            <div className="cart-img">
              <img src={`http://localhost:8080/pro-model/fileSystem/${item.name}`} alt="" />
            </div>
            <p>{item.brandName}</p>
        <p>{item.productModelName}</p>
        <p>{item.unitPrice}</p>
          </div>
          <div className="amount-section">


           <h3>PRICE DETAILS</h3>
           <p>price() {item.unitPrice}</p>

          </div>
        </div>
        </>
      ))
     }
    </div>
  )
}

export default Cart