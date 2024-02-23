import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CustomerInfo from './components/CustomerInfo';
import InventoryComponent from './components/InventoryComponent';
import Navbar from './components/Navbar';
import CustomerInsertion from './components/CustomerInsertion';
import UpdateCustomer from './components/UpdateCustomer';
import SupplierComponent from './components/SupplierComponent';
import SupplierInsertion from './components/SupplierInsertion';
import UpdateSupplier from './components/UpdateSupplier';
import ProductInsertion from './components/ProductInsertion';
import AddProductBrand from './components/AddProductBrand';
import ProductModelInsertion from './components/ProductModelInsertion';

function App() {
  return (
    <Router>
      <div className="main">
        <div className="leftDiv">
          <InventoryComponent />
        </div>
        <div className="rightDiv">
          <Navbar title="TDBrands" />
          <div className='content'>
          <Routes>
              <Route path='/customer-info' element={<CustomerInfo />} />
              <Route path='/supplier-info' element={<SupplierComponent/>}/>
              <Route path='product' element={<ProductInsertion/>}/>
              <Route path='/supplier' element={<SupplierInsertion title="New Supplier" btnvalue="save"/>}/>
              <Route path='/customer' element={<CustomerInsertion title="New Customers" btnvalue="Submit" />} /> 
              <Route path='/update-customer/:customerId' element={<UpdateCustomer title='Update customer info' btnvalue='update' />} />
              <Route path='/update-supplier/:supplierId' element={<UpdateSupplier title='Update supplier info' btnvalue='update'/>}/>
              <Route path='/add-product-brand' element={<AddProductBrand/>} />
              <Route path='/model-insertion/:productId' element={<ProductModelInsertion/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
