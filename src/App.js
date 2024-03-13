import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 import './App.css';
import InventoryHome from './components/inventory-home/InventoryHome';
// import CustomerInfo from './components/CustomerInfo';
// import InventoryComponent from './components/InventoryComponent';
import Navbar from './components/Navbar';
import Registration from './components/inventory-home/Registration';
// import CustomerInsertion from './components/CustomerInsertion';
// import UpdateCustomer from './components/UpdateCustomer';
// import SupplierComponent from './components/SupplierComponent';
// import SupplierInsertion from './components/SupplierInsertion';
// import UpdateSupplier from './components/UpdateSupplier';
// import ProductInsertion from './components/ProductInsertion';
// import AddProductBrand from './components/AddProductBrand';
// import ProductModelInsertion from './components/ProductModelInsertion';
// import ViewProduct from './components/ViewProduct';
// import Purchase from './components/Purchase';
// import PurchaseReport from './components/PurchaseReport';
// import SaleReport from './components/SaleReport';
// import Sale from './components/Sale';
 

function App() {
  return (

    // <Router>
    //   <div className="main">
    //     <div className="leftDiv">
    //       <InventoryComponent />
    //     </div>
    //     <div className="rightDiv">
          // <Navbar title="TDBrands" />
    //       <div className='content'>
    //       <Routes>
    //           <Route exact path='/customer-info' element={<CustomerInfo />} />
    //           <Route exact path='/supplier-info' element={<SupplierComponent/>}/>
    //           <Route exact path='product' element={<ProductInsertion/>}/>
    //           <Route exact path='/supplier' element={<SupplierInsertion title="New Supplier" btnvalue="save"/>}/>
    //           <Route exact path='/customer' element={<CustomerInsertion title="New Customers" btnvalue="Submit" />} /> 
    //           <Route exact path='/update-customer/:customerId' element={<UpdateCustomer title='Update customer info' btnvalue='update' />} />
    //           <Route exact path='/update-supplier/:supplierId' element={<UpdateSupplier title='Update supplier info' btnvalue='update'/>}/>
    //           <Route exact path='/add-product-brand' element={<AddProductBrand/>} />
    //           <Route exact path='/model-insertion/:productId' element={<ProductModelInsertion/>} />
    //           <Route exact path='/product-list/:productId' element={<ViewProduct/>} />
    //           <Route exact path='/purchase' element={<Purchase/>}/>
    //           <Route exact path='/purchase-reports' element={<PurchaseReport/>}/>
    //           <Route exact path='/list-sale' element={<SaleReport/>}/>
    //           <Route exact path='/add-sale'  element={<Sale/>} />
    //         </Routes>
    //       </div>
    //     </div>
    //   </div>
    // </Router>
    <Router> 
      <div className="rightDiv"> 
    <Navbar title="TDBrands" /></div>
<div className="content">
  
 <Routes>
  <Route path='/' element={<InventoryHome/>}/>
  <Route path='/registration' element={<Registration/>}/>
 </Routes>
 </div>
</Router>    
    
  );
}

export default App;
