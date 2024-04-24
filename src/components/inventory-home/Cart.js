import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useProductContext } from '../../context/ProductContext';
import { FaTrash } from "react-icons/fa"; 
// import { getImage } from '../../axios';

const Cart = () => {
  const { cart, setCart } = useProductContext(); // Assuming there's a setter function for cart
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Ensure initial total is set to 0 to avoid unnecessary calculations
    setCartTotal(0); // Set initial total to 0
  }, []);

  useEffect(() => {
    // Calculate cart total when cart changes
    if (cart.length === 0) {
      setCartTotal(0); // Set total to 0 if cart is empty
      return; // Prevent unnecessary calculations
    }

    let total = 0;
    cart.forEach(item => {
      const unitPrice = parseFloat(item.unitPrice); // Ensure unitPrice is a number

      // Check for valid number before addition
      if (!isNaN(unitPrice)) {
        total += unitPrice;
      } else {
        console.error('Invalid unitPrice:', item); // Log error message
      }
    });

    setCartTotal(total);
  }, [cart]);
  
  const removeItem = (index) => {
    const newCart = [...cart]; // Create a copy of the cart array
    newCart.splice(index, 1); // Remove the item at the specified index
    setCart(newCart); // Update the cart state with the new array
  };
  
  return (
    <div className='cart-sec'>
      <div className="cart-item">
        {cart.map((item, index) => (
          <div key={item.productId} className="cart-container">
            <div className="product-listo">
              <div className="cart-img">
                <img src={`http://localhost:8080/pro-model/fileSystem/${item.name}`} alt="" />
              </div>
              <div className="cart-detail">
                <span>Brand Name: {item.brandName}</span>
                <span>Model Name: {item.productModelName}</span>
                <span>Price: {item.unitPrice}</span>
              </div>
            </div>
            {/* <button > */}
              <FaTrash style={{color:"red"}} onClick={() => removeItem(index)}/>
            {/* </button> */}
          </div>
        ))}
      </div>
      <div className="amount-section">
        <h3>PRICE DETAILS</h3>
        <p>Total: {cartTotal.toFixed(2)}</p>
        <button>Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
