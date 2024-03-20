import React from 'react'
import './SearchBar.css'
import API from '../axios'
const SearchResult = ({result,setShowDropdown,setInput,id,name}) => {
 const handelChanges=async()=>{
  if(name==='supplier'){
    const response=await API.get(`/supplier/get-supplier-id/${id}`,{
      headers:{
        'Authorization': 'basic '+ btoa('smith:smith123')
      }
    })
    console.log(response.data);
  }else if(name==='product'){
    const response=await API.get(`/pro-model/get-by/${id}`,{
      headers:{
        'Authorization': 'basic '+ btoa('smith:smith123')
      }
    })
    console.log(response.data);
  }
    
 }
const handleClick=()=>{
  setInput(`${result}`);
  setShowDropdown(false);
  handelChanges();
}
  return (
    <div className='search-result' onClick={ handleClick}> {result}</div>
  )
}

export default SearchResult