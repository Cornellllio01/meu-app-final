import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <svg xmlns="http://www.w3.org/2000/svg" className="search-icon h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Buscar equipamentos..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
