



import React, { useState } from 'react';
import './SearchBar.css';
import API from '../axios';
import SearchList from './SearchList';
import { FaSearch } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {
    const [input, setInput] = useState('');
        const [results, setResults] = useState([]);
        const [showDropdown, setShowDropdown] = useState(false); 
        const fetchSupplierData = async (value) => {
                    try {
                        if (props.name === 'supplier') {
                            const response = await API.get('/supplier/get-all-supplier',{
                                headers:{
                                  'Authorization': 'basic '+ btoa('smith:smith123')
                                }
                              });
                            const filteredResults = response.data.filter((user) => 
                                user.supplierName.toLowerCase().includes(value.toLowerCase())
                            );
                            setResults(filteredResults);
                            setShowDropdown(true);
                        } else if (props.name === 'product') {
                            const response = await API.get('/pro-model/get-all-model',{
                                headers:{
                                  'Authorization': 'basic '+ btoa('smith:smith123')
                                }
                              });
                            const filteredResults = response.data.filter((user) => 
                                user.productModelName.toLowerCase().includes(value.toLowerCase())
                            );
                            setResults(filteredResults);
                            setShowDropdown(true);
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                        setResults([]);
                    }
                };
            
                const handleInput = (value) => {
                    setInput(value);
                    if (value.trim() === '') {
                        setResults([]);
                        setShowDropdown(false); 
                    } else {
                        fetchSupplierData(value); 
                        
                        
                        const event = new Event('input', { bubbles: true });
                        const inputElement = document.querySelector('.search-bar input');
                        if (inputElement) {
                            inputElement.dispatchEvent(event);
                        }
                        
                    }
                };
    
  return (
    <div className='search-container'>
                 {props.name === 'supplier' && (
                    <>
                    
                            <div className="vendor-sec">
                               <span> Supplier Name :</span> 
                               <div className="input-sec"><input  
                               type='search'
                               placeholder='Select Supplier'
                                value={input}
                                onChange={(e) => handleInput(e.target.value)}/><FaSearch style={{margin:'3%'}}/>
                                  
                           
                            {showDropdown && (
                                <div className="dropdown">
                                    <SearchList result={results} setShowDropdown={setShowDropdown} name={props.name} setInput={setInput}/>
                                    <Link to="/supplier"><Button variant="primary" className='add-btn'>addnew</Button></Link> 
                                 </div>
                            )}
                         </div> 
                         </div>
                    </>
                )}
    
                {props.name === 'product' && (
<>
                        <input
                            type='search'
                            placeholder='Select product model'
                            value={input}
                            onChange={(e) => handleInput(e.target.value)}
                        />
                        {showDropdown && (
                            <div className="dropdown">
                                <SearchList result={results} setShowDropdown={setShowDropdown} name={props.name} setInput={setInput}/>
                                <Button variant="primary" className='add-btn'>addnew</Button>
                            </div>
                        )}
                   </>
                )}
            </div>
  )
}

export default SearchBar