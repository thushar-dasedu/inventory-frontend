 import { Route,   Routes } from 'react-router-dom';
import './App.css';
import CustomerInfo from './components/CustomerInfo';
import InventoryComponent from './components/InventoryComponent';
import Navbar from './components/Navbar';
import CustomerInsertion from './components/CustomerInsertion';
import UpdateCustomer from './components/UpdateCustomer';

function App() {
  return (
   
   <div className="main">
    <div className="leftDiv">
     <InventoryComponent />
     </div>
     <div className="rightDiv">
    <Navbar title="TDBrands"/>
    <div className='content'>
    <Routes>
    <Route exact path='/customer-info' Component={CustomerInfo}></Route>
    <Route exact path='/customer' Component={()=><CustomerInsertion title="New Customers" btnvalue="Submit"/> }/> 
    <Route exact path='/update-customer/:customerId' Component={()=><UpdateCustomer title='Update customer info' btnvalue='update' />} />
    </Routes>
   </div>
    </div>
   
  
    </div>
   
  );
}

export default App;
