import React, { useState } from 'react';
import './SearchBar.css';
import API from '../axios';
import SearchList from './SearchList';
import Button from 'react-bootstrap/Button';

const SearchBar = (props) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

    const fetchSupplierData = async (value) => {
        try {
            if (props.name === 'supplier') {
                const response = await API.get('/supplier/get-all-supplier');
                const filteredResults = response.data.filter((user) => 
                    user.supplierName.toLowerCase().includes(value.toLowerCase())
                );
                setResults(filteredResults);
                setShowDropdown(true);
            } else if (props.name === 'product') {
                const response = await API.get('/pro-model/get-all-model');
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
            {props.name === 'supplier' && (
                <>
                    <label htmlFor="supplierName">Supplier Name</label>
                    <div className="search">
                        <i className="ri-search-eye-line"></i>
                        <input
                            placeholder='Select supplier'
                            value={input}
                            onChange={(e) => handleInput(e.target.value)}
                        />
                        {showDropdown && (
                            <div className="dropdown">
                                <SearchList result={results} setShowDropdown={setShowDropdown} name={props.name} setInput={setInput}/>
                                <Button variant="primary">addnew</Button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {props.name === 'product' && (
                <div className="search-bar">
                    <input
                        placeholder='Select product model'
                        value={input}
                        onChange={(e) => handleInput(e.target.value)}
                    />
                    {showDropdown && (
                        <div className="dropdown">
                            <SearchList result={results} setShowDropdown={setShowDropdown} name={props.name} setInput={setInput}/>
                            <Button variant="primary">addnew</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
