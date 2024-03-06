import React from 'react'
import SearchResult from './SearchResult'

const SearchList = ({result,setShowDropdown,setInput}) => {
  return (
    <div   > 
    {
    result.map((data ,index)=>{
    return     <SearchResult id={data.supplierId} result={data.supplierName} key={index} setShowDropdown={setShowDropdown} setInput={setInput}/>
    
    })
    };
    
    </div>
  )  
}

export default SearchList
