import React from 'react'
import asus15 from '../asset/tuf.png'
import asusvivo from '../asset/asusvivo.webp'
import dellimpre from '../asset/delli-removebg-preview.png'
import acr1 from '../asset/acr1.jpg'
import acr2 from '../asset/acr2.webp'
import hp from '../asset/hp1.jpg'
import './Laptop.css'


const Laptop = () => {
  return (
    <div className='laptop-main'>
       
       <h4>Best Deals on Smartphones</h4> 
       <div className="laptop-body"> 
       <div className="laptops">
              <img src={asus15} alt="" />
              <div className="brand">Asus</div>
       </div>
       <div className="laptops">        
              <img src={asusvivo} alt="" />
              <div className="brand">Asus</div>
       </div>
       <div className="laptops">
              <img src={dellimpre} alt="" />
              <div className="brand">Dell</div>
       </div>
       <div className="laptops">
              <img src={acr1} alt="" />
              <div className="brand">Acer</div>
       </div>
       <div className="laptops">
              <img src={acr2} alt="" />
              <div className="brand">Acer</div>
       </div>
       <div className="laptops">
              <img src={hp} alt="" />
              <div className="brand">Hp</div>
       </div>

       </div>
    </div>
  )
}

export default Laptop