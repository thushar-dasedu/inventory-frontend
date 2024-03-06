// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';
import API from '../axios';
// import SearchResult from './SearchResult'; // Import SearchResult component
import SearchList from './SearchList';
import Button from 'react-bootstrap/Button';
const SearchBar = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

    const fetchSupplierData = async (value) => {
        try {
            const response = await API.get('/supplier/get-all-supplier');
            const filteredResults = response.data.filter((user) => 
                user.supplierName.toLowerCase().includes(value.toLowerCase())
                
            );
             
            setResults(filteredResults);
            console.log(filteredResults);
             
            setShowDropdown(true); // Show dropdown after fetching results
            // if(value.trim()!=='' && setShowDropdown(false)){
            //       console.log()
            // }
        } catch (error) {
            console.error('Error fetching supplier data:', error);
            setResults([]);
        }
    };
    const handleInput = (value) => {
        setInput(value);
        if (value.trim() === '') {
            setResults([]);
            setShowDropdown(false); // Hide dropdown when input is empty
        } else {
            fetchSupplierData(value); // Call the function to fetch supplier data
            
            // Manually trigger input event
            const event = new Event('input', { bubbles: true });
            const inputElement = document.querySelector('.search-bar input');
            inputElement.dispatchEvent(event);
        }
    };
    
    
 
 
    return (
        <div className='search-container'>
            <label htmlFor="supplierName">Supplier Name</label>
            <div className="search-bar">

                <i className="ri-search-eye-line"></i>
                <input
                    placeholder='Select supplier'
                    value={input}
                    onChange={(e) => handleInput(e.target.value)}
                />
                {showDropdown && (
                    <div className="dropdown">
                         <SearchList result={results}  setShowDropdown={setShowDropdown} setInput={setInput}/>
                         <Button variant="primary">addnew</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
