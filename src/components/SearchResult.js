import React from 'react'
import './SearchBar.css'
import API from '../axios'
const SearchResult = ({result,setShowDropdown,setInput,id}) => {
 const handelSupplier=async()=>{
    const response=await API.get(`/supplier/get-supplier-id/${id}`)
    console.log(response.data);
 }
const handleClick=()=>{
  setInput(`${result}`);
  setShowDropdown(false);
  handelSupplier();
}
  return (
    <div className='search-result' onClick={ handleClick}> {result}</div>
  )
}

export default SearchResult