import React from 'react';
import Select from 'react-select';
import './Dropdown.scss';

export default function Dropdown({ options, setSelectedElement, type }) {
  return (
    <Select
      options={options}
      placeholder={`Please select a ${type}`}
      onChange={setSelectedElement}
    />
  );
}
