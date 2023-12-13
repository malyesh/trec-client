import './SearchBar.scss';
import Input from '../Input/Input';
import { useState, useEffect } from 'react';

export default function Search({
  placeholder,
  data,
  handleInputChange,
  selectedElement,
  filteredData,
  setSelectedElement,
  search,
}) {
  return (
    <div className='search'>
      <div className='search__inputs'>
        <Input
          name='search'
          type='text'
          value={search}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {/* <input type='text' placeholder={placeholder} /> */}
        <div className='search__icon'></div>
      </div>
      {filteredData.length !== 0 && (
        <div className='search__results'>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div
                className='search__item'
                onClick={() => {
                  console.log(value.value);
                }}
              >
                {value.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
