import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

const SmartSearch = ({ onSearchChange, disabled }) => {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  const debouncedOnSearchChange = useCallback(
    debounce((newQuery) => {
      localStorage.setItem('searchQuery', newQuery); 
      onSearchChange(newQuery);
    }, 500),
    [onSearchChange]
  );

  useEffect(() => {
    if (query) {
      onSearchChange(query);
    }
  }, [query, onSearchChange]);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedOnSearchChange(newQuery);
  };

  return (
    <div className="flex justify-center items-center my-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Find..."
        className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(SmartSearch);
