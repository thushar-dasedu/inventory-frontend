import React from 'react';
import SearchResult from './SearchResult';

const SearchList = ({ result, setShowDropdown, setInput, name }) => {
  return (
    <div> 
      {name === 'supplier' ? (
        result.map((data, index) => (
          <SearchResult
            id={data.supplierId}
            result={data.supplierName}
            key={index}
            setShowDropdown={setShowDropdown}
            setInput={setInput}
          />
        ))
      ) : name === 'product' ? (
        result.map((data, index) => (
          <SearchResult
            id={data.modelId}
            result={data.productModelName}
            key={index}
            setShowDropdown={setShowDropdown}
            setInput={setInput}
          />
        ))
      ) : null}
    </div>
  );
}

export default SearchList;
